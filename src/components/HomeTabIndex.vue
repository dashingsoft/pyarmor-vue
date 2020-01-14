<template>
  <div class="home">
    <h1 style="text-align: center">Home</h1>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="never">
          <el-button
            size="medium"
            class="btn"
            @click="openObfuscateWizard()">
            <img src="img/shield-alt.svg" class="icon"/>
            <p>Obfuscate Script Wizard</p>
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
            <p>Obfuscate With Project</p>
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
            <p>Pack Script Wizard</p>
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
            <p>Pack With Project</p>
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
            <p>Generate Expired License</p>
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
            <p>Fixed Machine License</p>
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
            <p>Full Features License</p>
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
            <p>Register PyArmor</p>
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="Register PyArmor"
      :visible.sync="dialogVisible">
      <p>Please select one regfile, for example, pyarmor-regfile-1.zip</p>
      <select-folder
        select-pattern="pyarmor-*.zip"
        :only-folder="false"
        v-model="regfile">
      </select-folder>
      <p>No this file?
        <el-link
          :underline="false"
          target="_blank"
          type="primary"
          href="https://order.shareit.com/cart/add?vendorid=200089125&PRODUCT[300871197]=1">
          Click here to purchase one</el-link>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleRegister">Register</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import connector from '../connector.js'

export default {
    name: 'HomeTabIndex',
    data() {
        return {
            regfile: '',
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
            if (this.regfile.length) {
                connector.registerProduct(this.regfile, (data) => {
                    connector.$emit('query-version', data)
                    this.dialogVisible = false
                    this.$message('Register PyArmor successfully')
                } )
            }
            else {
                this.$message('regfile is empty')
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
