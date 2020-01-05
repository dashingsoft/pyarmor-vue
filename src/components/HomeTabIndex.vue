<template>
  <div class="home">
    <h1 style="text-align: center">Welcome, PyArmor</h1>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="Obfuscate Scripts" name="obfuscate">
        <el-container>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-card shadow="hover">
                <el-link
                  v-on:click="$emit('change-current-page', 'ObfuscateWizardDefault')">
                  Obfuscate Scripts in one folder
                </el-link>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Obfuscate Scripts with restrict license
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Obfuscate packages
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Obfuscate scripts for other platform
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Obfuscate scripts for multiple platforms
              </el-card>
            </el-col>
          </el-row>
        </el-container>
      </el-collapse-item>
      <el-collapse-item title="Pack Scripts" name="pack">
        <el-container>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-card shadow="hover">
                Pack to one folder
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Pack to one file
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Pack with restrict license
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Pack one file with license outside
              </el-card>
            </el-col>
          </el-row>
        </el-container>
      </el-collapse-item>
      <el-collapse-item title="Generate Licenses" name="license">
        <el-container>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-card shadow="hover">
                Expired License
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Fixed Machine License
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Disable Restrict Mode License
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                Full Features License
              </el-card>
            </el-col>
          </el-row>
        </el-container>
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
      };
    },
}
</script>

<style scoped>
</style>
