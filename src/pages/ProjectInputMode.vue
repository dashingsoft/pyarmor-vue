<template>
  <div class="project-file">
    <el-form-item v-show="!$root.v8mode" :label="$t('Advanced Mode')">
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
    <el-form-item v-show="!$root.v8mode" :label="$t('Cross Protection')">
      <el-switch
        :active-text="$t('Inject cross protection code into entry scripts before obfuscating')"
        v-model="projectInfo.crossProtection">
      </el-switch>
    </el-form-item>
    <el-form-item v-show="$root.v8mode" :label="$t('Enable BCC Mode')">
      <el-switch
        :active-text="$t('Convert some Python functions to C functions')"
        v-model="projectInfo.bccMode">
      </el-switch>
    </el-form-item>
    <el-form-item v-show="$root.v8mode" :label="$t('Enable RFT Mode')">
      <el-switch
        :active-text="$t('Rename class/function/variable names')"
        v-model="projectInfo.rftMode">
      </el-switch>
    </el-form-item>
    <el-form-item :label="$t('Obfuscate Module')">
      <el-switch
        :active-text="$t('Obfuscate the whole module')"
        v-model="projectInfo.obfMod">
      </el-switch>
    </el-form-item>
    <el-form-item :label="$t('Obfuscate Code Object')">
      <el-select
        class="w-50"
        v-model="projectInfo.obfCode">
        <el-option
          v-for="item in obfCodeModes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
                    label: _t('Enable super mode (only for Python 27, 37, 38, 39)'),
                    value: 2,
                },
                {
                    label: _t('Enable advanced mode plus vm protection (only for Windows)'),
                    value: 3,
                },
                {
                    label: _t('Enable super mode plus vm protection (only for Python 27, 37, 38, 39 in Windows)'),
                    value: 4,
                },
                {
                    label: _t('Enable super plus mode (only for Python 37, 38, 39 and x86_64)'),
                    value: 5,
                }
            ],
            obfCodeModes: [
                {
                    label: _t('Do not obfuscate functions'),
                    value: 0,
                },
                {
                    label: _t('Obfuscate each function with quick algorithm'),
                    value: 1,
                },
                {
                    label: _t('Obfuscate each function with complex algorithm'),
                    value: 2,
                }
            ]

        }
    },
}
</script>
