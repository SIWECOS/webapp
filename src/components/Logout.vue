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
  created: function () {
    auth.logout()
  }
}
</script>