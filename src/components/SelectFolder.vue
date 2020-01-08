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
    @change="onValueChanged"
    @visible-change="onVisibleChanged">
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
                 icon="el-icon-folder"
                 v-if="! onlyFolder"
                 v-on:click.stop="onFilterOptions('')"></el-button>
      <el-button size="mini"
                 icon="el-icon-close"
                 v-on:click.stop="$refs['select'].blur"></el-button>
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
        v-on:click.stop="onEnterPath(item.value)"></el-button>
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
        this.$nextTick( this.resetInputPadding )
    },
    methods: {
        splitPath( p ) {
            return p === '' ? [] : p === '/' ? [ '' ] : p.split( '/' )
        },
        joinPath( a ) {
            return a.length === 0 ? '' : ( a.length > 1 || a[0] !== '' ) ? a.join( '/' ) : '/'
        },
        resetInputPadding() {
            let width = this.$refs.prefix.$el.clientWidth
            this.$el.querySelector( 'input.el-input__inner' ).style.paddingLeft =
                ( this.prefixVisible && width > 10 ) ? width + 'px' : ''
        },
        restoreInitPath() {
            this.loading = false
            this.prefix = this.splitPath( this.initValue )
            this.value = ''
            this.listRemoteDirectory( '' )
        },
        selectUpPath() {
            if ( this.prefix.length ) {
                this.prefix.pop()
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
            this.prefix.splice( index + 1 )
            this.listRemoteDirectory( '' )
        },
        listRemoteDirectory( query ) {
            this.$refs.select.focus()
            if ( query === '' && this.prefix.length === 0 ) {
                this.source = connector.getFavorPath( localStorage.getItem( 'recent.directory' ) )
                    .map( x => { return { label: x, value: x, isdir: true } } )
                this.options = this.source.slice()
            }
            else if ( query === '' || query.slice(-1) === '/' ) {
                this.loading = true
                let path = query === '' ? this.prefix : this.prefix.concat( query.slice(0, -1) )
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
                return ( this.onlyFolder ? item.isdir : true ) && item.value.indexOf( query ) > -1
            } )
        },
        onVisibleChanged ( visible ) {
            if ( ! this.onlyFolder )
                this.prefixVisible = visible
        },
        onValueChanged( value ) {
            this.$emit( 'change2', this.joinPath( this.prefix.concat( value ) ) )
            if ( value.indexOf( '/' ) > -1 ) {
                this.prefix = this.splitPath( value )
                this.value = this.prefix.pop()
                this.$nextTick( this.resetInputPadding )
            }
            this.resetInputPadding()
        }
    }
}
</script>

<style scoped>
.select-remote-folder {
  width: 100%;
}
</style>
