<template>
    <div>
        <h3>{{ $t("messages.resendactivation_headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <div id="wppb-forgotpwd-wrap" class="wppb-forgotpwd-forms">
            <form @submit.prevent="validateAddForm" id="forgotform">
                <p class="login-username">
                    <label for="email">{{ $t("messages.field_email") }}</label><br>
                    <input name="email" id="email" :placeholder="$t('messages.field_email')" type="email" v-validate="{required:true,email:true}" v-model="email">
                    <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </p>
                <p class="login-submit">
                    <input name="wp-submit" id="wppb-submit" class="btn btn-primary" :value="$t('messages.field_resend_submit')" type="submit"><br>
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
    name: 'ResendActivation',
    data () {
      return {
        email: '',
        msg: false
      }
    },
    created: function () {
      if (auth.user.authenticated) {
        router.push('/domains')
      }
    },
    methods: {
      validateAddForm () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.resendActivation()
            return false
          }

          return true
        })
      },
      resendActivation () {
        api.$http.post(api.urls.resend_activation, {email: this.email}).then((data) => {
          this.msg = 'activation_resent'

          setTimeout(function () {
            this.msg = false
          }.bind(this), 5000)
        }).catch((err) => {
          console.log(err)

          this.msg = 'no_user_found_or_already_active'

          setTimeout(function () {
            this.msg = false
          }.bind(this), 5000)
        })
      }
    }
  }
</script>