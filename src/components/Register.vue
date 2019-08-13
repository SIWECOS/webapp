<template>
    <div>
        <h3>{{ $t("messages.register_headline") }}</h3>

        <div id="UserRegistration" v-if="!success" @submit.prevent="submitForm()">
            <form>
                <ul>
                    <li>
                        <h4>{{ $t("messages.fieldset_credentials") }}</h4>
                    </li>
                    <li>
                        <label for="email">{{ $t("messages.field_email") }}</label>
                        <input type="email" id="email" v-validate="'required|email'" :placeholder="$t('messages.field_email')" v-model="user.email" name="email" data-vv-validate-on="blur" />
                        <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </li>
                    <li>
                        <label for="password">{{ $t("messages.field_password") }}</label>
                        <input type="password" id="password" v-validate="{required:true,min:8}" :placeholder="$t('messages.field_password')" v-model="user.password" name="password" data-vv-validate-on="blur"  />
                        <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
                    </li>
                    <li>
                        <label for="password_repeat">{{ $t("messages.field_passwordrepeat") }}</label>
                        <input type="password" id="password_repeat" v-validate="{required:true,is:user.password}"  :placeholder="$t('messages.field_passwordrepeat')" name="password2" data-vv-validate-on="blur"  />
                        <span v-show="errors.has('password2')">{{ errors.first('password2') }}</span>
                    </li>
                    <li>
                        <label for="tos">
                            <input type="checkbox" id="tos" v-validate="{required:true}" name="tos" v-model="user.agb_check" data-vv-validate-on="blur"/>
                            {{ $t("messages.field_tos") }} <a href="https://www.siwecos.de/agb/" target="_blank">AGB</a>
                        </label>
                        <span v-show="errors.has('tos')">{{ errors.first('tos') }}</span>
                    </li>
                </ul>

                <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

                <input type="submit" class="submit button" :value="$t('messages.register_submit')" />
            </form>
        </div>

        <div id="UserRegistrationSuccess" v-if="success">
            {{ $t("messages.successmessage") }}
        </div>
    </div>
</template>

<script>
import api from '../services/api.js'
import auth from '../services/auth.js'
import router from '../router/index.js'

export default {
  name: 'Register',
  data () {
    return {
      user: {},
      msg: false,
      success: false
    }
  },
  methods: {
    submitForm () {
      let userData = Object.assign({}, this.user)
      userData.preferred_language = this.$root.$i18n.locale

      api.$http.post(api.urls.signup_url, userData).then((data) => {
        this.success = true
        this.msg = false
      }).catch((err) => {
        if (err.response.status === 422 && err.response.data && err.response.data.email) {
          this.msg = 'emailaddress_in_use'
          return
        }

        this.msg = 'could_not_register'
      })
    }
  },
  created: function () {
    if (auth.user.authenticated) {
      router.push('/domains')
    }
  }
}
</script>
