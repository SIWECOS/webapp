<template>
    <div>
        <h3>{{ $t("messages.resetpassword_headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <div id="wppb-resetpwd-wrap" class="wppb-resetpwd-forms">
            <form @submit.prevent="validateAddForm" id="resetform">
                <p class="login-username">
                    <label for="email">{{ $t("messages.field_email") }}</label><br>
                    <input name="email" id="email" :placeholder="$t('messages.field_email')" type="email" v-validate="{required:true,email:true}" v-model="data.email">
                    <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </p>
                <p class="login-newpassword">
                    <label for="newpassword">{{ $t("messages.field_newpassword") }}</label>
                    <input type="password" id="newpassword" v-validate="{min:8,required:true}" :placeholder="$t('messages.field_newpassword')" v-model="data.newpassword" name="newpassword" />
                    <span v-show="errors.has('newpassword')">{{ errors.first('newpassword') }}</span>
                </p>
                <p class="login-newpasswordrepeat">
                    <label for="newpassword_repeat">{{ $t("messages.field_newpasswordrepeat") }}</label>
                    <input type="password" id="newpassword_repeat" v-validate="{is:data.newpassword,required:true}"  :placeholder="$t('messages.field_newpasswordrepeat')" name="newpassword2" />
                    <span v-show="errors.has('newpassword2')">{{ errors.first('newpassword2') }}</span>
                </p>
                <p class="login-submit">
                    <input name="wp-submit" id="wppb-submit" class="button button-primary" :value="$t('messages.field_resetpassword_submit')" type="submit"><br>
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
    name: 'ResetPassword',
    data () {
      return {
        data: {},
        msg: false
      }
    },
    i18n: {
      messages: {
        de: {
          messages: {

          }
        }
      }
    },
    created: function () {
      if (auth.user.authenticated) {
        router.push('/domains')
      }

      this.data.token = this.$route.params.token
    },
    methods: {
      validateAddForm () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.processReset()
            return false
          }

          return true
        })
      },
      processReset () {
        api.$http.post(api.urls.process_reset, this.data).then((data) => {
          this.msg = 'reset_complete'

          setTimeout(function () {
            this.msg = false
            router.push('/login')
          }.bind(this), 2000)
        }).catch((err) => {
          console.log(err)

          this.msg = 'no_user_found'

          setTimeout(function () {
            this.msg = false
          }.bind(this), 5000)
        })
      }
    }
  }
</script>