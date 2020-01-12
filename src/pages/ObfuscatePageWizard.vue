<template>
  <el-card class="wizard-page">
    <el-page-header
      v-on:back="goBack"
      content="Obfuscate Script Wizard">
    </el-page-header>
    <el-divider></el-divider>
    <el-steps :active="active" simple>
      <el-step
        title="Start"></el-step>
      <el-step
        title="Advanced"></el-step>
      <el-step
        title="Finish"></el-step>
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
        <el-form-item label="Cross Protection">
          <el-switch
            active-text="Inject cross protection code into entry scripts before obfuscating"
            v-model="projectInfo.crossProtection">
          </el-switch>
        </el-form-item>
      </div>
      <div class="item-card" v-show="isItemVisible( 'finish' )">
        <el-form-item
          label="Output">
          <select-folder
            placeholder="The default output path is $src/dist"
            :root-path="projectInfo.src"
            :allow-create="true"
            v-model="projectInfo.output">
          </select-folder>
        </el-form-item>
        <el-form-item
          label="Package Name">
          <el-input
            :disabled="projectInfo.src === ''"
            :readonly="autoOutputSuffix"
            placeholder="Append this name to output path"
            v-model="projectInfo.bundleName">
            <el-switch
              slot="prepend"
              :disabled="projectInfo.src === ''"
              v-model="autoOutputSuffix"></el-switch>
          </el-input>
        </el-form-item>
        <el-form-item
          label="Platforms">
          <select-platform
            class="w-100"
            v-model="projectInfo.platform"></select-platform>
        </el-form-item>
        <el-form-item label="License">
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
          Obfuscate
        </el-button>
          <el-button
            round
            plain
            type="info"
            icon="el-icon-close"
            @click="goBack">
            Close
          </el-button>
          <el-button
            round
            :disabled="active === 0"
            icon="el-icon-arrow-left"
            @click="prev">
            Prev
          </el-button>
          <el-button
            round
            :disabled="active >= steps.length - 1"
            @click="next">
            Next <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </el-form-item>
      </el-form>
   </el-card>
</template>

<script>
import ProjectInputFile from './ProjectInputFile.vue'
import ProjectInputMisc from './ProjectInputMisc.vue'

import connector from '../connector.js'

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
                include: 'recursive',
                exclude: [],
                buildTarget: 0,
                output: '',
                bundleName: '',
                packageRuntime: 1,
                crossProtection: true,
                bootstrapCode: 1,
                platform: [],
                restrictMode: 2,
                obfMod: true,
                obfCode: true,
                wrapMode: true,
                advancedMode: false,
                licenseFile: 'true',
                plugins: []
            },
            rules: {
                src: [ { required: true } ],
                entry: [ { required: true } ]
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
            connector.buildTempProject(
                this.projectInfo,
                this.onObfuscateFinished,
                'Obfuscate scripts: ' + this.projectInfo.entry.join( ',' )
            )
        },
        onObfuscateFinished(output) {
            this.$message( 'Obfuscate the scripts successfully, ' +
                           'the result is saved to ' + output )
        },
    }
}
</script>

<style scoped>
.el-cascader-panel {
    max-width: 300px;
}
</style>
