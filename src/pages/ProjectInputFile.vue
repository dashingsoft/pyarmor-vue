<template>
  <div class="project-file">
    <el-form-item
      :rules="rules.src"
      prop="src"
      label="Src">
      <select-folder
        placeholder="Base path for scripts, include and exclude"
        v-model="projectInfo.src">
      </select-folder>
    </el-form-item>
    <el-form-item label="Scripts">
      <select-path-script
        placeholder="Select one or more entry scripts"
        select-pattern="*.py"
        :only-script="true"
        :root-path="projectInfo.src"
        v-model="projectInfo.entry">
      </select-path-script>
    </el-form-item>
    <el-form-item label="Include">
      <el-select
        class="w-100"
        v-model="projectInfo.include">
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
        placeholder="Ignore the path and the .py files list here"
        :root-path="projectInfo.src"
        v-model="projectInfo.exclude">
      </select-path-script>
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
