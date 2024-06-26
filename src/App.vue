<template>
  <div id="app">
    <el-container v-show="!currentPageName">
      <el-aside>
        <el-container>
          <img class="brand-logo" src="./assets/logo.png">
          <el-button type="text" class="brand-text" @click="onConnectServer">Pyarmor {{ currentMode }}</el-button>
          <el-badge v-bind:value="versionInfo.tag" type="warning">
          </el-badge>
        </el-container>
        <el-menu default-active="HomeTabIndex"
                 v-on:select="onSelectMenuItem">
          <el-menu-item index="HomeTabIndex">
            <i class="el-icon-s-home"></i>
            <span slot="title">{{ $t('Home') }}</span>
          </el-menu-item>
          <el-menu-item index="HomeTabProject">
            <i class="el-icon-files"></i>
            <span slot="title">{{ $t('My Projects') }}</span>
          </el-menu-item>
          <el-menu-item index="HomeTabLicense">
            <i class="el-icon-key"></i>
            <span slot="title">{{ $t('My Licenses') }}</span>
          </el-menu-item>
          <el-menu-item index="HomeTabAbout">
            <i class="el-icon-info"></i>
            <span slot="title">{{ $t('About') }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right">
          <el-dropdown v-on:command="changeLanguage">
            <span class="el-dropdown-link" style="cursor: pointer;">
             {{ lang }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="en">English</el-dropdown-item>
              <el-dropdown-item command="zh-cn">简体中文</el-dropdown-item>
              <el-dropdown-item command="jp">日本語</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main style="padding-top: 0">
          <keep-alive>
            <component
              v-on:change-current-page="onChangeCurrentPage"
              v-on:connect-server="onConnectServer"
              v-bind:version-info="versionInfo"
              v-bind:is="currentTabComponent"></component>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    <el-container v-show="currentPageName">
      <component v-on:close-current-page="onCloseCurrentPage"
                 v-on:change-current-page="onChangeCurrentPage"
                 v-bind="currentPageProps"
                 v-bind:is="currentPageComponent"></component>
    </el-container>
    <el-dialog
      :title="$t('Connect Pyarmor Server')"
      :visible.sync="dialogVisible">
      <p>{{ $t('Please type pyarmor server url:') }}</p>
      <el-input
        v-model="serverUrl">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('Cancel') }}</el-button>
        <el-button type="primary" @click="connectServer">{{ $t('Connect') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HomeTabIndex from './components/HomeTabIndex.vue'
import HomeTabProject from './components/HomeTabProject.vue'
import HomeTabLicense from './components/HomeTabLicense.vue'
import HomeTabAbout from './components/HomeTabAbout.vue'

import ProjectPageEdit from './pages/ProjectPageEdit.vue'
import LicensePageEdit from './pages/LicensePageEdit.vue'

import ObfuscatePageWizard from './pages/ObfuscatePageWizard.vue'
import PackPageWizard from './pages/PackPageWizard.vue'

import connector from './connector.js'
import { setLocale } from './plugins/gettext.js'

export default {
    name: 'app',
    components: {
        HomeTabIndex,
        HomeTabProject,
        HomeTabLicense,
        HomeTabAbout,
        ProjectPageEdit,
        LicensePageEdit,
        ObfuscatePageWizard,
        PackPageWizard,
    },
    data: function () {
        return {
            lang: 'English',
            currentTabName: 'HomeTabIndex',
            currentPageName: '',
            currentPageProps: {},
            pageStack: [],
            dialogVisible: false,
            serverUrl: connector.serverUrl,
            v8mode: true,
            versionInfo: {
                tag: 'Off',
                version: '',
                regcode: '',
                reginfo: '',
                server: '',
                python: '',
            }
        }
    },
    mounted: function () {
        this.serverUrl = `http://${document.location.host}/`

        connector.$on('connect-changed', this.onServerChanged)
        this.connectServer()

        if ( localStorage.getItem( 'language' ) === 'zh-cn' )
            this.changeLanguage( 'zh-cn' )
        else if ( localStorage.getItem( 'language' ) === 'jp' )
            this.changeLanguage( 'jp' )
    },
    computed: {
        currentMode: function () {
            return parseInt( this.versionInfo.version ) > 7 ? ( this.v8mode ? '8' : '7+' ) : '7'
        },
        currentTabComponent: function () {
            return this.currentTabName
        },
        currentPageComponent: function () {
            return this.currentPageName
        }
    },
    methods: {
        onChangeCurrentPage: function (name, props) {
            this.pageStack.push([name, props])
            this.currentPageName = name
            this.currentPageProps = props
        },
        onCloseCurrentPage: function () {
            this.pageStack.pop()
            if ( this.pageStack.length ) {
                let page = this.pageStack.slice(-1)[0]
                this.currentPageName = page[0]
                this.currentPageProps = page[1]
            }
            else {
                this.currentPageName = ''
                this.currentPageProps = {}
            }
        },
        onSelectMenuItem: function (index) {
            this.currentTabName = index
        },
        onConnectSuccess: function (data) {
            this.connected = true
            this.versionInfo.tag = data.regcode ? '' : 'Trial'
            this.versionInfo.version = data.version
            this.versionInfo.regcode = data.regcode
            this.versionInfo.reginfo = data.reginfo
            this.versionInfo.server = data.server
            this.versionInfo.python = data.python
            this.v8mode = !!data.v8mode
            this.$root.v8mode = this.v8mode
        },
        onConnectFailed: function () {
            this.connected = false
            this.versionInfo.tag = 'Off'
            this.currentTabName = 'HomeTabAbout'
        },
        onServerChanged( connected ) {
            connected
                ? connector.queryVersion( {}, this.onConnectSuccess, this.onConnectFailed )
                : this.onConnectFailed()
        },
        onConnectServer() {
            this.dialogVisible = true
            this.serverUrl = connector.serverUrl
        },
        connectServer() {
            this.dialogVisible = false
            if (this.serverUrl.slice(-1) !== '/')
                this.serverUrl += '/'
            connector.serverUrl = this.serverUrl
            connector.connectServer()
        },
        changeLanguage: function (lang) {
            this.lang = lang === 'en' ? 'English' : lang === 'jp' ? '日本語' : '简体中文'
            setLocale(lang)
            // Force update all the components
            let update = function (obj) {
                obj.$forceUpdate()
                obj.$children.forEach( child => update( child ) )
            }
            update( this )
            localStorage.setItem( 'language', lang )
        }
    },
}
</script>

<style>
.w-100 {
    width: 100%;
}
.w-50 {
    width: 50%;
}
</style>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.brand-logo {
    width: 48px;
    height: 48px;
    margin-top: 6px;
}
.brand-text {
    font-size: 32px;
}
</style>
