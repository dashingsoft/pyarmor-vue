<template>
  <el-card class="wizard-page">
    <el-page-header
      v-on:back="goBack"
      content="Obfuscate Script Wizard">
    </el-page-header>
    <el-divider></el-divider>
    <el-steps :active="active" align-center>
      <el-step
        title="Start"></el-step>
      <el-step
        title="Mode"></el-step>
      <el-step
        title="Finish"></el-step>
    </el-steps>
    <el-form
      ref="form"
      :model="projectInfo"
      :rules="rules"
      label-width="160px">
      <div class="item-card" v-show="isItemVisible( 'start' )">
        <el-form-item
          :rules="rules.src"
          prop="src"
          label="Src">
          <select-folder
            placeholder="Base path to find .py files"
            v-model="projectInfo.src">
          </select-folder>
        </el-form-item>
        <el-form-item label="Scripts">
          <select-path-script
            placeholder="Select one or more entry scripts"
            select-pattern="*.py"
            :only-script="true"
            :root-path="projectInfo.src"
            v-model="projectInfo.entry">
          </select-path-script>
        </el-form-item>
        <el-form-item label="Include">
          <el-select
            class="w-100"
            v-model="projectInfo.include">
            <el-option
              v-for="item in includeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Exclude">
          <select-path-script
            placeholder="Select path and scripts to exclude"
            :root-path="projectInfo.src"
            v-model="projectInfo.exclude">
          </select-path-script>
        </el-form-item>
      </div>
      <div class="item-card" v-show="isItemVisible( 'mode' )">
        <el-form-item label="Restrict Mode">
          <el-select
            v-model="projectInfo.restrictMode"
            placeholder="Select restrict mode">
            <el-option
              v-for="item in restrictModes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Bootstrap Code">
          <el-select
            class="w-100"
            placeholder="How to insert bootstrap code"
            v-model="projectInfo.bootstrapCode">
          </el-select>
        </el-form-item>
        <el-form-item label="Advanced Mode">
          <el-switch v-model="projectInfo.advancedMode">
          </el-switch>
        </el-form-item>
        <el-form-item label="Cross Protection">
          <el-switch v-model="projectInfo.crossProtection">
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
          <el-cascader
            class="w-100"
            clearable
            :options="platforms"
            :props="{ label: 'value', multiple: true }"
            :show-all-levels="false"
            v-model="projectInfo.platform"
            placeholder="Please select one or more platforms"></el-cascader>
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
import connector from '../connector.js'

export default {
    name: 'ObfuscatePageWizard',
    props: {
        feature:  {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: 0,
            steps: ['start', 'mode', 'finish'],
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
            }
        }
    },
    computed: {
        projectData() {
            return this.projectInfo
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
                this.feature === 'project' ? this.newProject() : this.obfuscateScript()
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
                this.projectData,
                this.onObfuscateFinished,
                undefined,
                'Obfuscate scripts: ' + this.projectData.entry.join( ',' )
            )
        },
        newProject() {
            connector.newProject( this.projectData, this.onProjectCreated )
        },
        onObfuscateFinished(output) {
            this.$message( 'Obfuscate the scripts successfully, ' +
                           'the result is saved to ' + output )
            this.goBack()
        },
        onProjectCreated(data) {
            this.$message( 'Create project ' + data.name + ' successfully' )
            this.goBack()
        }
    }
}
</script>

<style scoped>
.el-cascader-panel {
    max-width: 300px;
}
</style>
