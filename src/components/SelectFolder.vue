<template>
  <el-select
    ref="select"
    v-model="value"
    class="w-100"
    filterable
    remote
    default-first-option
    :allow-create="allowCreate"
    :remote-method="listRemoteDirectory"
    :loading="loading"
    :placeholder="placeholder"
    @visible-change="onVisibleChanged"
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
      <el-button size="mini"
                 icon="el-icon-check"
                 v-on:click.stop="onAcceptPath"></el-button>
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
        selectPattern: {
            type: String,
            default: '*'
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
          inputElement: null,
      }
    },
    mounted() {
        this.inputElement = this.$el.querySelector( 'input.el-input__inner' )
        // this.initValue = this.value2
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
            this.path = this.joinPath( this.prefix )
            this.value = ''
            this.inputElement.setAttribute( 'placeholder', this.$refs.select.cachedPlaceHolder )
            this.$nextTick( () => {
                this.resetInputPadding()
            } )
            this.listRemoteDirectory( '' )
        },
        resetInputPadding() {
            let width = this.$refs.prefix.$el.clientWidth
            this.inputElement.style.paddingLeft =
                ( this.prefixVisible && width > 10 ) ? width + 'px' : ''
        },
        restoreInitPath() {
            this.loading = false
            this.path = this.value2
            this.prefix = this.splitPath( this.value2 )
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
        onAcceptPath() {
            if ( this.value === '' )
                this.onValueChanged( this.joinPath( this.prefix ) )
            this.$nextTick( () => {
                this.$refs.select.blur()
            } )
        },
        onCreatePath() {
            this.$prompt( 'Please type path to create in ' + this.path, 'Input', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputValidator: ( value ) => value.length > 0
            } ).then( ( { value } ) => {
                connector.newDirectory(
                    [ this.path, value ].join( '/' ),
                    ret => {
                        this.$message( 'This path has been created: ' + ret )
                    }
                )
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
            this.enterPath( this.joinPath( this.prefix.slice( 0, index + 1 ) ) )
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
            else if ( query === '<' || query === '^' ) {
                if ( this.prefix.length > 0 )
                    this.$nextTick( () => {
                        this.inputElement.value = ''
                        setTimeout( () => {
                            this.enterPath( this.joinPath( this.prefix.slice( 0, -1 ) ) )
                        }, 500 )
                    } )
            }
            else if ( query.slice( -1 ) === '>' || query.slice( -1 ) === '/' ) {
                this.onFilterOptions( query.slice(0, -1) )
                if ( this.options.length === 1 )
                    this.$nextTick( () => {
                        this.inputElement.value = ''
                        setTimeout( () => {
                            this.enterPath( this.options[ 0 ].value )
                        }, 500 )
                    } )
            }
            else {
                this.onFilterOptions( query )
            }
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
        onVisibleChanged( visible ) {
            if ( ! visible )
                this.$emit( 'change2', this.path )
        },
        onValueChanged( value ) {
            if ( value.slice(0, 1) === '/' ) {
                this.path = value
                this.prefix = this.splitPath( value )
                this.value = this.prefix.length ? this.prefix.pop() : ''
                this.$nextTick( () => {
                    this.resetInputPadding()
                } )
                this.listRemoteDirectory( '' )
            }
            else
                this.path = this.joinPath( value === '' ? this.prefix : this.prefix.concat( value ) )
            if ( this.path.length > 1 )
                localStorage.setItem( 'recent.directory', this.path )
            this.$emit( 'change2', this.path )
        }
    }
}
</script>
