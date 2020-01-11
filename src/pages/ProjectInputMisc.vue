<template>
  <div class="project-misc">
    <el-form-item label="Cross Protection">
      <el-switch
        active-text="Inject cross protection code into entry scripts before obfuscating"
        v-model="projectInfo.crossProtection">
      </el-switch>
    </el-form-item>
    <el-form-item label="Bootstrap Code">
      <el-select
        class="w-50"
        placeholder="Select entry mode"
        v-model="projectInfo.bootstrapCode">
        <el-option
          v-for="item in bootstrapModes"
          :key="item.label"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
            bootstrapModes: [
                {
                    label: 'Do not insert bootstrap code into entry scripts',
                    value: 0,
                },
                {
                    label: 'Insert bootstrap code into entry scripts after obfuscated',
                    value: 1,
                },
                {
                    label: 'Import the runtime package without leading dot in the bootstrap code',
                    value: 2,
                },
                {
                    label: 'Import the runtime package with leading dot in the bootstrap code',
                    value: 3,
                },
            ],
        }
    }
}
</script>
