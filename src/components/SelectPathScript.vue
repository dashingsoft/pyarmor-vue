<template>
  <el-cascader
    ref="cascader"
    style="width: 100%"
    v-model="value"
    filterable
    clearable
    @expand-change="onExpandChanged"
    :multiple="multiple"
    :placeholder="placeholder"
    :props="panelProps">
  </el-cascader>
</template>

<script>
import connector from '../connector.js'

const rootNodes = [
    {
        label: 'User Home',
        value: '$HOME',
    },
    {
        label: 'This Computer',
        value: '/',
    }
]

export default {
    name: 'SelectPathScript',
    props: {
        rootPath: {
            type: String,
            default: ''
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
        allowCreate: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        recommendPath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            path: [],
            value: [],
            panelProps: {
                multiple: false,
                lazy: true,
                checkStrictly: true,
                lazyLoad: this.listRemoteDirectory
            },
        }
    },
    mounted() {
        this.panelProps.multiple = this.multiple
        this.panelProps.checkStrictly = ! this.onlyScript
        this.value = this.multiple ? [] : ''
        // let p = localStorage.getItem( 'recent.directory' )
    },
    methods: {
        splitPath( p ) {
            return p === '' ? [] : p === '/' ? [ '' ] : p.split( '/' )
        },
        joinPath( a ) {
            return a.length === 0 ? '' : ( a.length > 1 || a[0] !== '' ) ? a.join( '/' ) : '/'
        },
        onExpandChanged( nodes ) {
            this.path = nodes.map( x => x.toString() )
            if ( this.path[ 0 ] === '/' )
                this.path[ 0 ] = ''
        },
        listRemoteDirectory(node, resolve) {
            const { level } = node
            if ( level === 0 && this.rootPath === '' ) {
                resolve( rootNodes )
            }
            else {
                let path = this.path.slice( 0, level - 1 ).concat( [ node.value ] )
                connector.listDirectory(
                    {
                        path: this.rootPath + path.join( '/' ),
                        pattern: this.selectPattern,
                    },
                    data => {
                        this.onListDirectory( node, resolve, data )
                    },
                    () => resolve()
                )
            }
        },
        onListDirectory( node, resolve, data ) {
            let path = data.path
            localStorage.setItem( 'recent.directory', path )
            if ( node.level === 1 && node.value.indexOf( '$' ) !== -1 )
                node.value = path
            const nodes = data.dirs.map( item => {
                return {
                    label: item,
                    value: item,
                }
            } ).concat( ( this.onlyFolder ? [] : data.files ).map( item => {
                return {
                    label: item,
                    value: item,
                    leaf: true
                }
            } ) )
            resolve( nodes )
        },
    }
}
</script>
