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
        @submit.prevent="login">
        <p class="login-username">
          <label for="email">{{ $t('common.email') | required }}</label>
          <br>
          <ValidationProvider
            mode="passive"
            name="email"
            rules="required|email"
            v-slot="{ errors }">
            <input
              v-model="email"
              id="email"
              name="email"
              :placeholder="$t('common.email') | required"
              type="text"/>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p class="login-password">
          <label for="password">{{ $t('common.password') | required }}</label>
          <br>
          <ValidationProvider
            mode="passive"
            name="password"
            rules="required|min:8"
            v-slot="{ errors }">
            <input
              v-model="password"
              id="password"
              name="password"
              :placeholder="$t('common.password') | required"
              type="password"/>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p class="login-remember">
          <label for="rememberme">
            <input
              v-model="remember"
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
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { login } from '../services/authentication'
import { mapMutations } from 'vuex'
export default {
  name: 'TheLogin',
  data () {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  methods: {
    ...mapMutations('account', ['setToken']),
    async login () {
      const { valid } = await this.$refs.login.validate()

      if (!valid) return

      try {
        const { token } = await login(this.email, this.password)

        this.setToken(token)
      } catch (e) {
        // TODO:: Output error message
      }
    }
  }
}
</script>
