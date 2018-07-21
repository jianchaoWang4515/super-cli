import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import messages from '@/local'

Vue.use(VueI18n)

export default {
    initLang({ state, commit, dispatch }) {
        return new Promise((resolve, reject) => {
        	let lang = localStorage.lang || 'cn'
        	commit('CHANGE_LOCALE', lang)
            const i18n = new VueI18n({
                locale: state.locale,
                messages
            })
            ElementLocale.i18n((key, value) => i18n.t(key, value))
            resolve(i18n)
        })
    },
    updateLang({ state, commit, dispatch }, {lang, i18n}) {
    	localStorage.setItem('lang', lang)
    	commit('CHANGE_LOCALE', lang)
    	i18n.locale = lang
    }
}