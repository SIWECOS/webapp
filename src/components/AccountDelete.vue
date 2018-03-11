<template>
    <div>
        {{ $t('messages.accountdelete_text') }}
    </div>
</template>

<script>
  import auth from '../services/auth.js'
  import api from '../services/api.js'
  import router from '../router/index.js'

  export default {
    name: 'AccountDelete',
    data () {
      return {
      }
    },
    created: function () {
      if (!auth.user.authenticated) {
        router.push('/login')
        return
      }

      this.user = auth.user.data

      if (!confirm(this.$t('messages.confirm_accountdelete'))) {
        router.push('/domains')

        return false
      }

      api.$http.post(api.urls.account_delete).then((data) => {
        auth.logout()
      }).catch(() => {
        router.push('/domains')
      })
    }
  }
</script>