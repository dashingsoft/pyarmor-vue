<template>
  <div class="el-input-group el-input-group--prepend">
    <div class="el-input-group__prepend">
      <el-select
        :disabled="advanced || $root.v8mode"
        style="width: 160px"
        v-model="level">
        <el-option
          :label="$t('High Security')"
          :value="0"></el-option>
        <el-option
          :label="$t('High Speed')"
          :value="1"></el-option>
      </el-select>
    </div>
    <el-cascader
      v-show="!$root.v8mode"
      class="w-100"
      clearable
      :disabled="disabled"
      :multiple="multiple"
      :options="platforms[level]"
      :props="{ label: 'value', multiple: true }"
      :show-all-levels="false"
      @change="onValueChanged"
      :placeholder="$t('Cross platform, select one or more platforms to run obfuscated scripts')"
      v-model="value"></el-cascader>
    <el-cascader
      v-show="$root.v8mode"
      class="w-100"
      clearable
      :disabled="disabled"
      :multiple="multiple"
      :options="platforms8[level]"
      :props="{ label: 'value', multiple: true }"
      :show-all-levels="false"
      @change="onValueChanged"
      :placeholder="$t('Cross platform, select one or more platforms to run obfuscated scripts')"
      v-model="value"></el-cascader>
  </div>
</template>

<script>
import { _t } from '../plugins/gettext.js'

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
        advanced: Boolean,
    },
    data() {
        return {
            level: ( this.value2.length && this.value2[0][1].slice(-2) === '.0' ) ? 1 : 0,
            value: this.value2,
            platforms: [
                [ { value: _t( 'Common' ), children: [
                    { value: 'windows.x86_64.7' },
                    { value: 'linux.x86_64.7' },
                    { value: 'darwin.x86_64.7' },
                    { value: 'windows.x86.7' },
                    { value: 'linux.x86.7' },
                ] },
                  { value: 'arm', children: [
                      { value: 'darwin.aarch64.3' },
                      { value: 'linux.armv7.3' },
                      { value: 'linux.aarch32.3' },
                      { value: 'linux.aarch64.3' },
                  ] },
                  { value: _t( 'Others' ), children: [
                      { value: 'centos6.x86_64.7' },
                  ] },
                  { value: _t( 'VM Protection' ), children: [
                      { value: 'windows.x86_64.25' },
                      { value: 'windows.x86.25' },
                  ] }
                ],
                [ { value: _t( 'Common' ), children: [
                    { value: 'windows.x86_64.0' },
                    { value: 'linux.x86_64.0' },
                    { value: 'darwin.x86_64.0' },
                    { value: 'windows.x86.0' },
                    { value: 'linux.x86.0' },
                ] },
                  { value: 'arm', children: [
                      { value: 'musl.arm.0' },
                      { value: 'linux.arm.0' },
                      { value: 'linux.armv6.0' },
                      { value: 'linux.armv7.0' },
                      { value: 'linux.aarch32.0' },
                      { value: 'linux.aarch64.0' },
                      { value: 'darwin.arm64.0' },
                      { value: 'uclibc.armv7.0' },
                      { value: 'android.aarch64.0' },
                      { value: 'android.armv7.0' },
                  ] },
                  { value: _t( 'Others' ), children: [
                      { value: 'vs2015.x86_64.0' },
                      { value: 'vs2015.x86.0' },
                      { value: 'musl.x86_64.0' },
                      { value: 'android.x86_64.0' },
                      { value: 'android.x86.0' },
                      { value: 'linux.ppc64.0' },
                      { value: 'freebsd.x86_64.0' },
                      { value: 'poky.x86.0' },
                      { value: 'musl.mips32.0' },
                      { value: 'linux.mips64.0' },
                      { value: 'linux.mips64el.0' },
                  ] }
                ]
            ],
            platforms8: [
                [ { value: _t( 'Common' ), children: [
                    { value: 'windows.x86_64' },
                    { value: 'linux.x86_64' },
                    { value: 'darwin.x86_64' },
                    { value: 'windows.x86' },
                    { value: 'linux.x86' },
                ] },
                  { value: 'arm', children: [
                      { value: 'darwin.aarch64' },
                      { value: 'linux.armv7' },
                      { value: 'linux.aarch64' },
                  ] },
                  { value: _t( 'Themida Protection' ), children: [
                      { value: 'windows.x86_64' },
                      { value: 'windows.x86' },
                  ] }
                ]
            ]
        }
    },
    methods: {
        onValueChanged( value ) {
            this.$emit( 'change2', value )
        }
    },
    mounted() {
        this.$watch( 'advanced', ( value ) => {
            if ( value && this.level === 1 ) {
                this.level = 0
                this.value = []
            }
        } )
    }
}
</script>
