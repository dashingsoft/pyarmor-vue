<template>
  <div class="el-input-group el-input-group--prepend">
    <div class="el-input-group__prepend">
      <el-select
        style="width: 160px"
        v-model="level">
        <el-option
          label="High Security"
          :value="0"></el-option>
        <el-option
          label="High Speed"
          :value="1"></el-option>
      </el-select>
    </div>
    <el-cascader
      class="w-100"
      clearable
      :disabled="disabled"
      :multiple="multiple"
      :options="platforms[level]"
      :props="{ label: 'value', multiple: true }"
      :show-all-levels="false"
      @change="onValueChanged"
      placeholder="Cross platform, select one or more platforms to run obfuscated scripts"
      v-model="value"></el-cascader>
  </div>
</template>

<script>
export default {
    name: 'SelectPlatform',
    model: {
        prop: 'value2',
        event: 'change2',
    },
    props: {
        value2: Array,
        disabled: Boolean,
        multiple: Boolean,
    },
    data() {
        return {
            level: 0,
            value: [],
            platforms: [
                [ { value: 'Common', children: [
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
                ],
                [ { value: 'Common', children: [
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
                ]
            ]
        }
    },
    mounted() {
        this.value = this.value2
    },
    methods: {
        onValueChanged( value ) {
            this.$emit( 'change2', value )
        },
    }
}
</script>
