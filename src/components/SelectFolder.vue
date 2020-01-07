<template>
  <el-select
    ref="select"
    v-model="value"
    style="width: 100%"
    filterable
    remote
    :allow-create="allowCreate"
    :remote-method="listRemoteDirectory"
    :loading="loading"
    :placeholder="placeholder"
    @change="onValueChanged">
    <el-breadcrumb
      v-if="visible"
      slot="prefix"
      separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in prefix"
        :key="index"
        @click="onEnterPrefix(index)">
        {{ item }}
      </el-breadcrumb-item>
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
                 v-if="! onlyFolder"
                 v-on:click.stop=""></el-button>
      <el-button size="mini"
                 icon="el-icon-close"
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
    name: 'SelectFolder',
    model: {
        prop: 'value2',
        event: 'change2',
    },
    props: {
        value2: String,
        allowCreate: {
            type: Boolean,
            default: false
        },
        onlyFolder: {
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
          value: '',
          loading: false,
          options: [],
          source: [],
          prefix: [],
      }
    },
    mounted() {
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
            this.loading = false
            this.prefix = this.splitPath( this.value2 )
            this.listRemoteDirectory( '' )
        },
        selectUpPath() {
            if ( this.path.length ) {
                this.path.pop()
                this.listRemoteDirectory( '' )
            }
            else
                this.$message.warning( 'This is top path' )
        },
        selectRootPath() {
            this.prefix = []
            this.listRemoteDirectory( '' )
        },
        onEnterPath( path ) {
            this.listRemoteDirectory( path + '/' )
        },
        onEnterPrefix( index ) {
            this.$message( 'The prefix is ' + this.joinPath( this.prefix.slice(0, index + 1) ))
        },
        listRemoteDirectory( query ) {
            if ( query === '' && this.prefix.length === 0 ) {
                this.source = connector.getFavorPath( localStorage.getItem( 'recent.directory' ) )
                    .map( x => { return { label: x, value: x } } )
                this.options = this.source.slice()
            }
            else if ( query === '' || query.slice(-1) === '/' ) {
                this.loading = true
                let path = query === '' ? this.prefix : this.prefix.concat( [ query ] )
                connector.listDirectory(
                    {
                        path: this.joinPath( path ),
                        pattern: this.selectPattern,
                    },
                    this.onListDirectory,
                    this.onListDirectoryFailed
                )
            }
            else
                this.onFilterOptions( query )
        },
        onListDirectory( data ) {
            this.loading = false
            this.prefix = this.splitPath( data.path )
            localStorage.setItem( 'recent.directory', data.path )
            this.source = data.dirs.map( item => {
                return {
                    label: item,
                    value: item,
                    isdir: true
                }
            } ).concat( data.files.map( item => {
                return { label: item, value: item }
            } ) )
            this.onFilterOptions( '' )
        },
        onListDirectoryFailed() {
            this.loading = false
        },
        onFilterOptions( query ) {
            this.options = this.source.filter( item => {
                return ( this.onlyFolder ? item.isdir : true ) && item.indexOf( query ) > -1
            } )
        },
        onValueChanged( value ) {
            this.$emit( 'change2', this.joinPath( this.prefix.concat( value ) ) )
        }
    }
}
</script>
