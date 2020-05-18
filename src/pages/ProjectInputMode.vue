<template>
  <div class="project-file">
    <el-form-item :label="$t('Advanced Mode')">
      <el-select
        :placeholder="$t('Disable or select advanced mode')"
        class="w-50"
        v-model="projectInfo.advancedMode">
        <el-option
          v-for="item in advancedModes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
import { _t } from '../plugins/gettext.js'
export default {
    name: 'ProjectInputFile',
    props: ['projectInfo'],
    data() {
        return {
            advancedModes: [
                {
                    label: _t('Disable advanced mode'),
                    value: 0,
                },
                {
                    label: _t('Enable advanced mode (only for x86/64 arch)'),
                    value: 1,
                },
                {
                    label: _t('Enable super mode (only for Python 27, 37, 38)'),
                    value: 2,
                }
            ]
        }
    },
}
</script>
