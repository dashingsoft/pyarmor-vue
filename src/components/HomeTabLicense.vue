<template>
  <div class="license-tab">
    <el-button v-on:click="newLicense"
               size="small">{{ $t('New') }}</el-button>
    <el-button v-on:click="refreshData"
               size="small">{{ $t('Refresh') }}</el-button>
    <el-table
      v-bind:data="tableData"
      stripe
      class="home-table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="180px"
                   label-position="left"
                   class="home-table-expand"
                   size="mini">
            <el-form-item :label="$t('Expired')">
              <span>{{ props.row.expired }}</span>
            </el-form-item>
            <el-form-item :label="$t('Harddisk')">
              <span>{{ props.row.harddisk }}</span>
            </el-form-item>
            <el-form-item :label="$t('IPv4')">
              <span>{{ props.row.ipv4 }}</span>
            </el-form-item>
            <el-form-item :label="$t('Mac Address')">
              <span>{{ props.row.mac }}</span>
            </el-form-item>
            <el-form-item v-if="0" :label="$t('Disable Restrict Mode')">
              <span>{{ props.row.disableRestrictMode }}</span>
            </el-form-item>
            <el-form-item :label="$t('Extra Data')">
              <span>{{ props.row.extraData }}</span>
            </el-form-item>
            <el-form-item :label="$t('Filename')">
              <span>{{ props.row.filename }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="rcode"
        :label="$t('Name')">
      </el-table-column>
      <el-table-column
        prop="summary"
        show-overflow-tooltip
        :label="$t('Summary')">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button @click="editLicense(scope.row)"
                     type="text"
                     :title="$t('Edit this license')"
                     icon="el-icon-edit"
                     size="medium"></el-button>
          <el-button @click="cloneLicense(scope.row)"
                     type="text"
                     v-if="0"
                     icon="el-icon-document-copy"
                     size="medium"></el-button>
          <el-button @click="removeLicense(scope.row)"
                     type="text"
                     :title="$t('Remove this license')"
                     icon="el-icon-delete"
                     size="medium"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import connector from '../connector.js'
import { _t } from '../plugins/gettext.js'

export default {
    name: 'HomeTabLicense',
    data: function () {
        return {
            tableData: []
        }
    },
    mounted: function () {
        connector.$on('list-license', this.onListLicense)
        connector.$on('new-license', this.onLicenseCreated)
        connector.$on('update-license', this.onLicenseUpdated)
        connector.$on('remove-license', this.onLicenseRemoved)
        this.refreshData()
    },
    methods: {
        refreshData: function () {
            connector.listLicense()
        },
        newLicense: function () {
            this.$emit('change-current-page', 'LicensePageEdit')
        },
        editLicense: function (data) {
            this.$emit('change-current-page', 'LicensePageEdit',
                       { licenseInfo: JSON.parse( JSON.stringify( data ) ) })
        },
        removeLicense: function (data) {
            this.$confirm(_t('Are you sure remove this license: %1 ?', data.rcode), _t('Confirm'), {
                type: 'warning'
            }).then(() => {
                connector.removeLicense(data)
            })
        },
        onListLicense: function (data) {
            this.tableData = data
        },
        onLicenseCreated: function (data) {
            if (this.tableData.length === 0 || this.tableData.slice(-1)[0].id !== data.id)
                this.tableData.push(data)
        },
        onLicenseUpdated: function (data) {
            for (var i = 0; i < this.tableData.length; i ++) {
                if (this.tableData[i].id === data.id) {
                    this.tableData[i] = data
                    break
                }
            }
        },
        onLicenseRemoved: function (data) {
            for (var i = 0; i < this.tableData.length; i ++) {
                if (this.tableData[i].id === data.id) {
                    this.tableData.splice(i, 1)
                    break
                }
            }
        },
    }
}
</script>
