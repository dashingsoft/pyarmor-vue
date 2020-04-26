<template>
  <div class="project-tab">
    <el-button v-on:click="newProject"
               size="small">{{ $t('New') }}</el-button>
    <el-button v-on:click="refreshData"
               size="small">{{ $t('Refresh') }}</el-button>
    <el-table
      v-bind:data="tableData"
      stripe
      class="home-table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-width="100px"
            label-position="left"
            class="home-table-expand"
            size="mini">
            <el-form-item :label="$t('Src')">
            <span>{{ props.row.src }}</span>
          </el-form-item>
          <el-form-item :label="$t('Entry')">
            <span>{{ props.row.entry }}</span>
          </el-form-item>
          <el-form-item :label="$t('Output')">
            <span>{{ getProjectOutput( props.row ) }}</span>
          </el-form-item>
          <el-form-item :label="$t('Target')">
            <span>{{ getTargetName( props.row.buildTarget ) }}</span>
          </el-form-item>
          <el-form-item :label="$t('Path')">
            <span>{{ props.row.path }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column
        sortable
        :label="$t('Name')"
        width="180">
        <template slot-scope="scope">
          <el-link :underline="false"
                   v-on:click="editProject(scope.row)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        :label="$t('Title')">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot-scope="scope">
          <el-button v-on:click="buildProject(scope.row)"
                     type="text"
                     :title="$t('Build this project')"
                     icon="el-icon-s-tools"
                     size="medium"></el-button>
          <el-button v-on:click="diagnoseProject(scope.row)"
                     type="text"
                     :title="$t('Build with debug information in case something is wrong')"
                     icon="el-icon-first-aid-kit"
                     size="medium"></el-button>
          <el-button v-on:click="removeProject(scope.row)"
                     type="text"
                     :title="$t('Remove this project')"
                     icon="el-icon-delete"
                     size="medium"></el-button>
          <el-button v-on:click="editProject(scope.row)"
                     type="text"
                     :title="$t('Edit this project')"
                     icon="el-icon-edit"
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
            return target === 0 ? _t('Obfuscate') : target === 1 ? _t('One folder bundle')
                : target === 2 ? _t('One file bundle') : _t('One file bundle with outer license')
        },
        getProjectOutput( data ) {
            let suffix = data.bundleName && data.bundleName.length ? '/' + data.bundleName : ''
            return ( data.output.length ? data.output : ( data.src + '/dist' ) ) + suffix
        },
        refreshData: function () {
            connector.listProject()
        },
        newProject: function () {
            this.$emit('change-current-page', 'ProjectPageEdit')
        },
        buildProject: function (data) {
            connector.buildProject(
                data,
                (output) => {
                    this.$message( {
                        message: _t('Build successfully, the results saved in: %1', output),
                        duration: 0,
                        showClose: true,
                    } )
                },
                _t('Building ') + data.name
            )
        },
        diagnoseProject: function (data) {
            connector.diagnoseProject(
                data,
                (output) => {
                    this.$message( {
                        message: _t('Build successfully, the results saved in: %1', output),
                        duration: 0,
                        showClose: true,
                    } )
                },
                _t('Diagnosing project ') + data.name
            )
        },
        editProject: function (data) {
            this.$emit('change-current-page', 'ProjectPageEdit',
                       { projectInfo: JSON.parse( JSON.stringify( data ) ) } )
        },
        removeProject: function (data) {
            this.$confirm(_t('Are you sure remove this project: %1 ?', data.name), _t('Confirm'), {
                type: 'warning'
            }).then(() => {
                data['clean'] = true
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

<style>
.home-table {
    width: 100%;
    margin-top: 1.8em;
}
.home-table-expand {
    font-size: 0;
}
.home-table-expand label {
    color: #99a9bf;
}
.home-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
}
</style>
