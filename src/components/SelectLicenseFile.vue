<template>
  <el-select
    ref="select"
    style="width: 100%"
    v-model="value"
    filterable
    clearable
    remote
    :remote-method="listRemoteLicenses"
    :loading="loading"
    @change="onValueChanged"
    placeholder="Select one license file">
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
    model: {
        name: 'value',
        event: 'change',
    },
    props: [ 'value' ],
    data() {
      return {
          options: [],
          source: [],
          loading: false,
      }
    },
    mounted() {
        this.refreshData()
    },
    methods: {
        refreshData() {
            this.listRemoteLicenses( '' )
        },
        listRemoteLicenses( query ) {
            if ( query === '' ) {
                this.loading = true
                connector.listLicense({}, this.onListLicense, this.onListLicenseFailed)
            }
            else
                this.filterLicenses( query )
        },
        filterLicenses( query ) {
            this.options = this.source.filter( item => {
                return item.label.indexOf( query ) > -1
            } )
        },
        onValueChanged( value ) {
            this.$emit( 'change', value )
        },
        onListLicense( data ) {
            this.loading = false
            this.source = [
                {
                    label: 'Default license',
                    value: 'true'
                },
                {
                    label: 'Do not generate license file',
                    value: 'false',
                }
            ].concat( data.map( item => {
                return {
                    label: [ item.rcode, item.summary ].join( ': ' ),
                    value: item.filename,
                }
            } ) )
            this.filterLicenses( '' )
        },
        onListLicenseFailed() {
            this.loading = false
        }
    }
}
</script>
