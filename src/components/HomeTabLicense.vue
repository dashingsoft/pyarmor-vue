<template>
  <div class="license-tab">
    <el-button size="small" v-on:click="newLicense">New</el-button>
    <el-button size="small" v-on:click="refreshData">Refresh</el-button>
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
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="rcode"
        label="Code">
      </el-table-column>
      <el-table-column
        prop="title"
        show-overflow-tooltip
        label="Title">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button @click="removeLicense(scope.row)" type="text" size="small">Remove</el-button>
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
            this.$emit('change-current-page', 'LicensePageNew')
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
            this.tableData = data
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
