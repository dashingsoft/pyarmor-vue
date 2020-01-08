<template>
  <div class="project-file">
    <el-form-item
      :rules="rules.src"
      prop="src"
      label="Src">
      <select-folder
        placeholder="Select base path to find .py files"
        v-model="projectInfo.src">
      </select-folder>
    </el-form-item>
    <el-form-item label="Scripts">
      <select-path-script
        placeholder="Select entry scripts"
        select-pattern="*.py"
        :only-script="true"
        :root-path="projectInfo.src"
        v-model="projectInfo.entry">
      </select-path-script>
    </el-form-item>
    <el-form-item label="Include">
      <el-select
        style="width: 100%"
        v-model="projectInfo.include"
        placeholder="Select include mode">
        <el-option
          v-for="item in includeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Exclude">
      <select-path-script
        placeholder="Select path and scripts to exclude"
        :root-path="projectInfo.src"
        v-model="projectInfo.exclude">
      </select-path-script>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item
      label="Output">
      <select-folder
        placeholder="Select path to save obfuscated files or bundle file"
        :root-path="projectInfo.src"
        :allow-create="true"
        v-model="projectInfo.output">
      </select-folder>
    </el-form-item>
  </div>
</template>

<script>
export default {
    name: 'ProjectInputFile',
    props: ['projectInfo'],
    data() {
        return {
            includeOptions: [
                {
                    label: 'Only the scripts in the list',
                    value: 'exact',
                },
                {
                    label: 'All the scripts in the src path',
                    value: 'normal'
                },
                {
                    label: 'Recursively the scripts in the src path',
                    value: 'recursive'
                },
            ],
            rules: {
                src: [
                    { required: true }
                ]
            }
        }
    }
}
</script>
