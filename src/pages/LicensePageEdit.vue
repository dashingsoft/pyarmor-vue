<template>
  <el-card class="box-card">
    <el-page-header
      v-on:back="goBack"
      :content="licenseInfo.id ? 'Edit License' : 'New License'">
    </el-page-header>
    <el-divider></el-divider>
    <el-form
      ref="form"
      v-bind:model="licenseInfo"
      v-bind:rules="rules"
      label-width="auto"
      label-position="left">
      <el-form-item
        v-if="hasFeature('name')"
        label="Name"
        prop="name">
        <el-input
          :disabled="licenseInfo.id"
          maxlength="60"
          show-word-limit
          placeholder="Leave it blank to set default name like 'reg-xxxxxx'"
          v-model="licenseInfo.rcode"></el-input>
      </el-form-item>
      <el-form-item
        v-if="hasFeature('expired')"
        label="Expired">
        <el-date-picker
          class="w-50"
          v-model="licenseInfo.expired"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="Set the expired date of the obfuscated scripts">
        </el-date-picker>
      </el-form-item>
      <license-input-machine
        v-if="hasFeature('machine')"
        ref="machine"
        v-bind:license-info="licenseInfo"></license-input-machine>
      <el-form-item
        v-if="0"
        label="Disable Restrict Mode">
        <el-switch
          v-model="licenseInfo.disableRestrictMode">
        </el-switch>
      </el-form-item>
      <el-form-item
        v-if="hasFeature('extra')"
        label="Extra Data">
        <el-input
          placeholder="Any ascii string data to store in the license file"
          type="textarea"
          maxlength="600"
          show-word-limit
          autosize
          v-model="licenseInfo.extraData"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          v-on:click="onSubmit">
          {{ licenseInfo.id ? "Update" : "Create" }}
        </el-button>
        <el-button v-on:click="goBack">Cancel</el-button>
        <el-button v-on:click="resetForm">Reset</el-button>
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
        feature: {
            type: String,
            default: 'all'
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
                    extraData: '',
                    disableRestrictMode: false
                }
            }
        }
    },
    data() {
        return {
            rules: {
                name: { pattern: '[-._0-9a-zA-Z]*', message: 'Invalid input', trigger: 'change' }
            }
        }
    },
    methods: {
        hasFeature(name) {
            return this.feature === 'all' || this.feature.indexOf(name) !== -1
        },
        goBack() {
            this.$emit('close-current-page')
        },
        resetForm() {
            this.$message(JSON.stringify(this.licenseInfo))
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
                if (this.licenseInfo.extraData)
                    v.push('Extra data')
                if (this.licenseInfo.disableRestrictMode)
                    v.push('Disable restrict mode')
                this.licenseInfo.summary = v.join(',')

                this.licenseInfo.id
                    ? connector.updateLicense(this.licenseInfo, this.onLicenseCreated)
                    : connector.newLicense(this.licenseInfo, this.onLicenseCreated)
            })
        },
        onLicenseCreated(data) {
            this.$message('The license has been saved to ' + data.filename)
            this.goBack()
        },
    }
}
</script>

<style scoped>
.box-card {
    width: 100%;
}
</style>
