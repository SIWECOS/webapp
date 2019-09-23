<template>
  <div>
    <h3  v-t="'account.headline'"></h3>
    <div id="UserAccount">
      <ValidationObserver
        ref="account"
        tag="form"
        @submit.prevent="update">
        <ul>
          <li>
            <h4 v-t="'account.login_details'"></h4>
          </li>
          <li>
            <label for="email">{{ $t('common.email') | required }}</label>
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
          </li>
          <li>
            <label for="newpassword">
              {{ $t('account.new_password') }}
            </label>
            <ValidationProvider
              tag="div"
              mode="passive"
              name="password"
              rules="required|min:8"
              v-slot="{ errors }">
              <input
                type="password"
                v-model="credentials.password"
                id="newpassword"
                :placeholder="$t('account.new_password')"
                name="newpassword">
              <span v-if="errors[0]">{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="newpassword_repeat">
              {{ $t('account.repeat_new_password') }}
            </label>
            <ValidationProvider
              tag="div"
              mode="passive"
              name="newpassword_repeat"
              rules="required|confirmed:password"
              v-slot="{ errors }">
              <input
                v-model="credentials.newPassword"
                type="password"
                id="newpassword_repeat"
                :placeholder="$t('account.repeat_new_password')"
                name="newpassword2">
              <span v-if="errors[0]">{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
        </ul>
        <input
          type="submit"
          class="submit button"
          :value="$t('common.save')">
      </ValidationObserver>
      <p>
        {{ $t('account.delete_account_full') }}
        <button
          @click="destroy"
          class="button--link">
          {{ $t('account.delete_account') }}
        </button>
      </p>
      <ResponseMessage
        :code="response.code"
        :namespace="response.namespace"
        v-if="response.code !== null" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ResponseMessage from '../components/ResponseMessage'
export default {
  name: 'TheAccount',
  components: { ResponseMessage },
  mounted () {
    this.fetch().then(() => {
      this.credentials.email = this.account.email
    })
  },
  data () {
    return {
      credentials: {
        email: '',
        password: '',
        newPassword: ''
      },
      response: {
        code: null,
        namespace: 'update_user'
      }
    }
  },
  computed: {
    ...mapGetters('language', ['language']),
    ...mapGetters('account', ['account'])
  },
  methods: {
    ...mapActions('account', ['fetch']),
    /**
     *
     * @return {Promise<void>}
     */
    async update () {
      const valid = await this.$refs.account.validate()

      if (!valid) return

      try {
        await this.$api.update('user', '', {
          email: this.credentials.email,
          newpassword: this.credentials.newPassword,
          preferred_language: this.language
        }, 'patch')
      } catch (e) {
        this.response.code = e.status
      }
    },
    /**
     *
     * @return {Promise<void>}
     */
    async destroy () {
      try {
        const deleteAccount = confirm(this.$t('common.confirm_delete'))

        if (!deleteAccount) {
          return
        }

        await this.$api.delete('user', '', '')
      } catch (e) {
        this.response.code = e.status
      }
    }
  }
}
</script>
