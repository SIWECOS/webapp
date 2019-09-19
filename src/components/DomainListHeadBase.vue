<template>
  <div class="itemhead__siteinformation">
    <h2 class="siteinformation__title">{{ report.domain }}</h2>
    <span class="siteinformation__date">{{ report.finished_at }}</span>
    <ButtonDomainDelete :domain="report.domain" />
  </div>
</template>

<script>
import ButtonDomainDelete from './ButtonDomainDelete'
export default {
  name: 'DomainListHeadBase',
  components: { ButtonDomainDelete },
  props: {
    report: {
      type: Object
    }
  }
}
</script>
