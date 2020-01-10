<template>
    <el-card class="wizard-page">
      <el-page-header
        v-on:back="goBack"
        content="Pack Script Wizard">
      </el-page-header>
      <el-divider></el-divider>
      <el-steps :active="active" align-center>
        <el-step
          title="Start"></el-step>
        <el-step
          v-if="! outerLicense"
          title="Script License"></el-step>
        <el-step
          title="Other Files"></el-step>
        <el-step
          title="Extra Options"></el-step>
        <el-step
          title="Finish"></el-step>
      </el-steps>
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="160px">
        <div class="item-card" v-show="isItemVisible( 'start' )">
          <el-form-item
            prop="src"
            label="Src">
            <select-folder
              placeholder="Base path of entry script"
              v-model="formData.src">
            </select-folder>
          </el-form-item>
          <el-form-item
            prop="entry"
            label="Script">
            <select-path-script
              placeholder="The entry script"
              select-pattern="*.py"
              :only-script="true"
              :multiple="false"
              :root-path="formData.src"
              v-model="formData.entry">
            </select-path-script>
          </el-form-item>
          <el-form-item label="Exclude">
            <select-path-script
              placeholder="No obfuscated scripts in these pathes"
              :root-path="formData.src"
              :only-folder="true"
              v-model="formData.exclude">
            </select-path-script>
          </el-form-item>
        </div>
        <div class="item-card" v-if="!outerLicense" v-show="isItemVisible( 'license' )">
          <el-form-item
            label="Expired">
            <el-date-picker
              placeholder="Expired the scripts"
              type="date"
              value-format="yyyy-MM-dd"
              v-model="formData.licenseInfo.expired">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="Harddisk">
            <el-input
              placeholder="Bind obfuscated scripts to serial number of this harddisk">
              v-model="formData.licenseInfo.harddisk"></el-input>
          </el-form-item>
          <el-form-item
            label="Mac">
            <el-input
              placeholder="Bind obfuscated scripts to this mac address">
              v-model="formData.licenseInfo.mac"></el-input>
          </el-form-item>
        </div>
        <div class="item-card" v-show="isItemVisible( 'data' )">
          <el-form-item label="Hidden Imports">
            <el-select
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              no-data-text="Please input module or package name, then press ENTER"
              placeholder="Name an import not visible in the code of the script(s)"
              v-model="formData.hiddenImport">
            </el-select>
          </el-form-item>
          <el-form-item label="Data Files">
            <el-select
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              no-data-text="Please input filename or pattern, then press ENTER"
              placeholder="Additional non-binary files or folders to be added to the executable"
              v-model="formData.dataFile">
            </el-select>
          </el-form-item>
          <el-form-item label="Binary Files">
            <el-select
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 100%"
              no-data-text="Please input filename or pattern, then press ENTER"
              placeholder="Additional binary files to be added to the executable"
              v-model="formData.binaryFile">
            </el-select>
          </el-form-item>
        </div>
        <div class="item-card" v-show="isItemVisible( 'options' )">
          <el-form-item label="Icon">
            <select-path-script
              placeholder="Apply icon to a Windows executable or the bundle on Mac OS X"
              :root-path="formData.src"
              :multiple="false"
              :only-script="true"
              select-pattern="*.ic*"
              v-model="formData.icon">
            </select-path-script>
          </el-form-item>
          <el-form-item label="Console">
            <el-switch
              active-text="Open a console window for standard I/O"
              v-model="formData.consoleMode">
            </el-switch>
          </el-form-item>
          <el-form-item label="Extra Options">
            <el-input
              placeholder="Any other PyInstaller options to append command line"
              v-model="formData.extraOptions">
            </el-input>
          </el-form-item>
        </div>
        <div class="item-card" v-show="isItemVisible( 'finish' )">
          <el-form-item label="Bundle">
            <el-radio
              v-model="formData.target"
              label="folder">All to one folder</el-radio>
            <el-radio
              v-model="formData.target"
              label="file">All to one file</el-radio>
          </el-form-item>
          <el-form-item
            label="Output">
            <select-folder
              placeholder="The default output path is $src/dist"
              :root-path="formData.src"
              :allow-create="true"
              v-model="formData.output">
            </select-folder>
          </el-form-item>
          <el-form-item
            label="Name">
            <el-input
              placeholder="The default bundle name is entry script name"
              v-model="formData.name">
            </el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            round
            plain
            type="primary"
            icon="el-icon-position"
            @click="finish">
            Done
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
            :disabled="active === steps.length - 1"
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
    name: 'PackPageWizard',
    props: {
        feature:  {
            type: String,
            default: ''
        }
    },
    mounted() {
        if (this.feature === 'outer') {
            this.steps.splice( this.steps.indexOf( 'license' ), 1 )
            this.formData.withoutLicense = true
        }
    },
    data() {
        return {
            active: 0,
            steps: ['start', 'license', 'data', 'options', 'finish'],
            formData: {
                src: '',
                entry: '',
                exclude: [],
                licenseInfo: {
                    expired: '',
                    harddisk: '',
                    mac: ''
                },
                dataFile: [],
                binaryFile: [],
                hiddenImport: [],
                consoleMode: false,
                icon: '',
                extraOptions: '',
                target: 'folder',
                name: '',
                output: '',
            },
            rules: {
                src: [ { required: true } ],
                entry: [ { required: true } ]
            }
        }
    },
    computed: {
        canFinish() {
            return this.active > 0
        },
        outerLicense() {
            return this.feature === 'outer'
        }
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
                this.feature === 'project' ? this.newProject() : this.packScript()
            } )
        },
        isItemVisible( name ) {
            return this.steps[ this.active ] === name
        },
        goBack() {
            this.$emit('close-current-page')
        },
        packScript() {
            connector.buildTempProject( this.formData, this.onPackSuccess )
        },
        newProject() {
            connector.newProject( this.formData, this.onNewSuccess )
        },
        onPackFinished(output) {
            this.$message( 'Pack bundle to ' + output )
        },
        onNewSuccess(data) {
            this.$message( 'Create project ' + data.name + ' successfully' )
        }
    }
}
</script>

<style>
.wizard-page {
    width: 100%;
}
.wizard-page .item-card {
    width: 85%;
    padding-top: 32px;
    padding-bottom: 32px;
    margin-bottom: 16px;
}
</style>

<style scoped>
.el-cascader-panel {
    max-width: 300px;
}
</style>
