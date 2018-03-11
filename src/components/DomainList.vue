<template>
    <div>
        <h3>{{ $t("messages.domainlist_headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <section id="domains-wrapper">
            <ul id="domains-scanners-list" class="scanners-results" v-if="domains.length">
                <li v-for="(domain, index) in domains" class="domain-results-item">
                    <domain-details v-bind:domain="domain" v-on:delete-domain="deleteThisDomain(index)"></domain-details>
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
  methods: {
    deleteThisDomain: function (index) {
      this.domains.splice(index, 1)
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