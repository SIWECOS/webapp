<template>
  <div>
    <h3>{{ $t('login.reset_password') }}</h3>
    <div
      id="wppb-forgotpwd-wrap"
      class="wppb-forgotpwd-forms">
      <ValidationObserver
        ref="resetPassword"
        tag="form"
        @submit.prevent="reset">
        <p class="newpassword">
          <label for="email">
            {{ $t('common.password') | required }}
          </label>
          <br>
          <ValidationProvider
            tag="div"
            mode="passive"
            name="newpassword"
            rules="required"
            v-slot="{ errors }">
            <input
              v-model="newpassword"
              id="newpassword"
              type="password"
              :placeholder="$t('common.password') | required"
              name="newpassword"/>
            <span v-if="errors[0]">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p class="login-submit">
          <input
            name="wp-submit"
            id="wppb-submit"
            type="submit"
            class="btn btn-primary"
            :value="$t('login.reset_password')">
          <br>
        </p>
        <ResponseMessage
          :code="response.code"
          :namespace="response.namespace"
          v-if="response.code !== null" />
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import ResponseMessage from '../components/ResponseMessage'
export default {
  name: 'ThePasswordReset',
  components: { ResponseMessage },
  data () {
    return {
      newpassword: '',
      response: {
        code: null,
        namespace: 'reset_password'
      }
    }
  },
  methods: {
    /**
     *
     * @return {Promise<void>}
     */
    async reset () {
      const valid = await this.$refs.resetPassword.validate()

      if (!valid) return

      try {
        await this.$api.create('user/password/reset', { reset_token: this.$route.params.token, newpassword: this.newpassword })

        this.response.code = 200
        setTimeout(() => this.$router.push({ path: '/login' }), 1500)
      } catch (e) {
        this.response.code = e.status
      }
    }
  }
}
</script>
