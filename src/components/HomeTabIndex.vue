<template>
  <div class="home">
    <h1 style="text-align: center">Home</h1>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="Obfuscate Scripts" name="obfuscate">
        <h3 slot="title" class="item-header">
          <i :class="activeName == 'obfuscate' ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
          <span>Obfuscate Scripts</span>
        </h3>
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('common')">
                Obfuscate Script Wizard
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('project')">
                Obfuscate with project
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openObfuscateWizard('runtime')">
                Generate runtime package
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Pack Scripts" name="pack">
        <h3 slot="title" class="item-header">
          <i :class="activeName == 'pack' ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
          <span>Pack Scripts</span>
        </h3>
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openPackWizard('basic')">
                Pack Script Wizard
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openPackWizard('nolicense')">
                Pack without license
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openPackWizard('project')">
                Pack with project
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Generate Licenses" name="license">
        <h3 slot="title" class="item-header">
          <i :class="activeName == 'license' ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
          <span>Generate Licenses</span>
        </h3>
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openLicenseWizard('expired')">
                Expired License
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openLicenseWizard('machine')">
                Fixed Machine License
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <el-button
                type="text"
                @click="openLicenseWizard('all')">
                Full Features License
              </el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Tools" name="tools">
        <h3 slot="title" class="item-header">
          <i :class="activeName == 'tools' ? 'el-icon-folder-opened' : 'el-icon-folder'"></i>
          <span>Tools</span>
        </h3>
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
            this.$emit('change-current-page', 'ObfuscateWizardBasic', { wizardName: name })
        },
        openPackWizard(name) {
            this.$emit('change-current-page', 'PackPageWizard', { wizardName: name })
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
.item-header {
    width: 100%;
}
.item-header span {
    margin-left: 16px;
}
</style>
