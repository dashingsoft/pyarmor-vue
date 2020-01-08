<template>
  <div class="project-target">
    <el-form-item label="Build Type">
        <el-radio
          v-model="projectInfo.buildTarget"
          label="obf">Obfuscate</el-radio>
        <el-radio
          v-model="projectInfo.buildTarget"
          label="pack">Pack</el-radio>
    </el-form-item>
    <el-form-item
      v-if="! isPackProject"
      label="Runtime Files">
      <el-select
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
      v-if="! isPackProject"
      label="Enable Suffix">
      <el-switch v-model="projectInfo.enableSuffix">
      </el-switch>
    </el-form-item>
    <el-form-item
      v-if="! isPackProject"
      label="Platforms">
      <el-cascader
        style="width: 100%"
        clearable
        :options="platforms"
        :props="{ label: 'value', multiple: true }"
        :show-all-levels="false"
        v-model="projectInfo.platform"
        placeholder="Please select one or more platforms"></el-cascader>
    </el-form-item>
    <el-form-item
      v-if="isPackProject"
      label="Pack Options">
      <el-input
        type="textarea"
        placeholder="Please input any pyinstaller option"
        style="width: 100%"
        :autosize="{ minRows: 6, maxRows: 10}"
        v-model="projectInfo.pack">
      </el-input>
    </el-form-item>
  </div>
</template>

<script>

export default {
    name: 'ProjectInputTarget',
    props: ['projectInfo'],
    computed: {
        isPackProject() {
            return this.projectInfo.buildTarget === 'pack'
        }
    },
    data() {
        return {
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
                    label: 'Generate runtime files as a package',
                    value: 1,
                },
                {
                    label: 'Generate runtime files, but not as a package',
                    value: 0,
                },
                {
                    label: 'Do not generate runtime files',
                    value: -1,
                },
            ],
        }
    }
}
</script>
