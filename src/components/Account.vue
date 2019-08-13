<template>
    <div>
        <h3>{{ $t("messages.account_headline") }}</h3>

        <div id="UserAccount">
            <form @submit.prevent="validateBeforeSubmit">
                <ul>
                    <li>
                        <h4>{{ $t("messages.fieldset_credentials") }}</h4>
                    </li>
                    <li>
                        <label for="email">{{ $t("messages.field_email") }}</label>
                        <input type="email" id="email" v-validate="'required|email'" :placeholder="$t('messages.field_email')" v-model="user.email" name="email" data-vv-validate-on="blur"/>
                        <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </li>
                    <li>
                        <label for="newpassword">{{ $t("messages.field_newpassword") }}</label>
                        <input type="password" id="newpassword" v-validate="{min:8}" :placeholder="$t('messages.field_newpassword')" v-model="user.newpassword" name="newpassword" data-vv-validate-on="blur" />
                        <span v-show="errors.has('newpassword')">{{ errors.first('newpassword') }}</span>
                    </li>
                    <li>
                        <label for="newpassword_repeat">{{ $t("messages.field_newpasswordrepeat") }}</label>
                        <input type="password" id="newpassword_repeat" v-validate="{is:user.newpassword}" :placeholder="$t('messages.field_newpasswordrepeat')" v-model="user.newpassword2" name="newpassword2" data-vv-validate-on="blur" />
                        <span v-show="errors.has('newpassword2')">{{ errors.first('newpassword2') }}</span>
                    </li>
                </ul>

                <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

                <input type="submit" class="submit button" :value="$t('messages.submit')" />
            </form>

            <p>{{ $t('messages.wanttodelete') }} <router-link to="/accountdelete">{{ $t('messages.nav.deleteaccount') }}</router-link></p>
        </div>
    </div>
</template>

<script>
import auth from '../services/auth.js'
import router from '../router/index.js'
import api from '../services/api.js'

export default {
  name: 'Account',
  data () {
    return {
      user: {},
      msg: false
    }
  },
  methods: {
    validateBeforeSubmit () {
      if (this.user.newpassword !== '' && this.user.newpassword !== this.user.newpassword2) {
        alert(this.$t('messages.password_no_match'))

        return true
      }

      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submitForm()
          return false
        }

        return true
      })
    },
    submitForm () {
      let userData = Object.assign({}, this.user)
      userData.preferred_language = this.$root.$i18n.locale

      api.$http.patch(api.urls.update_user, userData).then((data) => {
        this.msg = 'account_saved'
      }).catch(() => {
        this.msg = 'error_saving_account'
      })
    }
  },
  created: function () {
    if (!auth.user.authenticated) {
      router.push('/login')
    }

    this.user = auth.user.data
  }
}
</script>