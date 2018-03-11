import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  de: {
    messages: {
      nav: {
        login: 'Anmeldung',
        register: 'Registrierung',
        logout: 'Abmelden',
        domains: 'Domainübersicht',
        myaccount: 'Mein Konto',
        deleteaccount: 'Konto löschen'
      }
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'de', // set locale
  messages // set locale messages
})

export default i18n
