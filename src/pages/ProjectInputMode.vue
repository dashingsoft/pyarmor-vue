<template>
  <div class="project-file">
    <el-form-item :label="$t('Advanced Mode')">
      <el-switch
        :active-text="$t('Change code object structure to improve security (only for x86/64 arch)')"
        v-model="projectInfo.advancedMode">
      </el-switch>
    </el-form-item>
    <el-form-item :label="$t('Cross Protection')">
      <el-switch
        :active-text="$t('Inject cross protection code into entry scripts before obfuscating')"
        v-model="projectInfo.crossProtection">
      </el-switch>
    </el-form-item>
    <el-form-item :label="$t('Obfuscate Module')">
      <el-switch
        :active-text="$t('Obfuscate the whole module')"
        v-model="projectInfo.obfMod">
      </el-switch>
    </el-form-item>
    <el-form-item :label="$t('Obfuscate Code Object')">
      <el-switch
        :active-text="$t('Obfuscate each function (code object) in the module')"
        v-model="projectInfo.obfCode">
      </el-switch>
    </el-form-item>
    <el-form-item :label="$t('Wrap Code Object')">
      <el-switch
        :active-text="$t('Obfuscate each function (code object) in runtime')"
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
