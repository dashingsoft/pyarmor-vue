<template>
  <div class="project-file">
    <el-form-item label="Advanced Mode">
      <el-switch
        active-text="Change the structure of code object to improve security (only for x86-64 arch)"
        v-model="projectInfo.advancedMode">
      </el-switch>
    </el-form-item>
    <el-form-item label="Cross Protection">
      <el-switch
        active-text="Inject cross protection code into entry scripts before obfuscating"
        v-model="projectInfo.crossProtection">
      </el-switch>
    </el-form-item>
    <el-form-item label="Obfuscate Module">
      <el-switch
        active-text="Obfuscate the whole module object"
        v-model="projectInfo.obfMod">
      </el-switch>
    </el-form-item>
    <el-form-item label="Obfuscate Code Object">
      <el-switch
        active-text="Obfuscate each code (function) in the module"
        v-model="projectInfo.obfCode">
      </el-switch>
    </el-form-item>
    <el-form-item label="Wrap Code Object">
      <el-switch
        active-text="Obfuscate each code object again as soon as it returns"
        v-model="projectInfo.wrapMode">
      </el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
    name: 'ProjectInputFile',
    props: ['projectInfo'],
    data() {
        return {
        }
    },
}
</script>
