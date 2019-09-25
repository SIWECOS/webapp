<template>
  <div class="itemhead__siteinformation">
    <h2 class="siteinformation__title">{{ report.domain }}</h2>
    <span class="siteinformation__date">
      {{ localeDate }}
    </span>
    <ButtonDomainDelete :domain="report.domain" />
    <PDFPrint :domain="report.domain"/>
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

      return new Date(this.report.finished_at).toLocaleDateString(code)
    }
  },
  props: {
    report: {
      type: Object
    }
  }
}
</script>
