import Vue from 'vue'
import reqwest from './reqwest.js'

var favorPath = []

const send_request = function (url, data, success, error) {
    let paras = {
        url: url,
        method: 'post',
        type: 'json',
        crossOrigin: true,
        success: success,
        error: error
    };

    if (typeof data !== 'undefined')
        paras.data = JSON.stringify( data );

    reqwest( paras );
}

export default new Vue({
    data() {
        return {
            connected: false,
            serverUrl: Vue.$isServer ? '/' : 'http://localhost:9096/'
        }
    },
    methods: {
        sendRequest: function (url, data, event, success, error) {
            let onerror = function (err) {
                if (typeof error === 'function')
                    error(err)
                else
                    Vue.prototype.$message({
                        type: 'error',
                        message: typeof error === 'string' ? error :
                            typeof err === 'string' ? err : JSON.stringify(err),
                        showClose: true
                    })
                this.$emit(event + '-fail')
            }
            let onsuccess = function (resp) {
                if (resp.err === 0) {
                    this.$emit(event, resp.data)
                    if (typeof success === 'function')
                        success(resp.data)
                }
                else
                    onerror.call(this, resp.data)
            }
            send_request(url, data, onsuccess.bind(this), onerror.bind(this))
        },
        loadRequest: function (url, data, event, success, text) {
            const loading = this.$loading( {
                      lock: true,
                      text: text,
                      spinner: 'el-icon-loading',
                      background: 'rgba(0, 0, 0, 0.7)'
                  } )
            let onerror = function (err) {
                loading.close()
                Vue.prototype.$message({
                    type: 'error',
                    message: typeof err === 'string' ? err : JSON.stringify(err),
                    showClose: true
                })
                this.$emit(event + '-fail')
            }
            let onsuccess = function (resp) {
                if (resp.err === 0) {
                    loading.close()
                    this.$emit(event, resp.data)
                    if (typeof success === 'function')
                        success(resp.data)
                }
                else
                    onerror.call(this, resp.data)
            }
            send_request(url, data, onsuccess.bind(this), onerror.bind(this))
        },
        connectServer() {
            send_request(
                this.serverUrl + 'directory/list',
                { path: '@' },
                resp => {
                    if (resp.err === 0) {
                        favorPath = resp.data.dirs
                        this.connected = true
                        this.$emit('connect-changed', this.connected)
                    }
                },
                () => {
                    favorPath = []
                    this.connected = false
                    this.$emit('connect-changed', this.connected)
                }
            )
        },
        queryVersion: function (data, success, error) {
            let url = this.serverUrl + 'version'
            this.sendRequest(url, data, 'query-version', success, error)
        },
        registerProduct: function (data, success, error) {
            let url = this.serverUrl + 'register'
            this.sendRequest(url, data, 'register-product', success, error)
        },
        listDirectory: function (data, success, error) {
            let url = this.serverUrl + 'directory/list'
            this.sendRequest(url, data, 'list-directory', success, error)
        },
        newDirectory: function (data, success, error) {
            let url = this.serverUrl + 'directory/new'
            this.sendRequest(url, data, 'new-directory', success, error)
        },
        removeDirectory: function (data, success, error) {
            let url = this.serverUrl + 'directory/remove'
            this.sendRequest(url, data, 'remove-directory', success, error)
        },
        newProject: function (data, success, error) {
            let url = this.serverUrl + 'project/new'
            this.sendRequest(url, data, 'new-project', success, error)
        },
        updateProject: function (data, success, error) {
            let url = this.serverUrl + 'project/update'
            this.sendRequest(url, data, 'update-project', success, error)
        },
        buildProject: function (data, success, text) {
            let url = this.serverUrl + 'project/build'
            this.loadRequest(url, data, 'build-project', success, text)
        },
        removeProject: function (data, success, error) {
            let url = this.serverUrl + 'project/remove'
            this.sendRequest(url, data, 'remove-project', success, error)
        },
        listProject: function (data, success, error) {
            let url = this.serverUrl + 'project/list'
            this.sendRequest(url, data, 'list-project', success, error)
        },
        newLicense: function (data, success, error) {
            let url = this.serverUrl + 'license/new'
            this.sendRequest(url, data, 'new-license', success, error)
        },
        updateLicense: function (data, success, error) {
            let url = this.serverUrl + 'license/update'
            this.sendRequest(url, data, 'update-license', success, error)
        },
        removeLicense: function (data, success, error) {
            let url = this.serverUrl + 'license/remove'
            this.sendRequest(url, data, 'remove-license', success, error)
        },
        listLicense: function (data, success, error) {
            let url = this.serverUrl + 'license/list'
            this.sendRequest(url, data, 'list-license', success, error)
        },
        getFavorPath( path ) {
            if ((typeof path === 'undefined') || (favorPath.indexOf( path ) > -1))
                return favorPath.slice()
            return favorPath.concat( path )
        }
    }
})
