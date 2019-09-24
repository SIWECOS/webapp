<template>
  <div>
    <h3 v-t="'login.main_title'"></h3>
    <div
      id="wppb-login-wrap"
      class="wppb-user-forms">
      <ValidationObserver
        ref="login"
        id="loginform"
        tag="form"
        @submit.prevent="authenticate">
        <p class="login-username">
          <label for="email">{{ $t('common.email') | required }}</label>
          <br>
          <ValidationProvider
            tag="div"
            mode="passive"
            name="email"
            rules="required|email"
            v-slot="{ errors }">
            <input
              v-model="credentials.email"
              id="email"
              name="email"
              :placeholder="$t('common.email') | required"
              type="text"/>
            <span v-if="errors[0]">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p class="login-password">
          <label for="password">{{ $t('common.password') | required }}</label>
          <br>
          <ValidationProvider
            tag="div"
            mode="passive"
            name="password"
            rules="required|min:8"
            v-slot="{ errors }">
            <input
              v-model="credentials.password"
              id="password"
              name="password"
              :placeholder="$t('common.password') | required"
              type="password"/>
            <span v-if="errors[0]">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p class="login-remember">
          <label for="rememberme">
            <input
              v-model="credentials.remember"
              id="rememberme"
              name="rememberme"
              type="checkbox"/>
            {{ $t('login.remain') }}
          </label>
        </p>
        <p class="login-submit">
          <input
            id="wppb-submit"
            class="button button-primary"
            name="wp-submit"
            type="submit"
            :value="$t('login.login')"/>
        </p>
        <ResponseMessage
          :code="response.code"
          :namespace="response.namespace"
          v-if="response.code !== null" />
      </ValidationObserver>
      <router-link to="forgotpassword">
        {{ $t('login.forgot_password') }}
      </router-link>
      <br>
      <router-link to="resendactivation">
        {{ $t('login.resend_activation') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import ResponseMessage from '../components/ResponseMessage'
export default {
  name: 'TheLogin',
  components: { ResponseMessage },
  data () {
    return {
      credentials: {
        email: '',
        password: '',
        remember: false
      },
      response: {
        code: null,
        namespace: 'login'
      }
    }
  },
  computed: {
    ...mapGetters('account', ['token'])
  },
  methods: {
    ...mapMutations('account', ['setToken']),
    ...mapActions('account', ['login']),
    async authenticate () {
      const valid = await this.$refs.login.validate()

      if (!valid) return

      try {
        await this.login(this.credentials)

        if (typeof window.login_announce !== 'undefined') {
          window.login_announce(this.token)
        }

        this.$router.push({ path: '/domains' })
      } catch (e) {
        this.response.code = e.status
      }
    }
  }
}
</script>
