import Vue from 'vue'
import App from './App.vue'
import NotFound from './pages/NotFound.vue'
import SelectFolder from './components/SelectFolder.vue'
import SelectPathScript from './components/SelectPathScript.vue'
import SelectLicenseFile from './components/SelectLicenseFile.vue'

import './plugins/element.js'

const routes = {
    '/': App,
}

Vue.config.productionTip = false
Vue.component('select-folder', SelectFolder)
Vue.component('select-path-script', SelectPathScript)
Vue.component('select-license-file', SelectLicenseFile)

new Vue({
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent () {
            return routes[this.currentRoute] || NotFound
        }
    },
    render (h) { return h(this.ViewComponent) }
}).$mount('#app')
