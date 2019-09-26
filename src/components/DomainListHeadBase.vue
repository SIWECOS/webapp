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
  </div>
</template>

<script>
import ButtonDomainDelete from './ButtonDomainDelete'
import { mapGetters } from 'vuex'
export default {
  name: 'DomainListHeadBase',
  components: { ButtonDomainDelete },
  computed: {
    ...mapGetters('language', ['language']),
    localeDate () {
      const code = `${this.language}-${this.language.toUpperCase()}`

      if (!this.report.finished_at) {
        return '-'
      }

      return new Date(this.report.finished_at).toLocaleDateString(code)
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
