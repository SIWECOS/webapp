<template>
    <div>
        {{ $t('messages.loggingout') }}
    </div>
</template>

<script>
import auth from '../services/auth.js'

export default {
  name: 'Logout',
  data () {
    return {
    }
  },
  i18n: {
    messages: {
      de: {
        messages: {
          loggingout: 'Sie werden nun abgemeldet'
        }
      }
    }
  },
  created: function () {
    auth.logout()
  }
}
</script>