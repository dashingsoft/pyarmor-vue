<template>
  <div class="project-misc">
    <el-form-item label="Restrict Mode">
      <el-select
        placeholder="Select restrict mode"
        v-model="projectInfo.restrictMode">
        <el-option
          v-for="item in restrictModes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Bootstrap Code">
      <el-select
        :disabled="isPackProject"
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
    <el-form-item label="Enable Suffix">
      <el-switch
        :disabled="isPackProject"
        active-text="Generate unique obfuscated scripts with a suffix"
        v-model="projectInfo.enableSuffix">
      </el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
    name: 'ProjectInputMisc',
    props: ['projectInfo'],
    computed: {
        isPackProject() {
            return this.projectInfo.buildTarget > 0
        },
    },
    data() {
        return {
            bootstrapModes: [
                {
                    label: 'DO NOT insert bootstrap code into entry scripts',
                    value: 0,
                },
                {
                    label: 'Insert bootstrap code into entry scripts after obfuscated',
                    value: 1,
                },
                {
                    label: 'Generate bootstrap code always without leading dot (absolute import)',
                    value: 2,
                },
                {
                    label: 'Generate bootstrap code always with leading dot (relative import)',
                    value: 3,
                },
            ],
            restrictModes: [
                {
                    label: 'Mode 0, disable all the restricts for the obfuscated scripts',
                    value: 0,
                },
                {
                    label: 'Mode 1',
                    value: 1,
                },
                {
                    label: 'Mode 2',
                    value: 2,
                },
                {
                    label: 'Mode 3',
                    value: 3,
                },
                {
                    label: 'Mode 4',
                    value: 4,
                },
            ],
        }
    }
}
</script>
