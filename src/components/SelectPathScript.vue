<template>
  <el-cascader
    ref="cascader"
    style="width: 100%"
    v-model="value"
    filterable
    clearable
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
            type: [ String, Array ]
        },
        rootPath: {
            type: String,
            required: true,
            validator ( value ) {
                return value.length > 0
            }
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
            recentPath: []
        }
    },
    mounted() {
        this.value = this.multiple
            ? this.value2.map( x => this.splitPath( x ) )
            : this.splitPath( this.value2 )
    },
    methods: {
        splitPath( p ) {
            return p === '' ? [] : p === '/' ? [ '' ] : p.split( '/' )
        },
        joinPath( a ) {
            return a.length === 0 ? '' : ( a.length > 1 || a[0] !== '' ) ? a.join( '/' ) : '/'
        },
        onValueChanged() {
            this.$emit( 'change', this.multiple
                        ? this.value.map( x => this.joinPath( x ) )
                        : this.joinPath( this.value ) )
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
            const { level } = node
            let path = level === 0
                ? this.rootPath
                : this.path.slice( 0, level - 1 ).concat( node.value )
            connector.listDirectory(
                {
                    path: this.splitPath( this.rootPath ).concat( path ).join( '/' ),
                    pattern: this.selectPattern,
                },
                data => {
                    this.onListDirectory( node, resolve, data )
                },
                () => resolve()
            )
        },
        onListDirectory( node, resolve, data ) {
            localStorage.setItem( 'recent.directory', data.path )
            const nodes = ( this.onlyFolder ? [] : data.files ).map( x => {
                label: x,
                value: x,
                leaf: true
            } ).concat( data.dirs.map( x => { label: x, value: x } ) )
            resolve( nodes.length ? nodes : undefined )
        },
    }
}
</script>
