<template>
  <el-card class="wizard-page">
    <el-page-header
      v-on:back="goBack"
      :content="$t('Obfuscate Script Wizard')">
    </el-page-header>
    <el-divider></el-divider>
    <el-steps :active="active" simple>
      <el-step
        :title="$t('Start')"></el-step>
      <el-step
        :title="$t('Advanced')"></el-step>
      <el-step
        :title="$t('Finish')"></el-step>
    </el-steps>
    <el-form
      ref="form"
      :model="projectInfo"
      :rules="rules"
      label-width="200px">
      <div class="item-card" v-show="isItemVisible( 'start' )">
        <project-input-file v-bind:project-info="projectInfo"></project-input-file>
      </div>
      <div class="item-card" v-show="isItemVisible( 'advanced' )">
        <project-input-misc v-bind:project-info="projectInfo"></project-input-misc>
        <el-form-item v-show="!$root.v8mode" :label="$t('Cross Protection')">
          <el-switch
            :active-text="$t('Inject cross protection code into entry scripts before obfuscating')"
            v-model="projectInfo.crossProtection">
          </el-switch>
        </el-form-item>
      </div>
      <div class="item-card" v-show="isItemVisible( 'finish' )">
        <el-form-item
          :label="$t('Output')">
          <select-folder
            :placeholder="$t('The default output path is $src/dist')"
            :root-path="projectInfo.src"
            :allow-create="true"
            v-model="projectInfo.output">
          </select-folder>
        </el-form-item>
        <el-form-item
          :label="$t('Package Name')">
          <el-input
            :disabled="projectInfo.src === ''"
            :readonly="autoOutputSuffix"
            :placeholder="$t('Append this name to output path')"
            v-model="projectInfo.bundleName">
            <el-switch
              slot="prepend"
              :disabled="projectInfo.src === ''"
              v-model="autoOutputSuffix"></el-switch>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('Platforms')">
          <select-platform
            class="w-100"
            :advanced="false"
            v-model="projectInfo.platforms"></select-platform>
        </el-form-item>
        <el-form-item :label="$t('License')">
          <select-license-file
            v-model="projectInfo.licenseFile"></select-license-file>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          round
          plain
          type="primary"
          icon="el-icon-position"
          @click="finish">
          {{ $t('Obfuscate') }}
        </el-button>
          <el-button
            round
            plain
            type="info"
            icon="el-icon-close"
            @click="goBack">
            {{ $t('Close') }}
          </el-button>
          <el-button
            round
            :disabled="active === 0"
            icon="el-icon-arrow-left"
            @click="prev">
            {{ $t('Prev') }}
          </el-button>
          <el-button
            round
            :disabled="active >= steps.length - 1"
            @click="next">
            {{ $t('Next') }} <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </el-form-item>
      </el-form>
   </el-card>
</template>

<script>
import ProjectInputFile from './ProjectInputFile.vue'
import ProjectInputMisc from './ProjectInputMisc.vue'

import connector from '../connector.js'
import { _t } from '../plugins/gettext.js'

export default {
    name: 'ObfuscatePageWizard',
    components: {
        ProjectInputFile,
        ProjectInputMisc
    },
    props: {
        feature:  {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: 0,
            steps: ['start', 'advanced', 'finish'],
            projectInfo: {
                title: '',
                src: '',
                entry: [],
                include: 'all',
                exclude: [],
                buildTarget: 0,
                output: '',
                bundleName: '',
                packageRuntime: true,
                noRuntime: false,
                enableSuffix: false,
                crossProtection: true,
                bootstrapCode: 1,
                platforms: [],
                restrictMode: 1,
                obfMod: true,
                obfCode: 1,
                wrapMode: true,
                advancedMode: 0,
                licenseFile: 'true',
                plugins: []
            },
            rules: {
                src: { required: true },
                entry: { required: true }
            },
            outputSuffixMode: false,
        }
    },
    computed: {
        autoOutputSuffix: {
            get() {
                return this.outputSuffixMode
            },
            set( value ) {
                this.outputSuffixMode = value
                this.projectInfo.bundleName = value ? this.projectInfo.src.split( '/' ).pop() : ''
            }
        },
    },
    methods: {
        next() {
            if ( this.active < this.steps.length - 1 )
                this.active ++
        },
        prev() {
            if ( this.active > 0 )
                this.active --
        },
        finish() {
            this.$refs['form'].validate( (valid) => {
                if (!valid)
                    return false
                this.obfuscateScript()
            } )
        },
        isItemVisible( name ) {
            return this.steps[ this.active ] === name
        },
        goBack() {
            this.$emit('close-current-page')
        },
        obfuscateScript() {
            connector.buildProject(
                this.projectInfo,
                this.onObfuscateFinished,
                _t('Obfuscate scripts: ') + this.projectInfo.entry.join( ',' )
            )
        },
        onObfuscateFinished(output) {
            this.$message( _t('Obfuscate the scripts successfully, the result is saved to %1',
                              output) )
        },
    }
}
</script>

<style scoped>
.el-cascader-panel {
    max-width: 300px;
}
</style>
