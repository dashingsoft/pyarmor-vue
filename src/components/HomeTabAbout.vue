<template>
  <div class="about">
    <h1 style="text-align: center">About</h1>
    <p>pyarmor-vue : 0.1.0</p>
    <div v-if="versionInfo.version">
      <p>pyarmor-server: {{ versionInfo.server }}</p>
      <p>Python: {{ versionInfo.python }}</p>
      <p>pyarmor ({{ versionInfo.tag }}): {{ versionInfo.version }}</p>
      <p v-if="versionInfo.regcode.length">Registeration code: {{ versionInfo.regcode }}</p>
      <p v-if="versionInfo.reginfo.length">{{ versionInfo.reginfo }}</p>
    </div>
    <div v-else>
      <p>PyArmor server is not running at http://localhost:9096/</p>
    </div>
    <p>PyArmor is a powerful tool in the field of protecting and distributing python scripts.</p>
    <p>The goal of PyArmor is to make Python applied to commercial application easily.</p>
    <div class="footer">
      <ul>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            href="https://github.com/dashingsoft/pyarmor">Homepage</el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            href="https://pyarmor.readthedocs.io/en/latest/">Documentation</el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            href="https://pyarmor.readthedocs.io/en/latest/license.html">License &amp; Purchase</el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            href="https://github.com/dashingsoft/pyarmor/issues">Report Issues</el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            href="mailto:jondy.zhao@gmail.com">Concat</el-link>
        </li>
      </ul>
      <p>Copyright @ 2008 - 2020 Dashingsoft Corp.</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HomeTabAbout',
    props: ['versionInfo'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style-type: none;
}
li {
    display: inline-block;
    margin: 16px;
}
.footer {
    margin-top: 48px;
    border-top: 1px solid lightgray;
    text-align: center;
    font-size: 80%;
}
</style>
