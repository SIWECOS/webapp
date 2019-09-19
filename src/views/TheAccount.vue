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
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="newpassword">
              {{ newPasswordLabel }}
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
                :placeholder="newPasswordLabel"
                name="newpassword">
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </li>
          <li>
            <label for="newpassword_repeat">
              {{ newPasswordRepeatLabel }}
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
                :placeholder="newPasswordRepeatLabel"
                name="newpassword2">
              <span>{{ errors[0] }}</span>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheAccount',
  data () {
    return {
      credentials: {
        email: '',
        password: '',
        newPassword: ''
      }
    }
  },
  computed: {
    /**
     *
     * @return {string}
     */
    newPasswordLabel () {
      return `${this.$t('common.new')} ${this.$t('common.password')}`
    },
    /**
     *
     * @return {string}
     */
    newPasswordRepeatLabel () {
      return `${this.$t('common.repeat')} ${this.$t('common.new').toLowerCase()} ${this.$t('common.password')}`
    }
  },
  methods: {
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
          preferred_language: 'en'
        }, 'patch')
      } catch (e) {
        // TODO:: Output error
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

        await this.$api.delete('user', '')
      } catch (e) {
        // TODO:: Output error
      }
    }
  }
}
</script>
