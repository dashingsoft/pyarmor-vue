<template>
  <div class="project-file">
    <el-form-item
      :rules="rules.src"
      prop="src"
      label="Src">
      <select-folder
        placeholder="Base path to find .py files"
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
        placeholder="Select path and scripts to exclude"
        :root-path="projectInfo.src"
        v-model="projectInfo.exclude">
      </select-path-script>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item
      label="Output">
      <select-folder
        placeholder="The default output path is $src/dist"
        :root-path="projectInfo.src"
        :allow-create="true"
        v-model="projectInfo.output">
      </select-folder>
    </el-form-item>
    <el-form-item
      label="Bundle Name">
      <el-input
        :disabled="projectInfo.src === ''"
        :readonly="autoOutputSuffix"
        placeholder="Append this name to output path"
        v-model="projectInfo.bundleName">
        <el-switch
          slot="prepend"
          :disabled="projectInfo.src === ''"
          v-model="autoOutputSuffix"></el-switch>
      </el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
    name: 'ProjectInputFile',
    props: ['projectInfo'],
    computed: {
        autoOutputSuffix: {
            get() {
                return this.outputSuffixMode
            },
            set( value ) {
                this.outputSuffixMode = value
                this.projectInfo.bundleName = value ? this.projectInfo.src.split( '/' ).pop() : ''
            }
        }
    },
    data() {
        return {
            outputSuffixMode: false,
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
