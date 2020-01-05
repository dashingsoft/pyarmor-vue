<template>
  <div class="about">
    <el-link v-on:click="$emit('change-current-page', 'ObfuscateWizardDefault')">Obfuscate Scripts</el-link>
  </div>
</template>

<script>
export default {
    name: 'HomeTabIndex'
}
</script>

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
