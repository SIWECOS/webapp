<template>
    <div>
        <h3>{{ $t("messages.headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <div id="wppb-login-wrap" class="wppb-user-forms">
            <form @submit.prevent="validateBeforeSubmit" id="loginform">
                <p class="login-username">
                    <label for="email">{{ $t("messages.field_email") }}</label><br>
                    <input name="email" id="email" :placeholder="$t('messages.field_email')" type="email" v-validate="'required|email'" v-model="credentials.email">
                    <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </p>
                <p class="login-password">
                    <label for="password">{{ $t("messages.field_password") }}</label><br>
                    <input name="password" id="password" :placeholder="$t('messages.field_password')" type="password" v-validate="'required'" v-model="credentials.password">
                    <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
                </p>
                <p class="login-remember">
                    <label>
                        <input name="rememberme" id="rememberme" type="checkbox" v-model="credentials.rememberme">
                        {{ $t("messages.field_remember") }}
                    </label>
                </p>
                <p class="login-submit">
                    <input name="wp-submit" id="wppb-submit" class="button button-primary" :value="$t('messages.field_submit')" type="submit"><br>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import auth from '../services/auth.js'

export default {
  name: 'Login',
  data () {
    return {
      credentials: {email: '', password: '', rememberme: false},
      msg: false
    }
  },
  i18n: {
    messages: {
      de: {
        messages: {
          headline: 'Login',
          field_email: 'E-Mail',
          field_password: 'Passwort',
          field_remember: 'Angemeldet bleiben',
          field_submit: 'Anmelden',
          invalid_credentials: 'Ungültige Zugangsdaten'
        }
      }
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submitForm()
          return false
        }

        return true
      })
    },
    submitForm () {
      auth.login(this, this.credentials)
    }
  }
}
</script>
