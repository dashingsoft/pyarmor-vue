<template>
  <el-cascader
    ref="cascader"
    class="w-100"
    v-model="value"
    filterable
    @change="onValueChanged"
    @expand-change="onExpandChanged"
    :multiple="multiple"
    :placeholder="placeholder"
    :props="panelProps">
  </el-cascader>
</template>

<script>
import connector from '../connector.js'

export default {
    name: 'SelectPathScript',
    model: {
        prop: 'value2',
        event: 'change2',
    },
    props: {
        value2: {
            type: Array
        },
        rootPath: {
            type: String,
            required: true,
            // validator ( value ) {
            //     return value.length > 0
            // }
        },
        selectPattern: {
            type: String,
            default: '*',
        },
        onlyFolder: {
            type: Boolean,
            default: false,
        },
        onlyScript: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            value: [],
            path: [],
            panelProps: {
                multiple: this.multiple,
                lazy: true,
                checkStrictly: ! this.onlyScript,
                lazyLoad: this.listRemoteDirectory
            },
        }
    },
    mounted() {
        this.$watch( 'rootPath', this.resetRootPath )
    },
    methods: {
        splitPath( p ) {
            return p === '' ? [] : p === '/' ? [ '' ] : p.split( '/' )
        },
        joinPath( a ) {
            return typeof a === 'string' ? a : a.length === 0 ? ''
                : ( a.length > 1 || a[0] !== '' ) ? a.join( '/' ) : '/'
        },
        resetRootPath() {
            this.$refs['cascader'].$refs['panel'].initStore()
        },
        onValueChanged() {
            this.$emit( 'change2', ! this.multiple ? [ this.joinPath( this.value ) ]
                        : typeof this.value === 'string' ? [ this.value ]
                        :  this.value.map( x => this.joinPath( x ) ) )
            // 变通解决 ElementUI 的 bug: multiple === false && lazyLoad
            //     点击选项的单选按钮不会关闭菜单，而是弹出没有数据的下一级菜单
            // if ( ! this.multiple ) {
            //     this.$refs['cascader'].toggleDropDownVisible( false )
            // }
        },
        onExpandChanged( nodes ) {
            this.path = nodes.map( x => x.toString() )
            if ( this.path[ 0 ] === '/' )
                this.path[ 0 ] = ''
        },
        listRemoteDirectory(node, resolve) {
            if ( node.leaf === true || this.rootPath === '' ) {
                resolve()
                return
            }
            const { level } = node
            let path = level === 0 ? [] : this.path.slice( 0, level - 1 ).concat( node.value )
            connector.listDirectory(
                {
                    path: this.joinPath( this.splitPath( this.rootPath ).concat( path ) ),
                    pattern: this.selectPattern,
                },
                data => {
                    this.onListDirectory( node, resolve, data )
                },
                () => resolve()
            )
        },
        onListDirectory( node, resolve, data ) {
            const { level } = node
            const nodes = ( this.onlyFolder ? [] : data.files ).map( x => {
                return {
                    label: x,
                    value: x,
                    leaf: true
                }
            } ).concat( data.dirs.map( x => {
                return {
                    label: x,
                    value: x,
                }
            } ) )
            if ( level === 0 && this.value2.length > 0 ) {
                this.value = this.multiple ? this.value2.map( x => [ x ] ) : this.value2
                this.value.map( item => {
                        let s = this.multiple ? item[0] : item
                        if ( s.indexOf( '/' ) > -1 )
                            nodes.push( {
                                label: s,
                                value: s,
                                leaf: true
                            } )
                    } )
            }
            resolve( nodes.length ? nodes : undefined )
        },
    }
}
</script>

<style scoped>
.el-cascader-panel {
    max-width: 300px;
}
</style>
