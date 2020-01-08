<template>
  <div>
    <el-form-item
      :rules="rules.harddisk"
      label="Harddisk">
      <el-input v-model="licenseInfo.harddisk"></el-input>
    </el-form-item>
    <el-form-item
      prop="ipv4"
      label="IPv4">
      <el-input v-model="licenseInfo.ipv4"></el-input>
    </el-form-item>
    <el-form-item
      prop="mac"
      label="Mac">
      <el-input v-model="licenseInfo.mac"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
    name: 'LicenseInputMachine',
    props: ['licenseInfo'],
    data() {
        return {
            rules: {
                harddisk: [
                    { required: false, message: 'Please type serial number', trigger: 'blur' },
                ]
            }
        }
    }
}
</script>
