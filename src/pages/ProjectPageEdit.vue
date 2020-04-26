<template>
  <div class="project-main">
    <el-page-header
      style="margin-bottom: 16px"
      v-on:back="goBack"
      v-bind:content="isEdit ? $t('Edit Project') : $t('New Project')">
      <div slot="content">
        <span v-if="isEdit">{{ $t('Edit Project') }}</span>
        <span v-else>{{ $t('New Project') }}</span>
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
        <el-tab-pane :label="$t('Basic')">
          <el-form-item :label="$t('Type')">
            <el-select
              class="w-50"
              v-model="projectInfo.buildTarget">
              <el-option
                :label="$t('Obfuscate')"
                :value="0"></el-option>
              <el-option
                :label="$t('Pack all to one folder')"
                :value="1"></el-option>
              <el-option
                :label="$t('Pack all to one file')"
                :value="2"></el-option>
              <el-option
                :label="$t('Pack all to one file with outer license')"
                :value="3"></el-option>
            </el-select>
          </el-form-item>
          <project-input-file v-bind:project-info="projectInfo"></project-input-file>
        </el-tab-pane>
        <el-tab-pane :label="$t('Output')">
            <project-input-target v-bind:project-info="projectInfo"></project-input-target>
        </el-tab-pane>
        <el-tab-pane :label="$t('Obfuscate Mode')">
          <project-input-mode v-bind:project-info="projectInfo"></project-input-mode>
        </el-tab-pane>
        <el-tab-pane :label="$t('Advanced Options')">
          <project-input-misc v-bind:project-info="projectInfo"></project-input-misc>
          <el-form-item
            :label="$t('Runtime Files')">
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
import { _t } from '../plugins/gettext.js'

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
                    restrictMode: 1,
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
                    label: _t('DO NOT generate runtime files'),
                    value: -1,
                },
                {
                    label: _t('Generate runtime files as a module "pytransform.py"'),
                    value: 0,
                },
                {
                    label: _t('Generate runtime files as a package "pytransform"'),
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
                        message: _t('Build successfully, the results saved in: %1', output),
                        duration: 0,
                        showClose: true,
                    } )
                },
                _t('Building ') + this.projectInfo.title
            )
        },
        onDiagnose() {
            connector.diagnoseProject(
                this.projectInfo,
                (output) => {
                    this.$message( {
                        message: _t('Build successfully, the results saved in: ', output),
                        duration: 0,
                        showClose: true,
                    } )
                },
                _t('Diagnosing project ') + this.projectInfo.title
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
            this.$message(_t('The project "%1" has been %2', data.name,
                             (this.isEdit ? _t('updated') : _t('created'))))
            if (!this.isEdit)
                this.goBack()
        },
        changeProjectTitle() {
            this.$prompt(_t('Please input project title'), _t('Input'), {
                inputValue: this.projectInfo.title,
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
