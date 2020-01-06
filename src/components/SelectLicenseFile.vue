<template>
  <el-select
    ref="select"
    style="width: 100%"
    v-model="value"
    filterable
    remote
    v-bind:remote-method="listRemoteLicenses"
    v-bind:loading="loading"
    placeholder="Select one license file">
    <el-option disabled value="">
      <el-button size="mini"
                 icon="el-icon-refresh-left"
                 v-on:click.stop="refreshData"></el-button>
      <el-button size="mini"
                 icon="el-icon-check"
                 v-on:click.stop="$refs['select'].blur"></el-button>
    </el-option>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import connector from '../connector.js'

export default {
    name: 'SelectLicenseFile',
    data() {
      return {
          options: [],
          source: [],
          value: '',
          loading: false,
      }
    },
    mounted() {
        this.$watch('loading', loading => {
            if ( loading ) {
                connector.$on('list-license', this.onListLicense)
                connector.$on('list-license-failed', this.onListLicenseFailed)
            }
            else {
                connector.$off('list-license', this.onListLicense)
                connector.$off('list-license-failed', this.onListLicenseFailed)
            }
        } )
        this.refreshData()
    },
    methods: {
        refreshData() {
            this.listRemoteLicenses( '' )
        },
        listRemoteLicenses( query ) {
            if ( query === '' ) {
                this.loading = true
                connector.listLicense()
            }
            else
                this.filterLicenses( query )
        },
        onListLicense( data ) {
            this.loading = false
            this.source = data.map( item => {
                return {
                    label: [ item.rcode, item.summary ].join( ': ' ),
                    value: item.filename,
                }
            } )
            this.filterLicenses( '' )
        },
        onListLicenseFailed() {
            this.loading = false
        },
        filterLicenses( query ) {
            this.options = this.source.filter( item => {
                return item.lable.indexOf( query ) > -1
            } )
        }
    }
}
</script>
