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
      <el-form-item
        label="Runtime Mode">
        <el-select
          :disabled="isPackProject"
          key="runtime-mode"
          class="w-50"
          v-model="projectInfo.runtimeMode">
          <el-option
            v-for="item in runtimeModes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
            runtimeModes: [
                {
                    label: 'Do not generate runtime files',
                    value: -1,
                },
                {
                    label: 'Generate runtime files as a module "pytransform.py"',
                    value: 0,
                },
                {
                    label: 'Generate runtime files as a package "pytransform"',
                    value: 1,
                },
                {
                    label: 'Generate runtime files with unique module name "pytransform_SUFFIX.py"',
                    value: 2,
                },
                {
                    label: 'Generate runtime files with unique package name "pytransform_SUFFIX"',
                    value: 3,
                },
            ],
            restrictModes: [
                {
                    label: 'Disable restrict mode',
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
