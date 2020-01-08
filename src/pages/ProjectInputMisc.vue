<template>
  <div class="project-misc">
    <el-form-item label="Script License">
      <select-license-file
        v-model="projectInfo.licenseFile"></select-license-file>
    </el-form-item>
    <el-form-item label="Plugins">
      <select-path-script
        :root-path="projectInfo.src"
        :only-script="true"
        select-pattern="*.py"
        v-model="projectInfo.plugins"></select-path-script>
    </el-form-item>
  </div>
</template>

<script>
export default {
    name: 'ProjectInputMisc',
    props: ['projectInfo'],
}
</script>

<style scoped>
</style>
