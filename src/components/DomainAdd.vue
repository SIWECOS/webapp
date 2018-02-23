<template>
    <div>
        <h3>{{ $t("messages.headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <div id="wppb-domainadd-wrap" class="wppb-domain-forms">
            <form @submit.prevent="validateAddForm" id="domainform">
                <p class="login-username">
                    <label for="domain">{{ $t("messages.field_domain") }}</label><br>
                    <input name="domain" id="domain" :placeholder="$t('messages.field_domain')" type="url" v-validate="{required:true,url:true}" v-model="domain.domain">
                    <span v-show="errors.has('domain')">{{ errors.first('domain') }}</span>
                </p>
                <p class="login-submit">
                    <input name="wp-submit" id="wppb-submit" class="button button-primary" :value="$t('messages.field_submit')" type="submit"><br>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
  import api from '../services/api.js'
  import auth from '../services/auth.js'
  import router from '../router/index.js'

  export default {
    name: 'DomainAdd',
    data () {
      return {
        domain: {
          domain: '',
          danger_level: 10
        },
        msg: false
      }
    },
    i18n: {
      messages: {
        de: {
          messages: {
            headline: 'Domain hinzufügen',
            field_submit: 'Hinzufügen',
            field_domain: 'Domain',
            domain_in_use: 'Die angegebene Domain wird bereits in einem SIWECOS Konto verwendet',
            could_not_add: 'Die Domain konnte nicht hinzugefügt werden, bitte versuchen Sie es später erneut'
          }
        }
      }
    },
    created: function () {
      if (!auth.user.authenticated) {
        router.push('/login')
      }
    },
    methods: {
      validateAddForm () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.addDomain()
            return false
          }

          return true
        })
      },
      addDomain () {
        api.$http.post(api.urls.domain_add, this.domain).then((data) => {
          router.push('/domain/verify/' + data.data.domainId)
        }).catch((err) => {
          if (err.response.status === 422) {
            this.msg = 'domain_in_use'
            return
          }

          this.msg = 'could_not_add'
        })
      }
    }
  }
</script>