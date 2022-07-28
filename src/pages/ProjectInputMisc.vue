<template>
  <div class="project-misc">
    <el-form-item :label="$t('Restrict Mode')">
      <span slot="label">{{ $t('Restrict Mode') }}
        <el-link :underline="false"
                 target="_blank"
                 :href="$t('https://pyarmor.readthedocs.io/en/stable/mode.html#restrict-mode')">
          <i class="el-icon-question"></i></el-link>
      </span>
      <el-select
        :placeholder="$t('Select restrict mode')"
        class="w-50"
        v-model="projectInfo.restrictMode">
        <el-option
          v-for="item in restrictModes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('Bootstrap Code')">
      <el-select
        :disabled="isPackProject"
        class="w-50"
        :placeholder="$t('Select entry mode')"
        v-model="projectInfo.bootstrapCode">
        <el-option
          v-for="item in bootstrapModes"
          :key="item.label"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('Enable Suffix')">
      <el-switch
        :disabled="isPackProject"
        :active-text="$t('Generate runtime package with an unique suffix')"
        v-model="projectInfo.enableSuffix">
      </el-switch>
    </el-form-item>
    <el-form-item :label="$t('Mixin Strings')">
      <el-switch
        :active-text="$t('Mix all string values in the scripts')"
        v-model="projectInfo.mixStrings">
      </el-switch>
    </el-form-item>
  </div>
</template>

<script>
import { _t } from '../plugins/gettext.js'

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
                    label: _t('DO NOT insert bootstrap code into entry scripts'),
                    value: 0,
                },
                {
                    label: _t('Insert bootstrap code into entry scripts'),
                    value: 1,
                },
                {
                    label: _t('Generate bootstrap code without leading dot (absolute import)'),
                    value: 2,
                },
                {
                    label: _t('Generate bootstrap code with leading dot (relative import)'),
                    value: 3,
                },
            ],
            restrictModes: [
                {
                    label: _t('Mode 0: disable all the restricts for the obfuscated scripts'),
                    value: 0,
                },
                {
                    label: _t('Mode 1: the obfuscated scripts can not be changed'),
                    value: 1,
                },
                {
                    label: _t('Mode 2: mode 1 plus can not be imported by plain scripts'),
                    value: 2,
                },
                {
                    label: _t('Mode 3: mode 2 plus module attributes protection'),
                    value: 3,
                },
                {
                    label: _t('Mode 4: mode 3 but for package'),
                    value: 4,
                },
                {
                    label: _t('Mode 5: mode 4 plus frame globals protection'),
                    value: 5,
                },
                {
                    label: _t('Mode 101: mode 1 plus module dictionary protection'),
                    value: 101,
                },
                {
                    label: _t('Mode 102: mode 2 plus module dictionary protection'),
                    value: 102,
                },
                {
                    label: _t('Mode 103: mode 3 plus module dictionary protection'),
                    value: 103,
                },
                {
                    label: _t('Mode 104: mode 4 plus module dictionary protection'),
                    value: 104,
                },
                {
                    label: _t('Mode 105: mode 5 plus module dictionary protection'),
                    value: 105,
                },
            ],
        }
    }
}
</script>
