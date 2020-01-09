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
          <project-input-file v-bind:project-info="projectInfo"></project-input-file>
        </el-tab-pane>
        <el-tab-pane label="Build Options">
            <project-input-target v-bind:project-info="projectInfo"></project-input-target>
        </el-tab-pane>
        <el-tab-pane label="Obfuscate Mode">
          <project-input-mode v-bind:project-info="projectInfo"></project-input-mode>
        </el-tab-pane>
        <el-tab-pane label="Advanced Options">
          <project-input-misc v-bind:project-info="projectInfo"></project-input-misc>
        </el-tab-pane>
        <el-form-item style="margin-top: 30px">
          <el-button type="primary" v-on:click="onSubmit">
            {{ isEdit ? "Update" : "Create" }}
          </el-button>
          <el-button v-on:click="goBack">Cancel</el-button>
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
        features: {
            type: String,
            default: ''
        },
        projectInfo: {
            type: Object,
            default: function () {
                return {
                    title: '',
                    src: '',
                    entry: [],
                    include: 'recursive',
                    exclude: [],
                    buildTarget: 'obf',
                    output: '',
                    packageName: '',
                    enableSuffix: false,
                    packageRuntime: 1,
                    crossProtection: true,
                    bootstrapCode: true,
                    runtimePath: '',
                    platform: [],
                    pack: '',
                    restrictMode: 2,
                    entryMode: [],
                    obfMod: true,
                    obfCode: true,
                    wrapMode: true,
                    advancedMode: false,
                    licenseFile: '',
                    plugins: []
                }
            }
        }
    },
    computed: {
        isEdit() {
            return this.projectInfo.id
        }
    },
    methods: {
        goBack() {
            this.$emit('close-current-page')
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
