<template>
  <div class="itemhead__siteinformation">
    <h2 class="siteinformation__title">
      {{ domain.domain }}
    </h2>
    <span
      v-if="report !== null"
      class="siteinformation__date">
      {{ localeDate }}
    </span>
    <ButtonDomainDelete :domain="domain.domain" />
    <PDFPrint :report="report"/>
  </div>
</template>

<script>
import ButtonDomainDelete from './ButtonDomainDelete'
import { mapGetters } from 'vuex'
import PDFPrint from './PDFPrint'
export default {
  name: 'DomainListHeadBase',
  components: { PDFPrint, ButtonDomainDelete },
  computed: {
    ...mapGetters('language', ['language']),
    localeDate () {
      const code = `${this.language}-${this.language.toUpperCase()}`

      if (!this.report.finished_at) {
        return '-'
      }

      const finishedAt = new Date(this.report.finished_at)

      return `${finishedAt.toLocaleDateString(code)} ${finishedAt.toLocaleTimeString(code)}`
    }
  },
  props: {
    domain: {
      type: Object
    },
    report: {
      type: Object
    }
  }
}
</script>
