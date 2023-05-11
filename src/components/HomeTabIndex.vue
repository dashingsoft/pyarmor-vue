<template>
  <div class="home">
    <h1 style="text-align: center">{{ $t('Home') }}</h1>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="openObfuscateWizard()">
            <img src="img/shield-alt.svg" class="icon"/>
            <p>{{ $t('Obfuscate Script Wizard') }}</p>
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="openObfuscateWizard('project')">
            <img src="img/folder.svg" class="icon"/>
            <p>{{ $t('Obfuscate With Project') }}</p>
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="openPackWizard()">
            <img src="img/cog.svg" class="icon"/>
            <p>{{ $t('Pack Script Wizard') }}</p>
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="openPackWizard('project')">
            <img src="img/folder-solid.svg" class="icon"/>
            <p>{{ $t('Pack With Project') }}</p>
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="openLicenseWizard('expired')">
            <img src="img/calendar.svg" class="icon"/>
            <p>{{ $t('Generate Expired License') }}</p>
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="openLicenseWizard('machine')">
            <img src="img/tablet-alt.svg" class="icon"/>
            <p>{{ $t('Fixed Machine License') }}</p>
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="openLicenseWizard('all')">
            <img src="img/calendar-alt.svg" class="icon"/>
            <p>{{ $t('Full Features License') }}</p>
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="registerProduct">
            <img src="img/registered.svg" class="icon"/>
            <p>{{ $t('Register Pyarmor') }}</p>
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="$t('Register Pyarmor')"
      :visible.sync="dialogVisible">
      <p v-if="!$root.v8mode">{{ $t('Please type registration code or full path filename') }}</p>
      <select-folder
        v-show="false"
        select-pattern="pyarmor-*.zip"
        :only-folder="false"
        v-model="regvalue">
      </select-folder>
      <el-input
        v-show="!$root.v8mode"
        type="textarea"
        style="margin-top: 16px"
        :rows="3"
        v-model="regvalue">
      </el-input>
      <el-upload
        v-show="$root.v8mode"
        ref="upload"
        :limit="1"
        action="nothing"
        accept=".txt,.zip"
        :on-change="selectFile"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">{{ $t('Select activation file or registeration file') }}</el-button>
        <div class="el-upload__tip" slot="tip">{{ $t('Activation file pyarmor-regcode-xxxx.txt is used for initial registeration, product name is required') }}</div>
        <div class="el-upload__tip" slot="tip">{{ $t('Registration file pyarmor-regfile-xxxx.zip for subsequent registration, product name is not required') }}</div>
      </el-upload>
      <el-input
        v-show="$root.v8mode"
        style="margin-top: 16px"
        :placeholder="$t('Product name')"
        v-model="reginfo.product">
      </el-input>
      <p>{{ $t('No activation file?') }}
        <el-link
          :underline="false"
          target="_blank"
          type="primary"
          :href="$t('https://order.mycommerce.com/product?vendorid=200089125&productid=301044051')">
          {{ $t('Click here to purchase one') }}</el-link>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('Cancel') }}</el-button>
        <el-button type="primary" @click="handleRegister">{{ $t('Register') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import connector from '../connector.js'
import { _t } from '../plugins/gettext.js'

export default {
    name: 'HomeTabIndex',
    data() {
        return {
            regvalue: '',
            reginfo: {
                filename: '',
                filedata: '',
                product: '',
            },
            dialogVisible: false,
        }
    },
    methods: {
        openObfuscateWizard(name) {
            this.$emit('change-current-page',
                       name === 'project' ? 'ProjectPageEdit' : 'ObfuscatePageWizard')
        },
        openPackWizard(name) {
            if (name === 'project')
                this.$emit('change-current-page', 'ProjectPageEdit', { target: 1 } )
            else
                this.$emit('change-current-page', 'PackPageWizard')
        },
        openLicenseWizard(name) {
            this.$emit('change-current-page', 'LicensePageEdit', { feature: name })
        },
        selectFile(file) {
            const reader = new FileReader();
            this.reginfo.filename = file.name
            this.reginfo.filedata = file.raw
            reader.onload = (e) => {
                this.reginfo.filedata = e.target.result;
            };
            reader.readAsBinaryString(file.raw);
            this.$message(file.name + file.raw)
        },
        removeFile() {
            this.reginfo.filename = ''
            this.reginfo.filedata = ''
        },
        registerProduct() {
            this.dialogVisible = true
        },
        handleRegister() {
            if (this.$root.v8mode) {
                connector.registerProduct(this.reginfo, (data) => {
                    this.dialogVisible = false
                    if (data === 'OK') {
                        this.$message( _t('Register Pyarmor successfully') )
                    }
                    else {
                        this.$confirm( _t('Initial registration is successful, the registration file %1 has been generated, please use this file for subsequent registration', data) )
                    }
                } )
            }
            else {
                connector.registerProduct(this.regvalue, (data) => {
                    connector.$emit('query-version', data)
                    this.dialogVisible = false
                    this.$message(_t('Register Pyarmor successfully'))
                } )
            }
        }
    },
}
</script>

<style scoped>
.el-col {
    margin-bottom: 32px;
    text-align: center;
}
.el-card {
    border: 0;
}
.btn {
    border: 0;
    padding: 32px;
}
.icon {
    width: 32px;
}
</style>
