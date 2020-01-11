<template>
  <div class="project-file">
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
    <el-form-item label="Advanced Mode">
      <el-switch
        active-text="Change the structure of code object to improve security (only for x86-64 arch)"
        v-model="projectInfo.advancedMode">
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
    },
}
</script>
