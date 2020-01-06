<template>
  <el-card class="box-card">
    <el-page-header
      v-on:back="goBack"
      :content="licenseInfo.id ? 'Edit License' : 'New License'">
    </el-page-header>
    <el-divider></el-divider>
    <el-form ref="form"
             v-bind:model="licenseInfo"
             v-bind:rules="rules"
             label-width="auto"
             label-position="left">
      <el-form-item
        v-if="hasFeature('name')"
        label="Name"
        prop="name">
        <el-input v-model="licenseInfo.rcode"
                  :disabled="licenseInfo.id"
                  maxlength="60"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item
        v-if="hasFeature('expired')"
        label="Expired">
        <el-date-picker
          v-model="licenseInfo.expired"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="Select expired date">
        </el-date-picker>
      </el-form-item>
      <license-input-machine
        v-if="hasFeature('machine')"
        ref="machine"
        v-bind:license-info="licenseInfo"></license-input-machine>
      <el-form-item
        v-if="hasFeature('mode')"
        label="Disable Restrict Mode">
        <el-switch
          v-model="licenseInfo.disable_restrict_mode"
          placeholder="">
        </el-switch>
      </el-form-item>
      <el-form-item
        v-if="hasFeature('extra')"
        label="Extra Data">
        <el-input v-model="licenseInfo.extra_data"
                  type="textarea"
                  maxlength="600"
                  show-word-limit
                  autosize></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit">
          {{ licenseInfo.id ? "Update" : "Create" }}
        </el-button>
        <el-button v-on:click="goBack">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import LicenseInputMachine from './LicenseInputMachine.vue'

import connector from '../connector.js'

export default {
    name: 'LicensePageEdit',
    components: {
        LicenseInputMachine,
    },
    props: {
        features: {
            type: String,
            default: ''
        },
        licenseInfo: {
            type: Object,
            default: function () {
                return {
                    summary: '',
                    rcode: '',
                    expired: '',
                    harddisk: '',
                    mac: '',
                    ipv4: '',
                    extra_data: '',
                    disable_restrict_mode: false
                }
            }
        }
    },
    data() {
        return {
            rules: {
                name: [
                    { pattern: '[-._0-9a-zA-Z]*', message: 'Invalid input', trigger: 'change' }
                ]
            }
        }
    },
    mounted: function () {
        connector.$once('new-license', this.onLicenseCreated)
        connector.$once('update-license', this.goBack)
    },
    methods: {
        hasFeature(name) {
            return this.features === '' || this.features.indexOf(name) !== -1
        },
        goBack() {
            connector.$off('new-license', this.onLicenseCreated)
            connector.$off('update-license', this.goBack)
            this.$emit('close-current-page')
        },
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (!valid)
                    return false
                
                let v = []
                if (this.licenseInfo.expired)
                    v.push(this.licenseInfo.expired)
                if (this.licenseInfo.harddisk)
                    v.push(this.licenseInfo.harddisk)
                if (this.licenseInfo.mac)
                    v.push(this.licenseInfo.mac)
                if (this.licenseInfo.ipv4)
                    v.push(this.licenseInfo.ipv4)
                if (this.licenseInfo.extra_data)
                    v.push('Extra data')
                if (this.licenseInfo.disable_restrict_mode)
                    v.push('Disable restrict mode')
                this.licenseInfo.summary = v.join(',')
                connector.newLicense(this.licenseInfo)
            })
        },
        onLicenseCreated(data) {
            this.$message('The license has been saved to ' + data.filename)
            this.goBack()
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box-card {
    width: 100%;
  }
</style>
