<template>
  <div class="license-tab">
    <el-button size="small" v-on:click="newLicense">New</el-button>
    <el-button size="small" v-on:click="refreshData">Refresh</el-button>
    <el-table
      v-bind:data="tableData"
      stripe
      class="license-table">
      <el-table-column
        sortable
        prop="rcode"
        label="Code">
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
