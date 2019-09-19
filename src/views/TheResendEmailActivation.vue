<template>
  <div>
    <h3>Resend activation link</h3>
    <div>
      <ValidationObserver
        ref="resendActivation"
        tag="form"
        @submit.prevent="resend">
        <p class="login-username">
          <label for="email">
            {{ $t('common.email') | required }}
          </label>
          <br>
          <ValidationProvider
            tag="div"
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
        <p class="resend-email-submit">
          <input
            name="wp-submit"
            id="wppb-submit"
            type="submit"
            class="btn btn-primary"
            value="Resend">
          <br>
        </p>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheResendEmailActivation',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async resend () {
      await this.$api.create('user/activate/resend', { email: this.email })

      this.$router.push({ path: '/login' })
    }
  }
}
</script>
