<template>
  <el-select
    ref="select"
    v-model="value"
    class="select-remote-folder"
    filterable
    remote
    default-first-option
    :allow-create="allowCreate"
    :remote-method="listRemoteDirectory"
    :loading="loading"
    :placeholder="placeholder"
    @change="onValueChanged">
    <el-breadcrumb
      v-if="prefixVisible"
      slot="prefix"
      ref="prefix"
      separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in prefix"
        :key="index">
        <el-button
          type="text"
          size="mini"
          @click="onEnterPrefix(index)">
          {{ index ? item : "@" }}
        </el-button>
      </el-breadcrumb-item>
      <el-breadcrumb-item :key="-1">
        <el-button
          type="text"
          size="mini">
        </el-button>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-option disabled value="">
      <el-button size="mini"
                 icon="el-icon-arrow-up"
                 v-on:click.stop="selectUpPath"></el-button>
      <el-button size="mini"
                 icon="el-icon-refresh-left"
                 v-on:click.stop="restoreInitPath"></el-button>
      <el-button size="mini"
                 icon="el-icon-link"
                 v-on:click.stop="selectRootPath"></el-button>
      <el-button size="mini"
                 icon="el-icon-plus"
                 v-on:click.stop="onCreatePath"></el-button>
      <el-button size="mini"
                 icon="el-icon-delete"
                 v-on:click.stop="onDeletePath"></el-button>
    </el-option>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <el-button
        v-if="item.isdir"
        style="margin-right: 16px"
        size="mini"
        icon="el-icon-arrow-down"
        v-on:click.stop="enterPath(item.value)"></el-button>
      <span
        v-else
        style="margin-right: 16px">
        <i class="el-icon-document"></i>
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
          path: '',
          initValue: '',
          loading: false,
          options: [],
          source: [],
          prefix: [],
          prefixVisible: true,
      }
    },
    mounted() {
        this.initValue = this.value2
        this.restoreInitPath()
    },
    methods: {
        splitPath( p ) {
            return p === '' ? [] : p === '/' ? [ '' ] : p.split( '/' )
        },
        joinPath( a ) {
            return a.length === 0 ? '' : ( a.length > 1 || a[0] !== '' ) ? a.join( '/' ) : '/'
        },
        enterPath( path ) {
            if ( path.slice(0, 1) === '/' )
                this.prefix = this.splitPath( path )
            else
                this.prefix = this.prefix.concat( this.splitPath( path ) )
            this.$nextTick( () => {
                this.path = path
                this.value = ''
                this.resetInputPadding()
            } )
            this.listRemoteDirectory( '' )
        },
        resetInputPadding() {
            let width = this.$refs.prefix.$el.clientWidth
            this.$el.querySelector( 'input.el-input__inner' ).style.paddingLeft =
                ( this.prefixVisible && width > 10 ) ? width + 'px' : ''
        },
        restoreInitPath() {
            this.loading = false
            this.path = this.initValue
            this.prefix = this.splitPath( this.initValue )
            this.value = this.prefix.length ? this.prefix.pop() : ''
            this.$nextTick( this.resetInputPadding )
            this.listRemoteDirectory( '' )
        },
        selectUpPath() {
            if ( this.prefix.length ) {
                this.prefix.pop()
                this.enterPath( this.joinPath( this.prefix ) )
            }
            else
                this.$message.warning( 'This is top path' )
        },
        selectRootPath() {
            this.prefix = []
            this.enterPath( '' )
        },
        onCreatePath() {
            this.$prompt( 'Please input new path', 'Input', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputValidator: ( value ) => value.length > 0
            } ).then( ( { value } ) => {
                connector.newDirectory( [ this.path, value ].join( '/' ) )
            } )
        },
        onDeletePath() {
            this.$confirm( 'Are you sure to remove this path: ' + this.path, 'Confirm', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            } ).then( () => {
                if ( this.path.length > 2 )
                    connector.removeDirectory( this.path )
            } )
        },
        onEnterPrefix( index ) {
            this.enterPath( this.joinPath( this.prefix.splice( 0, index + 1 ) ) )
        },
        listRemoteDirectory( query ) {
            if ( query === '' && this.prefix.length === 0 ) {
                this.source = connector.getFavorPath( localStorage.getItem( 'recent.directory' ) )
                    .map( x => { return { label: x, value: x, isdir: true } } )
                this.options = this.source.slice()
            }
            else if ( query === '' ) {
                this.loading = true
                connector.listDirectory(
                    {
                        path: this.joinPath( this.prefix ),
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
                return ( this.onlyFolder ? item.isdir : true ) && item.value.indexOf( query ) > -1
            } )
        },
        onValueChanged( value ) {
            this.path = value.slice(0, 1) === '/'
                ? value
                : this.joinPath( value === '' ? this.prefix : this.prefix.concat( value ) )
            if ( this.path.length > 1 )
                localStorage.setItem( 'recent.directory', this.path )
            this.$emit( 'change2', this.path )

            if ( value.indexOf( '/' ) > -1 ) {
                this.prefix = this.splitPath( this.path )
                this.value = this.prefix.length ? this.prefix.pop() : ''
                this.$nextTick( this.resetInputPadding )
            }
        }
    }
}
</script>

<style scoped>
.select-remote-folder {
  width: 100%;
}
</style>
