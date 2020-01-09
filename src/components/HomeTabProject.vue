<template>
  <div class="project-tab">
    <el-button v-on:click="newProject"
               size="small">New</el-button>
    <el-button v-on:click="refreshData"
               size="small">Refresh</el-button>
    <el-table
      v-bind:data="tableData"
      stripe
      class="project-table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="100px" label-position="left" class="demo-table-expand" size="mini">
            <el-form-item label="Src">
            <span>{{ props.row.src }}</span>
          </el-form-item>
          <el-form-item label="Entry">
            <span>{{ props.row.entry }}</span>
          </el-form-item>
          <el-form-item label="Output">
            <span>{{ getProjectOutput( props.row ) }}</span>
          </el-form-item>
          <el-form-item label="Target">
            <span>{{ getTargetName( props.row.buildTarget ) }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column
        sortable
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button v-on:click="buildProject(scope.row)"
                     type="text"
                     icon="el-icon-s-tools"
                     size="medium"></el-button>
          <el-button v-on:click="editProject(scope.row)"
                     type="text"
                     icon="el-icon-edit"
                     size="medium"></el-button>
          <el-button v-on:click="removeProject(scope.row)"
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
    name: 'HomeTabProject',
    data: function () {
        return {
            tableData: []
        }
    },
    mounted: function () {
        connector.$on('list-project', this.onListProject)
        connector.$on('new-project', this.onProjectCreated)
        connector.$on('remove-project', this.onProjectRemoved)
        connector.$on('update-project', this.onProjectUpdated)
        this.refreshData()
    },
    methods: {
        getTargetName( target ) {
            return target === 'pack' ? 'Pack' : 'Obfuscate'
        },
        getProjectOutput( data ) {
            let suffix = data.packageName && data.packageName.length ? '/' + data.packageName : ''
            return ( data.output.length ? data.output : ( data.output.src + '/dist' ) ) + suffix
        },
        refreshData: function () {
            connector.listProject()
        },
        newProject: function () {
            this.$emit('change-current-page', 'ProjectPageEdit')
        },
        buildProject: function (data) {
            this.$emit('change-current-page', 'ProjectPageBuild', { projectInfo: data } )
        },
        editProject: function (data) {
            this.$emit('change-current-page', 'ProjectPageEdit', { projectInfo: data } )
        },
        removeProject: function (data) {
            this.$confirm('Are you sure remove this project: ' + data.name + '?', 'Confirm', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                connector.removeProject(data)
            })
        },
        onListProject: function (data) {
            this.tableData = data
        },
        onProjectCreated: function (data) {
            if (this.tableData.length === 0 || this.tableData.slice(-1)[0].id !== data.id)
                this.tableData.push(data)
        },
        onProjectUpdated: function (data) {
            for (var i = 0; i < this.tableData.length; i ++) {
                if (this.tableData[i].id === data.id) {
                    this.tableData[i] = data
                    break
                }
            }
        },
        onProjectRemoved: function (data) {
            for (var i = 0; i < this.tableData.length; i ++) {
                if (this.tableData[i].id === data.id) {
                    this.tableData.splice(i, 1)
                    break
                }
            }
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project-table {
    width: 100%;
    margin-top: 1.8em;
}
  .demo-table-expand {
    font-size: 0;
  }
    .demo-table-expand label {
        margin-right: auto;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
</style>
