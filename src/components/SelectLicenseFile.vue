<template>
  <el-select
    ref="select"
    class="w-100"
    v-model="value"
    filterable
    clearable
    remote
    :disabled="disabled"
    :remote-method="listRemoteLicenses"
    :loading="loading"
    @change="onValueChanged"
    :placeholder="$t('Select one license file to restrict the obfuscated script')">
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
import { _t } from '../plugins/gettext.js'

export default {
    name: 'SelectLicenseFile',
    model: {
        prop: 'value2',
        event: 'change2',
    },
    props: {
        value2: String,
        disabled: Boolean,
    },
    data() {
        return {
            value: 'true',
            options: [],
            source: [],
            loading: false,
        }
    },
    mounted() {
        this.value = this.value2
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
            this.$emit( 'change2', value )
        },
        onListLicense( data ) {
            this.loading = false
            this.source = [
                {
                    label: _t('Default license, no any restrict'),
                    value: 'true'
                },
                {
                    label: _t('Do not include license file'),
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
