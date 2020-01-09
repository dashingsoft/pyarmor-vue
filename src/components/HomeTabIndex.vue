<template>
  <div class="home">
    <h1 style="text-align: center">Welcome, PyArmor</h1>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="Obfuscate Scripts" name="obfuscate">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('basic')">
                Obfuscate scripts in one folder
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('license')">
                Obfuscate with restrict license
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('package')">
                Obfuscate one package
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('platform')">
                Cross-platform obfuscating
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('security')">
                Obfuscate with high security
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('performance')">
                Obfuscate with high performance
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('runtime')">
                Generate runtime package
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
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Pack Scripts" name="pack">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openPackWizard('basic')">
                Pack all to one bundle
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openPackWizard('data')">
                Pack with data files
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openPackWizard('license')">
                Pack with restrict license
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openPackWizard('')">
                Pack with project
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Generate Licenses" name="license">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openLicenseWizard('expired')">
                Expired License
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
                @click="openLicenseWizard('extra')">
                Custom Data License
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openLicenseWizard('')">
                Full Features License
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Tools" name="tools">
        <el-row :gutter="12">
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="purchaseProduct">
                Purchase
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="registerProduct">
                Register with keyfile
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
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
            this.$emit('change-current-page', 'ObfuscateWizardPage', { features: name })
        },
        openPackWizard(name) {
            this.$emit('change-current-page', 'PackWizardPage', { features: name })
        },
        openLicenseWizard(name) {
            this.$emit('change-current-page', 'LicensePageEdit', { features: name })
        },
        purchaseProduct() {
            this.$message('Purchase')
        },
        registerProduct() {
            this.$message('Register')
        },
    },
}
</script>

<style scoped>
.el-col {
    margin-bottom: 16px;
}
</style>
