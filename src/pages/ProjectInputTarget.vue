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
        :placeholder="projectInfo.buildTarget ? 'Name to assign to the bundled app' : 'Append this name to output path'"
        v-model="projectInfo.bundleName">
        <el-switch
          slot="prepend"
          :disabled="projectInfo.src === ''"
          v-model="autoOutputSuffix"></el-switch>
      </el-input>
    </el-form-item>
    <el-form-item label="License">
      <select-license-file
        v-model="projectInfo.licenseFile"></select-license-file>
    </el-form-item>
    <div v-if="! isPackProject">
      <el-form-item
        label="Package Runtime">
        <el-select
          key="package-runtime"
          style="width: 50%"
          v-model="projectInfo.packageRuntime">
          <el-option
            v-for="item in runtimeModes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Platforms">
        <el-cascader
          class="w-100"
          clearable
          :options="platforms"
          :props="{ label: 'value', multiple: true }"
          :show-all-levels="false"
          placeholder="Cross platform, select one or more platforms to run obfuscated scripts"
          v-model="projectInfo.platform"></el-cascader>
      </el-form-item>
    </div>
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
        autoOutputSuffix: {
            get() {
                return this.outputSuffixMode
            },
            set( value ) {
                this.outputSuffixMode = value
                this.projectInfo.bundleName = value ? this.projectInfo.src.split( '/' ).pop() : ''
            }
        },
        oneFileBundle: {
            get() {
                return this.projectInfo.pack.indexOf('--onefile') === -1 ? 'folder' : 'file'
            },
            set( value ) {
                let i = this.projectInfo.pack.indexOf( '--onefile' )
                value === 'file'
                    ? this.projectInfo.pack.push('--onefile')
                    : this.projectInfo.pack.splice( i, 1 )
            }
        }
    },
    data() {
        return {
            outputSuffixMode: false,
            platforms: [
                { value: 'More security', children: [
                    { value: 'Common', children: [
                        { value: 'windows.x86_64.7' },
                        { value: 'linux.x86_64.7' },
                        { value: 'darwin.x86_64.7' },
                        { value: 'windows.x86.7' },
                        { value: 'linux.x86.7' },
                    ] },
                    { value: 'arm', children: [
                        { value: 'linux.armv7.3' },
                        { value: 'linux.aarch32.3' },
                        { value: 'linux.aarch64.3' },
                    ] },
                    { value: 'others', children: [
                        { value: 'centos6.x86_64.7' },
                    ] }
                ] },
                { value: 'More quickly', children: [
                    { value: 'Common', children: [
                        { value: 'windows.x86_64.0' },
                        { value: 'linux.x86_64.0' },
                        { value: 'darwin.x86_64.0' },
                        { value: 'windows.x86.0' },
                        { value: 'linux.x86.0' },
                    ] },
                    { value: 'arm', children: [
                        { value: 'alpine.arm.0' },
                        { value: 'linux.arm.0' },
                        { value: 'linux.armv7.0' },
                        { value: 'linux.aarch32.0' },
                        { value: 'linux.aarch64.0' },
                        { value: 'darwin.arm64.0' },
                    ] },
                    { value: 'others', children: [
                        { value: 'vs2015.x86_64.0' },
                        { value: 'vs2015.x86.0' },
                        { value: 'alpine.x86_64.0' },
                        { value: 'android.aarch64.0' },
                        { value: 'linux.ppc64.0' },
                        { value: 'freebsd.x86_64.0' },
                        { value: 'poky.x86.0' },
                    ] }
                ] }
            ],
            runtimeModes: [
                {
                    label: 'Do not generate runtime files',
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
                {
                    label: 'Generate runtime files with unique module name "pytransform_SUFFIX.py"',
                    value: 2,
                },
                {
                    label: 'Generate runtime files with unique package name "pytransform_SUFFIX"',
                    value: 3,
                },
            ],
        }
    }
}
</script>
