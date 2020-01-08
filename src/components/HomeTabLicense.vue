<template>
  <div class="license-tab">
    <el-button v-on:click="newLicense"
               size="small">New</el-button>
    <el-button v-on:click="refreshData"
               size="small">Refresh</el-button>
    <el-table
      v-bind:data="tableData"
      stripe
      class="license-table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="180px"
                   label-position="left"
                   class="demo-table-expand"
                   size="mini">
            <el-form-item label="expired">
              <span>{{ props.row.expired }}</span>
            </el-form-item>
            <el-form-item label="Harddisk">
              <span>{{ props.row.harddisk }}</span>
            </el-form-item>
            <el-form-item label="IPv4">
              <span>{{ props.row.ipv4 }}</span>
            </el-form-item>
            <el-form-item label="Mac Address">
              <span>{{ props.row.mac }}</span>
            </el-form-item>
            <el-form-item label="Disable Restrict Mode">
              <span>{{ props.row.disable_restrict_mode }}</span>
            </el-form-item>
            <el-form-item label="Extra Data">
              <span>{{ props.row.extra_data }}</span>
            </el-form-item>
            <el-form-item label="Filename">
              <span>{{ props.row.filename }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="rcode"
        label="Name">
      </el-table-column>
      <el-table-column
        prop="summary"
        show-overflow-tooltip
        label="Summary">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button @click="editLicense(scope.row)"
                     type="text"
                     icon="el-icon-edit"
                     size="medium"></el-button>
          <el-button @click="cloneLicense(scope.row)"
                     type="text"
                     v-if="0"
                     icon="el-icon-document-copy"
                     size="medium"></el-button>
          <el-button @click="removeLicense(scope.row)"
                     type="text"
                     icon="el-icon-delete"
                     size="medium"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import connector from '../connector.js'

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
            this.$emit('change-current-page', 'LicensePageEdit', { licenseInfo: data })
        },
        removeLicense: function (data) {
            this.$confirm('Are you sure remove this license: ' + data.rcode + '?', 'Confirm', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                connector.removeLicense(data)
            })
        },
        onListLicense: function (data) {
            if ( ! (this.tableData && this.tableData.length
                    && this.tableData.slice(-1)[0].id === data.id) )
                this.tableData.push(data)
        },
        onLicenseCreated: function (data) {
            this.tableData.push(data)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.license-table {
    width: 100%;
    margin-top: 1.8em;
}
</style>
