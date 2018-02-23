<template>
    <div>
        <h3>{{ $t("messages.headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <section id="domains-wrapper">
            <ul id="domains-scanners-list" class="scanners-results" v-if="domains.length">
                <li v-for="(domain) in domains" class="domain-results-item">
                    <domain-details v-bind:domain="domain">></domain-details>
                </li>
            </ul>
            <p v-if="!domains.length && !msg">{{ $t("messages.nodomains") }}</p>
        </section>

        <router-link to="domain/add" class="btn btn-primary">{{ $t('messages.addDomain') }}</router-link></li>
    </div>
</template>

<script>
import api from '../services/api.js'
import auth from '../services/auth.js'
import router from '../router/index.js'
import DomainDetails from './DomainDetails'

export default {
  name: 'DomainList',
  data () {
    return {
      domains: [],
      msg: false
    }
  },
  i18n: {
    messages: {
      de: {
        messages: {
          headline: 'Sicherheitsbericht',
          api_error: 'Fehler beim Abruf der Domaindaten, bitte versuchen Sie es später erneut',
          nodomains: 'Keine Domains verfügbar',
          addDomain: 'Domain hinzufügen'
        }
      }
    }
  },
  created: function () {
    if (!auth.user.authenticated) {
      router.push('/login')
    }

    api.$http.post(api.urls.domain_list).then((data) => {
      this.domains = data.data.domains
    }).catch(() => {
      this.msg = 'api_error'
    })
  },
  components: {
    // <my-component> will only be available in parent's template
    DomainDetails,
    'domain-details': DomainDetails
  }
}
</script>