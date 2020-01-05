<template>
  <div class="about">
    <p v-if="versionInfo.version">PyArmor {{ versionInfo.tag }} {{ versionInfo.version }}</p>
    <p v-else>PyArmor server is not running at http://localhost:9096/</p>
  </div>
</template>

<script>
export default {
    name: 'HomeTabAbout',
    props: ['connected', 'versionInfo'],
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
