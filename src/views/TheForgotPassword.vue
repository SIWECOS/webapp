<template>
  <div>
    <h3>{{ $t('login.reset_password') }}</h3>
    <div
      id="wppb-forgotpwd-wrap"
      class="wppb-forgotpwd-forms">
      <ValidationObserver
        ref="forgotPassword"
        tag="form"
        @submit.prevent="reset">
        <p class="login-username">
          <label for="email">
            {{ $t('common.email') | required }}
          </label>
          <br>
          <ValidationProvider
            mode="passive"
            name="email"
            rules="required|email"
            v-slot="{ errors }">
            <input
              v-model="email"
              id="email"
              type="email"
              :placeholder="$t('common.email') | required"
              name="email"/>
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
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheForgotPassword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    /**
     *
     * @return {Promise<void>}
     */
    async reset () {
      const valid = await this.$refs.forgotPassword.validate()

      if (!valid) return

      try {
        await this.$api.create('user/password/sendResetMail', { email: this.email })
      } catch (e) {
        // TODO:: Output error
      }
    }
  }
}
</script>
