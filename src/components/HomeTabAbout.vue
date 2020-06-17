<template>
  <div class="about">
    <h1 style="text-align: center">{{ $t('About') }}</h1>
    <p>pyarmor-vue: 0.2.3</p>
    <div v-if="versionInfo.version">
      <p>pyarmor-server: {{ versionInfo.server }}</p>
      <p>Python: {{ versionInfo.python }}</p>
      <p v-if="versionInfo.regcode.length">
        pyarmor ({{ versionInfo.regcode }}): {{ versionInfo.version }}
      </p>
      <p v-else>pyarmor ({{ versionInfo.tag }}): {{ versionInfo.version }}</p>
      <p v-if="versionInfo.reginfo.length">{{ versionInfo.reginfo }}</p>
    </div>
    <div v-else>
      <p>{{ $t('PyArmor server is not running on') }} <span>http://localhost:9096/</span>. {{ $t('Make sure the server is running, or click here to') }}
        <el-button
          type="text"
          @click="$emit('connect-server')">
          {{ $t('connect another server url') }}
        </el-button>
      </P>
    </div>
    <p>{{ $t('PyArmor is a powerful tool in the field of protecting and distributing python scripts.') }}</p>
    <p>{{ $t('The goal of PyArmor is to make Python applied to commercial application easily.') }}</p>
    <div class="footer">
      <ul>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            href="https://github.com/dashingsoft/pyarmor">{{ $t('Homepage') }}</el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            :href="$t('https://pyarmor.readthedocs.io/en/stable/')">{{ $t('Documentation') }}</el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            :href="$t('https://pyarmor.readthedocs.io/en/stable/license.html')">{{ $t('License &amp; Purchase') }}</el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            href="https://github.com/dashingsoft/pyarmor/issues">{{ $t('Report Issues') }}</el-link>
        </li>
        <li>
          <el-link
            :underline="false"
            target="_blank"
            type="primary"
            href="mailto:jondy.zhao@gmail.com">{{ $t('Concat') }}</el-link>
        </li>
      </ul>
      <p>{{ $t('Copyright @ 2008 - 2020 Dashingsoft Corp.') }}</p>
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
