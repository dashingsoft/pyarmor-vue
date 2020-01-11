<template>
  <div class="home">
    <h1 style="text-align: center">Home</h1>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="hover">
          <el-button
            type="text"
            @click="openObfuscateWizard()">
            Obfuscate Script Wizard
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-button
            type="text"
            @click="openObfuscateWizard('project')">
            Obfuscate with project
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-button
            type="text"
            @click="openPackWizard()">
            Pack Script Wizard
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-button
            type="text"
            @click="openPackWizard('project')">
            Pack with project
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-button
            type="text"
            @click="openLicenseWizard('expired')">
            Generate Expired License
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-button
            type="text"
            @click="openLicenseWizard('machine')">
            Fixed Machine License
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-button
            type="text"
            @click="openLicenseWizard('all')">
            Full Features License
          </el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-button
            type="text"
            @click="registerProduct">
            Register PyArmor
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'HomeTabIndex',
    data() {
        return {
            activeName: ''
        }
    },
    methods: {
        openObfuscateWizard(name) {
            this.$emit('change-current-page', 'ObfuscatePageWizard', { feature: name } )
        },
        openPackWizard(name) {
            this.$emit('change-current-page', 'PackPageWizard', { feature: name } )
        },
        openLicenseWizard(name) {
            this.$emit('change-current-page', 'LicensePageEdit', { feature: name })
        },
        registerProduct() {
            this.$message('Register pyarmor with pyarmor-regfile-1.zip')
        },
    },
}
</script>

<style scoped>
.el-col {
    margin-bottom: 16px;
}
</style>
