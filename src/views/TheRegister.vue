<template>
  <div>
    <h3>Login</h3>
    <div id="UserRegistration">
      <form @submit.prevent="register">
        <ul>
          <li>
            <h4>Zugangsdaten</h4>
          </li>
          <li>
            <label for="email">E-Mail*</label>
            <input
              v-model="credentials.email"
              id="email"
              type="email"
              placeholder="E-Mail*"
              name="email"
              aria-required="true"
              aria-invalid="false"/>
          </li>
          <li>
            <label for="password">Passwort*</label>
            <input
              v-model="credentials.password"
              id="password"
              type="password"
              placeholder="Passwort*"
              name="password"
              aria-required="true"
              aria-invalid="false"/>
          </li>
          <li>
            <label for="password_repeat">Passwort wiederholen*</label>
            <input
              v-model="passwordRepeat"
              id="password_repeat"
              type="password"
              placeholder="Passwort wiederholen*"
              name="password_repeat"
              aria-required="true"
              aria-invalid="false"/>
          </li>
          <li>
            <label for="tos">
              <input
                v-model="agbCheck"
                id="tos"
                type="checkbox"
                name="tos"
                aria-required="true"
                aria-invalid="false"/>
              Ich akzeptiere die <a href="https://www.siwecos.de/agb/" target="_blank">AGB</a>
            </label>
          </li>
        </ul>
        <input
          class="submit button"
          type="submit"
          value="Registrieren" />
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
  methods: {
    ...mapActions('account', ['registerUser']),
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
