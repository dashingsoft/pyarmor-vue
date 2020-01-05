import Vue from 'vue'
import App from './App.vue'
import NotFound from './pages/NotFound.vue'
import SelectPathScript from './components/SelectPathScript.vue'

import './plugins/element.js'

const routes = {
    '/': App,
}

Vue.config.productionTip = false
Vue.component('select-path-script', SelectPathScript)

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
