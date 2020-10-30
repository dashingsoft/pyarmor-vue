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
            <p>{{ $t('Register PyArmor') }}</p>
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="$t('Register PyArmor')"
      :visible.sync="dialogVisible">
      <el-radio v-model="regtype" label="keycode">By code</el-radio>
      <el-radio v-model="regtype" label="keyfile">By file</el-radio>
      <p v-show="regtype == 'keyfile'">{{ $t('Please click Register if there is pyarmor-regfile-1.zip in current path. Or select one from other path at first') }}</p>
      <select-folder
        v-show="regtype == 'keyfile'"
        select-pattern="pyarmor-*.zip"
        :only-folder="false"
        v-model="regvalue">
      </select-folder>
      <el-input
        v-show="regtype == 'keycode'"
        type="textarea"
        style="margin-top: 16px"
        :rows="3"
        :placeholder="$t('Please copy registration code here')"
        v-model="regvalue">
      </el-input>
      <p>{{ $t('No registration code or file?') }}
        <el-link
          :underline="false"
          target="_blank"
          type="primary"
          :href="$t('https://order.shareit.com/cart/add?vendorid=200089125&PRODUCT[300871197]=1')">
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
regtype: 'keycode',
regvalue: '',
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
        registerProduct() {
            this.dialogVisible = true
        },
        handleRegister() {
            connector.registerProduct(this.regvalue, (data) => {
                connector.$emit('query-version', data)
                this.dialogVisible = false
                this.$message(_t('Register PyArmor successfully'))
            } )
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
