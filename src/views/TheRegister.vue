<template>
  <div>
    <h3 v-t="'register.main_title'"></h3>
    <div id="UserRegistration">
      <ValidationObserver
        ref="register"
        tag="form"
        @submit.prevent="register">
        <ul>
          <li>
            <h4 v-t="'register.second_title'"></h4>
          </li>
          <li>
            <label for="email">
              {{ $t('common.email') | required }}
            </label>
            <ValidationProvider
              mode="passive"
              name="email"
              rules="required|email"
              v-slot="{ errors }">
              <input
                v-model="credentials.email"
                id="email"
                type="email"
                :placeholder="$t('common.email') | required"
                name="email"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="password">
              {{ $t('common.password') | required }}
            </label>
            <ValidationProvider
              mode="passive"
              name="password"
              rules="required|min:8"
              v-slot="{ errors }">
              <input
                v-model="credentials.password"
                id="password"
                type="password"
                :placeholder="$t('common.password') | required"
                name="password"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="password_repeat">
              {{ $t('common.repeat') }} {{ $t('common.password') | required }}
            </label>
            <ValidationProvider
              mode="passive"
              name="password_repeat"
              rules="required|confirmed:password"
              v-slot="{ errors }">
              <input
                v-model="passwordRepeat"
                :placeholder="repeatPlaceholder"
                id="password_repeat"
                type="password"
                name="password_repeat"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="tos">
              {{ $t('common.accept') }}
              <a
                href="https://www.siwecos.de/agb/"
                target="_blank">
                {{ $t('common.agb') }}
              </a>
            </label>
            <ValidationProvider
              mode="passive"
              name="agbCheck"
              :rules="{ required: { allowFalse: false } }"
              v-slot="{ errors }">
              <input
                v-model="agbCheck"
                id="tos"
                type="checkbox"
                name="tos"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
        </ul>
        <input
          class="submit button"
          type="submit"
          :value="$t('register.register')" />
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheRegister',
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      passwordRepeat: '',
      agbCheck: false
    }
  },
  computed: {
    /**
     *
     * @return {string}
     */
    repeatPlaceholder () {
      return `${this.$t('common.repeat')} ${this.$t('common.password')}*`
    }
  },
  methods: {
    /**
     *
     * @return {Promise<void>}
     */
    async register () {
      const valid = await this.$refs.register.validate()

      if (!valid) return

      try {
        await this.$api.create('user', { agb_check: this.agbCheck, ...this.credentials })
      } catch (e) {
        // TODO:: Output error message
      }
    }
  }
}
</script>
