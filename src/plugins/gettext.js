import localeElement from 'element-ui/lib/locale'
import enelement from 'element-ui/lib/locale/lang/en'
import zhelement from 'element-ui/lib/locale/lang/zh-CN'
import zhlang from './locale/messages-zh.js'

let i18n = require('gettext.js').default()
i18n.loadJSON( zhlang )

const I18nPlugin = {

    install( Vue ) {
        Vue.prototype.$t = function () {
            return i18n.gettext.apply( i18n, arguments )
        }
    }

}

function gettext () {
    return i18n.gettext.apply( i18n, arguments )
}

function setLocale ( lang ) {
    if ( lang && lang.indexOf( 'zh' ) === 0 ) {
        localeElement.use( zhelement )
        i18n.setLocale( 'zh-CN' )
    }
    else {
        localeElement.use( enelement )
        i18n.setLocale( lang )
    }
}

export { I18nPlugin as default, setLocale, gettext as _t }
