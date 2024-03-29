<template>
    <el-card class="wizard-page">
      <el-page-header
        v-on:back="goBack"
        :content="$t('Pack Script Wizard')">
      </el-page-header>
      <el-divider></el-divider>
      <el-steps :active="active" align-center>
        <el-step
          :title="$t('Start')"></el-step>
        <el-step
          :title="$t('Data Files')"></el-step>
        <el-step
          :title="$t('Extra Options')"></el-step>
        <el-step
          :title="$t('Finish')"></el-step>
      </el-steps>
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-width="160px">
        <div class="item-card" v-show="isItemVisible( 'start' )">
          <el-form-item
            prop="src"
            :label="$t('Src')">
            <select-folder
              :placeholder="$t('Base path for entry script, data files, binary files etc.')"
              v-model="formData.src">
            </select-folder>
          </el-form-item>
          <el-form-item
            prop="entry"
            :label="$t('Script')">
            <select-path-script
              :placeholder="$t('The entry script')"
              select-pattern="*.py"
              :only-script="true"
              :multiple="false"
              :root-path="formData.src"
              v-model="formData.entry">
            </select-path-script>
          </el-form-item>
          <el-form-item :label="$t('Exclude')">
            <select-path-script
              :placeholder="$t('No obfuscated scripts in these paths')"
              :root-path="formData.src"
              :only-folder="true"
              v-model="formData.exclude">
            </select-path-script>
          </el-form-item>
        </div>
        <div class="item-card" v-show="isItemVisible( 'data' )">
          <el-form-item :label="$t('Hidden Imports')">
            <el-select
              multiple
              filterable
              allow-create
              default-first-option
              class="w-100"
              :no-data-text="$t('Type module or package name, then press ENTER')"
              :placeholder="$t('Name an import not visible in the code of the script(s)')"
              v-model="formData.hiddenImport">
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Data Files')">
            <el-select
              multiple
              filterable
              allow-create
              default-first-option
              class="w-100"
              :placeholder="$t('Additional data files or folders to be added to the executable')"
              :no-data-text="$t('Type file name or path name relative to src, then press ENTER')"
              v-model="formData.dataFile">
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Binary Files')">
            <el-select
              multiple
              filterable
              allow-create
              default-first-option
              class="w-100"
              :placeholder="$t('Additional binary files to be added to the executable')"
              :no-data-text="$t('Type binary filename relative to src, then press ENTER')"
              v-model="formData.binaryFile">
            </el-select>
          </el-form-item>
        </div>
        <div class="item-card" v-show="isItemVisible( 'options' )">
          <el-form-item :label="$t('No Console')">
            <el-switch
              :active-text="$t('Do not provide a console window for standard I/O')"
              v-model="formData.noConsole">
            </el-switch>
          </el-form-item>
          <el-form-item :label="$t('Icon')">
            <el-input
              :placeholder="$t('Apply icon to a Windows executable or the bundle on Mac OS X')"
              v-model="formData.icon">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('Extra Options')">
            <el-input
              type="textarea"
              autosize
              class="w-100"
              :placeholder="$t('Any other PyInstaller options to append command line')"
              v-model="formData.extraOptions">
            </el-input>
          </el-form-item>
        </div>
        <div class="item-card" v-show="isItemVisible( 'finish' )">
          <el-form-item
            :label="$t('Output')">
            <select-folder
              :placeholder="$t('The default output path is $src/dist')"
              :root-path="formData.src"
              :allow-create="true"
              v-model="formData.output">
            </select-folder>
            <el-switch
              :active-text="$t('Remove whole ouptput path before build')"
              v-model="formData.cleanOutput" />
          </el-form-item>
          <el-form-item :label="$t('Bundle')">
            <el-input
              :placeholder="$t('Name to the bundled app (default: basename of entry script)')"
              v-model="formData.bundleName">
              <el-select
                style="width: 260px"
                slot="prepend"
                v-model="formData.target">
                <el-option :label="$t('all to one folder')" :value="1"></el-option>
                <el-option :label="$t('all to one file')" :value="2"></el-option>
                <el-option :label="$t('all to one file with outer license')" :value="3"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item
            :label="$t('License')">
            <select-license-file
              :disabled="formData.target === 3"
              v-model="formData.licenseFile">
            </select-license-file>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            round
            plain
            type="primary"
            icon="el-icon-position"
            @click="finish">
            {{ $t('Pack') }}
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
import connector from '../connector.js'
import { _t } from '../plugins/gettext.js'

export default {
    name: 'PackPageWizard',
    props: {
        feature:  {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: 0,
            steps: ['start', 'data', 'options', 'finish'],
            formData: {
                src: '',
                entry: [],
                exclude: [],
                licenseFile: 'true',
                dataFile: [],
                binaryFile: [],
                hiddenImport: [],
                noConsole: false,
                icon: '',
                extraOptions: '',
                target: 1,
                output: '',
                cleanOutput: false
            },
            rules: {
                src: [ { required: true } ],
                entry: [ { required: true } ]
            }
        }
    },
    computed: {
        projectInfo() {
            let options = [this.formData.extraOptions]
            let src = this.formData.src
            if (this.formData.target === 'file')
                options.push( '--onefile' )
            if (this.formData.icon)
                options.push( '--icon', this.formData.icon )
            if (this.formData.noConsole)
                options.push( '--noconsole' )
            this.formData.hiddenImport.map( m => options.push( '--hidden-import', m ) )
            this.formData.dataFile.map( m => options.push( '--add-data', src + '/' + m ) )
            this.formData.binaryFile.map( m => options.push( '--add-binary', src + '/' + m ) )

            return {
                src: this.formData.src,
                entry: this.formData.entry,
                include: 'all',
                exclude: this.formData.exclude,
                buildTarget: this.formData.target,
                output: this.formData.output,
                bundleName: this.formData.bundleName,
                packageRuntime: false,
                noRuntime: false,
                enableSuffix: false,
                crossProtection: true,
                bootstrapCode: true,
                platforms: [],
                pack: options,
                restrictMode: 2,
                obfMod: true,
                obfCode: true,
                wrapMode: true,
                advancedMode: false,
                licenseFile: this.formData.target === 3 ? 'false' : this.formData.licenseFile,
                cleanOutput: this.formData.cleanOutput,
                plugins: []
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
                this.packScript()
            } )
        },
        isItemVisible( name ) {
            return this.steps[ this.active ] === name
        },
        goBack() {
            this.$emit('close-current-page')
        },
        packScript() {
            connector.buildProject(
                this.projectInfo,
                this.onPackFinished,
                _t('Packing script ') + this.formData.entry
            )
        },
        onPackFinished(output) {
            this.$message( _t('Pack obfuscated scripts successfully, the final bundle is saved: %1',
                              output ) )
        },
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
