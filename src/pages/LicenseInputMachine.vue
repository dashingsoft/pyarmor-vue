<template>
  <div>
    <el-form-item
      label="Harddisk">
      <el-input
        :placeholder="$t('Bind obfuscated scripts to this serial number of harddisk')"
        v-model="licenseInfo.harddisk"></el-input>
    </el-form-item>
    <el-form-item
      prop="ipv4"
      label="IPv4">
      <el-input
        :placeholder="$t('Bind obfuscated scripts to this IPv4 address')"
        v-model="licenseInfo.ipv4"></el-input>
    </el-form-item>
    <el-form-item
      prop="mac"
      label="Mac">
      <el-input
        :placeholder="$t('Bind obfuscated scripts to this MAC address')"
        v-model="licenseInfo.mac"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
    name: 'LicenseInputMachine',
    props: ['licenseInfo'],
}
</script>
