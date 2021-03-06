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
              tag="div"
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
              <span v-if="errors[0]">{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="password">
              {{ $t('common.password') | required }}
            </label>
            <ValidationProvider
              tag="div"
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
              <span v-if="errors[0]">{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="password_repeat">
              {{ $t('register.repeat_password') }} | required }}
            </label>
            <ValidationProvider
              tag="div"
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
              <span v-if="errors[0]">{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="tos"></label>
            <ValidationProvider
              tag="div"
              mode="passive"
              name="agbCheck"
              :rules="{ required: { allowFalse: false } }"
              v-slot="{ errors }">
              {{ $t('common.accept') }}
              <a
                href="https://www.siwecos.de/agb/"
                target="_blank">
                {{ $t('common.agb') }}
              </a>
              <input
                v-model="agbCheck"
                id="tos"
                type="checkbox"
                name="tos"/>
              <span v-if="errors[0]">{{ errors[0] }}</span>
              <ResponseMessage
                :validation="response.data"
                :code="response.code"
                :namespace="response.namespace"
                v-if="response.code !== null" />
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
import ResponseMessage from '../components/ResponseMessage'
export default {
  name: 'TheRegister',
  components: { ResponseMessage },
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      response: {
        code: null,
        namespace: 'user_register'
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
      return `${this.$t('register.repeat_password')}*`
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

        alert(this.$t('register.success'))

        this.$router.push('/login')
      } catch (e) {
        if (Object.keys(e.data).length > 0) {
          this.response.data = e.data
        }

        this.response.code = e.status
      }
    }
  }
}
</script>
