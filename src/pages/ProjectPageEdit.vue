<template>
  <div class="project-main">
    <el-page-header
      style="margin-bottom: 16px"
      v-on:back="goBack"
      v-bind:content="isEdit ? 'Edit Project' : 'New Project'">
      <div slot="content">
        <span v-if="isEdit">Edit Project</span>
        <span v-else>New Project</span>
        <span v-if="projectInfo.title"> - {{ projectInfo.title }}</span>
        <el-button
          v-if="isEdit"
          size="mini"
          icon="el-icon-edit"
          style="margin-left: 16px"
          @click="changeProjectTitle"
          type="text"></el-button>
      </div>
    </el-page-header>
    <el-form
      ref="form"
      v-bind:model="projectInfo"
      label-width="180px"
      label-position="left">
      <el-tabs type="border-card">
        <el-tab-pane label="Basic">
          <el-form-item label="Type">
            <span slot="label">Type
              <el-link :underline="false"> <i class="el-icon-question"></i></el-link></span>
            <el-select
              class="w-50"
              v-model="projectInfo.buildTarget">
              <el-option
                label="Obfuscate"
                :value="0"></el-option>
              <el-option
                label="Pack all to one folder"
                :value="1"></el-option>
              <el-option
                label="Pack all to one file"
                :value="2"></el-option>
              <el-option
                label="Pack all to one file with outer license"
                :value="3"></el-option>
            </el-select>
          </el-form-item>
          <project-input-file v-bind:project-info="projectInfo"></project-input-file>
        </el-tab-pane>
        <el-tab-pane label="Output">
            <project-input-target v-bind:project-info="projectInfo"></project-input-target>
        </el-tab-pane>
        <el-tab-pane label="Obfuscate Mode">
          <project-input-mode v-bind:project-info="projectInfo"></project-input-mode>
        </el-tab-pane>
        <el-tab-pane label="Advanced Options">
          <project-input-misc v-bind:project-info="projectInfo"></project-input-misc>
          <el-form-item
            label="Runtime Files">
            <el-select
              class="w-50"
              :disabled="projectInfo.buildTarget > 0"
              v-model="runtimeMode">
              <el-option
                v-for="item in runtimeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-form-item style="margin-top: 30px">
          <el-button type="primary" v-on:click="onSubmit">
            {{ isEdit ? "Update" : "Create" }}
          </el-button>
          <el-button type="default" v-show="isEdit" v-on:click="onBuild">
            Build
          </el-button>
          <el-button type="default" v-show="isEdit" v-on:click="onDiagnose">
            Diagnose
          </el-button>
          <el-button v-on:click="goBack">Close</el-button>
        </el-form-item>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import ProjectInputFile from './ProjectInputFile.vue'
import ProjectInputMode from './ProjectInputMode.vue'
import ProjectInputTarget from './ProjectInputTarget.vue'
import ProjectInputMisc from './ProjectInputMisc.vue'

import connector from '../connector.js'

export default {
    name: 'ProjectPageEdit',
    components: {
        ProjectInputFile,
        ProjectInputMode,
        ProjectInputTarget,
        ProjectInputMisc
    },
    props: {
        target: {
            type: Number,
            default: 0
        },
        projectInfo: {
            type: Object,
            default () {
                return {
                    title: '',
                    src: '',
                    entry: [],
                    include: 'all',
                    exclude: [],
                    buildTarget: this.target,
                    output: '',
                    bundleName: '',
                    packageRuntime: true,
                    noRuntime: false,
                    enableSuffix: false,
                    crossProtection: true,
                    bootstrapCode: 1,
                    platforms: [],
                    pack: [],
                    restrictMode: 2,
                    obfMod: true,
                    obfCode: true,
                    wrapMode: true,
                    advancedMode: false,
                    licenseFile: 'true',
                    plugins: []
                }
            }
        },
    },
    data() {
        return {
            runtimeOptions: [
                {
                    label: 'DO NOT generate runtime files',
                    value: -1,
                },
                {
                    label: 'Generate runtime files as a module "pytransform.py"',
                    value: 0,
                },
                {
                    label: 'Generate runtime files as a package "pytransform"',
                    value: 1,
                },
            ],
        }
    },
    computed: {
        isEdit() {
            return this.projectInfo.id
        },
        runtimeMode: {
            get() {
                return this.projectInfo.noRuntime ? -1 : this.projectInfo.packageRuntime ? 1 : 0
            },
            set( value ) {
                this.projectInfo.noRuntime = value === -1
                if ( value > -1 )
                    this.projectInfo.packageRuntime = !! value
            }
        },
    },
    methods: {
        goBack() {
            this.$emit('close-current-page')
        },
        onBuild() {
            connector.buildProject(
                this.projectInfo,
                (output) => {
                    this.$message( {
                        message: 'Build successfully, the results saved in: ' + output,
                        duration: 0,
                        showClose: true,
                    } )
                },
                'Building ' + this.projectInfo.title
            )
        },
        onDiagnose() {
            connector.diagnoseProject(
                this.projectInfo,
                (output) => {
                    this.$message( {
                        message: 'Build successfully, the results saved in: ' + output,
                        duration: 0,
                        showClose: true,
                    } )
                },
                'Diagnosing project ' + this.projectInfo.title
            )
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isEdit
                        ? connector.updateProject(this.projectInfo, this.onProjectUpdated)
                        : connector.newProject(this.projectInfo, this.onProjectUpdated)
                }
            } )
        },
        onProjectUpdated(data) {
            this.$message('The project "' + data.name + '" has been ' +
                          (this.isEdit ? 'updated' : 'created'))
            if (!this.isEdit)
                this.goBack()
        },
        changeProjectTitle() {
            this.$prompt('Please input project title', 'Input', {
                inputValue: this.projectInfo.title,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            }).then(({ value }) => {
                this.projectInfo.title = value
            })
        }
    }
}
</script>

<style scoped>
.project-main {
    width: 100%;
}
</style>
