<template>
  <div class="report-link">
    <form
      v-if="hasBeenScanned"
      method="post"
      :action="url">
      <input
        type="hidden"
        name="SIWECOS-Token"
        :value="token" />
      <input
        type="submit"
        :value="$t('common.pdf_link')" />
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import env from '../../env'
export default {
  name: 'PDFPrint',
  data () {
    return {
      link: ''
    }
  },
  props: {
    report: {
      type: Object
    }
  },
  computed: {
    ...mapGetters('language', ['language']),
    ...mapGetters('domains', ['scanId']),
    ...mapGetters('account', ['token']),
    url () {
      return `${env.APP_URL}/api/v2/scan/${this.report.id}/${this.language}/pdf`
    },
    hasBeenScanned () {
      if (!this.report || !this.report.id) {
        return false
      }

      return true
    }
  }
}
</script>
