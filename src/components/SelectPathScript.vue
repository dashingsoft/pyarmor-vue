<template>
  <el-select
    ref="select"
    style="width: 100%"
    v-model="value"
    filterable
    remote
    v-bind:multiple="multiple"
    v-bind:allow-create="allowCreate"
    v-bind:remote-method="listRemoteDirectory"
    v-bind:loading="loading"
    v-on:visible-change="v => { prefixVisible = v }"
    v-bind:placeholder="placeholder">
    <el-breadcrumb v-if="prefixVisible"
                   slot="prefix"
                   separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in prefix"
        :key="index">{{ item }}</el-breadcrumb-item>
      <span v-if="prefix.length"
            v-on:click="prefixLock = ! prefixLock"
            style="margin-left: 32px; cursor: pointer">
        <i v-if="prefixLock" class="el-icon-lock"></i>
        <i v-else class="el-icon-unlock"></i>
      </span>
    </el-breadcrumb>
    <el-option disabled value="">
      <el-button size="mini"
                 icon="el-icon-arrow-up"
                 v-on:click.stop="selectUpPath"></el-button>
      <el-button size="mini"
                 icon="el-icon-refresh-left"
                 v-on:click.stop="restoreInitValue"></el-button>
      <el-button size="mini"
                 icon="el-icon-link"
                 v-on:click.stop="selectRootPath"></el-button>
      <el-button size="mini"
                 icon="el-icon-folder"
                 v-bind:class="{ selected: folderVisible }"
                 v-on:click.stop="onFilterFolder"></el-button>
      <el-button size="mini"
                 icon="el-icon-check"
                 v-on:click.stop="$refs['select'].blur"></el-button>
    </el-option>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="margin-right: 16px">
        <i v-if="item.isfile"
           class="el-icon-document"></i>
        <i v-else
           style="cursor: default"
           class="el-icon-arrow-down"
           v-on:click.stop="onEnterPath(item.value)"></i>
      </span>
      <span>{{ item.label }}</span>
    </el-option>
  </el-select>
</template>

<script>
import connector from '../connector.js'

export default {
    name: 'SelectPathScript',
    props: {
        rootPath: {
            type: String,
            default: ''
        },
        initPrefix: {
            type: String,
            default: ''
        },
        initValue: {
            type: String,
            default: ''
        },
        onlyScript: Boolean,
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
    },
    data() {
      return {
          options: [],
          source: [],
          value: [],
          loading: false,
          prefix: [],
          path: [],
          folderVisible: true,
          prefixVisible: false,
          prefixLock: false,
      }
    },
    mounted() {
        this.$watch('loading', loading => {
            if ( loading ) {
                connector.$on('list-directory', this.onListDirectory)
                connector.$on('list-directory-failed', this.onListDirectoryFailed)
            }
            else {
                connector.$off('list-directory', this.onListDirectory)
                connector.$off('list-directory-failed', this.onListDirectoryFailed)
            }
        } )
        this.restoreInitValue()
    },
    methods: {
        splitPath( p ) {
            return p === '' ? [] : p === '/' ? [ '' ] : p.split( '/' )
        },
        joinPath( a ) {
            return a.length === 0 ? '' : ( a.length > 1 || a[0] !== '' ) ? a.join( '/' ) : '/'
        },
        restoreInitValue() {
            this.prefix = this.splitPath( this.initPrefix )
            this.path = this.prefix.slice()
            this.prefixLock = false
            this.loading = false
            let v = this.initValue
            this.value = ! this.multiple ? v : v.length ? v.split( ',' ) : []
            this.listRemoteDirectory( '' )
        },
        selectUpPath() {
            if ( this.path.join( '/' ).length > this.rootPath.length ) {
                this.path.pop()
                this.listRemoteDirectory( '' )
            }
            else
                this.$message.warning( 'This is top path' )
        },
        selectRootPath() {
            this.path = this.splitPath( this.rootPath )
            this.listRemoteDirectory( '' )
        },
        onEnterPath( path ) {
            this.listRemoteDirectory( path )
        },
        onFilterFolder() {
            this.folderVisible = ! this.folderVisible
            this.onFilterOption()
        },
        listRemoteDirectory( query ) {
            if ( this.path.length || query !== '' ) {
                this.loading = true
                connector.listDirectory( {
                    path: this.joinPath( query === '' ? this.path : this.path.concat( [ query ] ) ),
                } )
            } else {
                this.source = [
                    {
                        label: 'User Home',
                        value: '$HOME',
                    },
                    {
                        label: 'This Computer',
                        value: '/',
                    }
                ]
                let p = localStorage.getItem( 'recent.directory' )
                if (p)
                    this.source.push( {
                        label: p,
                        value: p
                    } )
                this.options = this.source.slice()
            }
        },
        onListDirectory( data ) {
            this.loading = false
            this.path = data.path
            let path = this.joinPath( this.path )
            if ( ! this.prefixLock ) {
                this.prefix = data.path
                this.$emit( 'prefix-changed', path )
            }
            localStorage.setItem( 'recent.directory', path )
            this.source = data.files.map( item => {
                return {
                    label: item,
                    value: item,
                    isfile: true
                }
            } ).concat( data.dirs.map( item => {
                return { label: item, value: item }
            } ) )
            this.onFilterOption()
        },
        onListDirectoryFailed() {
            this.loading = false
        },
        onFilterOption() {
            this.options = this.source.filter( item => {
                return ( this.folderVisible ? true : item.isfile ) &&
                    ( ( this.onlyScript && item.isfile ) ? item.value.slice(-3) === '.py' : true )
            } )
        }
    }
}
</script>
