<template>
  <div class="project-target">
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
      :label="$t('Bundle Name')">
      <el-input
        :disabled="projectInfo.src === ''"
        :readonly="autoOutputSuffix"
        :placeholder="bundlePlaceholder"
        v-model="projectInfo.bundleName">
        <el-switch
          slot="prepend"
          :disabled="projectInfo.src === ''"
          v-model="autoOutputSuffix"></el-switch>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('License')">
      <select-license-file
        :disabled="projectInfo.buildTarget === 3"
        v-model="projectInfo.licenseFile"></select-license-file>
    </el-form-item>
    <div v-if="! isPackProject">
      <el-form-item
        :label="$t('Platforms')">
        <select-platform
          class="w-100"
          :advanced="projectInfo.advancedMode"
          v-model="projectInfo.platforms"></select-platform>
      </el-form-item>
    </div>
    <el-form-item :label="$t('Plugins')">
      <!-- <select-path-script -->
      <!--   :root-path="projectInfo.src" -->
      <!--   :only-script="true" -->
      <!--   select-pattern="*.py" -->
      <!--   :placeholder="$t('Select one or more plugin scripts" -->
      <!--   v-model="projectInfo.plugins"></select-path-script> -->
      <el-select
        multiple
        filterable
        allow-create
        default-first-option
        class="w-100"
        :placeholder="$t('Type plugin name, then press ENTER')"
        v-model="projectInfo.plugins">
        <el-option value="on"></el-option>
        <el-option value="check_ntp_time"></el-option>
        <el-option value="assert_armored"></el-option>
      </el-select>
    </el-form-item>
    <div v-if="isPackProject">
      <el-form-item
        :label="$t('Pack Options')">
        <el-input
          type="textarea"
          autosize
          class="w-100"
          :placeholder="$t('Please input any pyinstaller option')"
          v-model="packOptions">
        </el-input>
      </el-form-item>
    </div>
  </div>
</template>

<script>
import { _t } from '../plugins/gettext.js'

export default {
    name: 'ProjectInputTarget',
    props: ['projectInfo'],
    computed: {
        isPackProject() {
            return this.projectInfo.buildTarget > 0
        },
        bundlePlaceholder() {
            return this.projectInfo.buildTarget
                ? _t('Name to the bundled app (default: basename of entry script)')
                : _t('Append this name to output path for package')
        },
        autoOutputSuffix: {
            get() {
                return this.outputSuffixMode
            },
            set( value ) {
                this.outputSuffixMode = value
                this.projectInfo.bundleName = value ? this.projectInfo.src.split( '/' ).pop() : ''
            }
        },
        packOptions: {
            get() {
                return this.projectInfo.pack.join(' ')
            },
            set( value ) {
                this.projectInfo.pack = [ value ]
            }
        },
    },
    data() {
        return {
            outputSuffixMode: false,
        }
    }
}
</script>
