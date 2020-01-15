<template>
  <div class="project-target">
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
      label="Bundle Name">
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
    <el-form-item label="License">
      <select-license-file
        :disabled="projectInfo.buildTarget === 3"
        v-model="projectInfo.licenseFile"></select-license-file>
    </el-form-item>
    <div v-if="! isPackProject">
      <el-form-item
        label="Platforms">
        <select-platform
          class="w-100"
          :advanced="projectInfo.advancedMode"
          v-model="projectInfo.platforms"></select-platform>
      </el-form-item>
    </div>
    <el-form-item label="Plugins">
      <select-path-script
        :root-path="projectInfo.src"
        :only-script="true"
        select-pattern="*.py"
        v-model="projectInfo.plugins"></select-path-script>
    </el-form-item>
    <div v-if="isPackProject">
      <el-form-item
        label="Pack Options">
        <el-select
          key="pack"
          multiple
          filterable
          allow-create
          default-first-option
          class="w-100"
          placeholder="Please input any pyinstaller option"
          v-model="projectInfo.pack">
        </el-select>
      </el-form-item>
    </div>
  </div>
</template>

<script>

export default {
    name: 'ProjectInputTarget',
    props: ['projectInfo'],
    computed: {
        isPackProject() {
            return this.projectInfo.buildTarget > 0
        },
        bundlePlaceholder() {
            return this.projectInfo.buildTarget
                ? 'Name to assign to the bundled app (default: entry script’s basename)'
                : 'Append this name to output path for package'
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
    },
    data() {
        return {
            outputSuffixMode: false,
        }
    }
}
</script>
