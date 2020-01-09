<template>
  <div class="wizard-page">
   <el-card class="box-card">
    <el-page-header
      v-on:back="goBack"
      content="Pack Scripts">
    </el-page-header>
    <el-divider></el-divider>
   </el-card>   
  </div>
</template>

<script>
export default {
    name: 'PackWizardBasic',
    methods: {
        hasFeature(name) {
            return this.features === '' || this.features.indexOf(name) !== -1
        },
        goBack() {
            this.$emit('close-current-page')
        },
    }
}
</script>

<style>
.wizard-page {
  width: 100%;
}
</style>
