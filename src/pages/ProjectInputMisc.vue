<template>
  <div class="project-misc">
    <el-form-item label="Cross Protection">
      <el-switch v-model="projectInfo.crossProtection">
      </el-switch>
    </el-form-item>
    <el-form-item label="Bootstrap Code">
      <el-switch v-model="projectInfo.bootstrapCode">
      </el-switch>
    </el-form-item>
    <el-form-item label="Import Runtime">
      <el-select
        style="width: 50%"
        v-model="projectInfo.entryMode"
        placeholder="Select entry mode">
        <el-option
          v-for="item in entryModes"
          :key="item.label"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
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
    data() {
        return {
            entryModes: [
                {
                    label: 'Auto decided by script name',
                    value: '',
                },
                {
                    label: 'Always absolute import',
                    value: 'absolute',
                },
                {
                    label: 'Always relative import',
                    value: 'relative',
                },
            ],
        }
    }
}
</script>
