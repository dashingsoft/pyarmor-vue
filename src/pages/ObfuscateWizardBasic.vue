<template>
  <el-page-header v-on:back="goBack" content="Obfuscate Scripts">
  </el-page-header>
</template>

<script>
export default {
    name: 'ObfuscateWizardDefault',
    methods: {
        goBack() {
            this.$emit('close-current-page')
            // window.history.back()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
