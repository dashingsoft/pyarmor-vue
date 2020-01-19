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
    <el-form-item
      v-show="projectInfo.include === 'exact'"
      label="Scripts">
      <select-path-script
        placeholder="Select one or more entry scripts"
        select-pattern="*.py"
        ref="entry1"
        :multiple="true"
        :only-script="true"
        :root-path="projectInfo.src"
        v-model="projectInfo.entry">
      </select-path-script>
    </el-form-item>
    <el-form-item
      v-show="projectInfo.include !== 'exact'"
      label="Script">
      <select-path-script
        placeholder="Select one entry script"
        select-pattern="*.py"
        ref="entry2"
        :multiple="false"
        :only-script="true"
        :root-path="projectInfo.src"
        v-model="projectInfo.entry">
      </select-path-script>
    </el-form-item>
    <el-form-item label="Include">
      <el-select
        class="w-100"
        @change="onIncludeChanged"
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
                    label: 'Only the scripts list above',
                    value: 'exact',
                },
                {
                    label: 'Only the ".py" files in the src path',
                    value: 'list'
                },
                {
                    label: 'All the scripts in the src path recursively',
                    value: 'all'
                },
            ],
            rules: {
                src: { required: true }
             }
        }
    },
    methods: {
        onIncludeChanged(value) {
            if ( value === 'exact' )
                this.projectInfo.entry = this.$refs.entry1.value.map( x => x.join( '/' ) )
            else {
                let x = this.$refs.entry2.value
                this.projectInfo.entry = typeof x === 'string' ? [ x ] : x
            }
        }
    }
}
</script>
