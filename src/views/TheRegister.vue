<template>
  <div>
    <h3 v-t="'register.main_title'"></h3>
    <div id="UserRegistration">
      <form @submit.prevent="register">
        <ul>
          <li>
            <h4 v-t="'register.second_title'"></h4>
          </li>
          <li>
            <label for="email">{{ $t('common.email') | required }}</label>
            <input
              v-model="credentials.email"
              id="email"
              type="email"
              :placeholder="$t('common.email') | required"
              name="email"/>
          </li>
          <li>
            <label for="password">{{ $t('common.password') | required }}</label>
            <input
              v-model="credentials.password"
              id="password"
              type="password"
              :placeholder="$t('common.password') | required"
              name="password"/>
          </li>
          <li>
            <label for="password_repeat">{{ $t('common.repeat') }} {{ $t('common.password') | required }}</label>
            <input
              v-model="passwordRepeat"
              :placeholder="repeatPlaceholder"
              id="password_repeat"
              type="password"
              name="password_repeat"/>
          </li>
          <li>
            <label for="tos">
              <input
                v-model="agbCheck"
                id="tos"
                type="checkbox"
                name="tos"/>
              {{ $t('common.accept') }} <a href="https://www.siwecos.de/agb/" target="_blank">{{ $t('common.agb') }}</a>
            </label>
          </li>
        </ul>
        <input
          class="submit button"
          type="submit"
          :value="$t('register.register')" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    ...mapActions('account', ['registerUser']),
    /**
     *
     * @return {Promise<void>}
     */
    async register () {
      if (this.passwordRepeat !== this.credentials.password) return

      try {
        await this.$api.create('user', { agb_check: this.agbCheck, ...this.credentials })
      } catch (e) {
        // TODO:: Output error message
      }
    }
  }
}
</script>
