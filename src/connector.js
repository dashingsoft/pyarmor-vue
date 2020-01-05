import Vue from 'vue'
import reqwest from './reqwest.js'

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
    data: {
        serverUrl: Vue.$isServer ? '/' : 'http://localhost:9096/'
    },
    methods: {
        sendRequest: function (url, data, event) {
            let error = function (err) {
                Vue.prototype.$message({
                    type: 'error',
                    message: err,
                    showClose: true
                })
                this.$emit(event + '-fail')
            }
            let success = function (resp) {
                if (resp.err === 0)
                    this.$emit(event, resp.data)
                else
                    error(resp.data)
            }
            send_request(url, data, success.bind(this), error.bind(this))
        },
        queryVersion: function (data) {
            let url = this.serverUrl + 'version';
            // send_request(url, data, success, error)
            this.sendRequest(url, data, 'query-version');
        },
        listDirectory: function (data) {
            let url = this.serverUrl + 'listdir';
            this.sendRequest(url, data, 'list-directory');
        },
        newProject: function (data) {
            let url = this.serverUrl + 'project/new';
            this.sendRequest(url, data, 'new-project');
        },
        updateProject: function (data) {
            let url = this.serverUrl + 'project/update';
            this.sendRequest(url, data, 'update-project');
        },
        buildProject: function (data) {
            let url = this.serverUrl + 'project/build';
            this.sendRequest(url, data, 'build-project');
        },
        removeProject: function (data) {
            let url = this.serverUrl + 'project/remove';
            this.sendRequest(url, data, 'remove-project');
        },
        buildTempProject: function (data) {
            let url = this.serverUrl + 'project/build_temp';
            this.sendRequest(url, data, 'build-temp-project');
        },
        listProject: function (data) {
            let url = this.serverUrl + 'project/list';
            this.sendRequest(url, data, 'list-project');
        },
        newLicense: function (data) {
            let url = this.serverUrl + 'license/new';
            this.sendRequest(url, data, 'new-license');
        },
        removeLicense: function (data) {
            let url = this.serverUrl + 'license/remove';
            this.sendRequest(url, data, 'remove-license');
        },
        listLicense: function (data) {
            let url = this.serverUrl + 'license/list';
            this.sendRequest(url, data, 'list-license');
        },
    }
})
