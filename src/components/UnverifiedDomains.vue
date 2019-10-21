<template>
  <ul class="scanresults">
    <li
      class="item"
      v-for="(domain, key) in domains"
      :key="key">
      <DomainListHeadVerify :domain="domain.domain" />
    </li>
  </ul>
</template>

<script>
import DomainListHeadVerify from './DomainListHeadVerify'
export default {
  name: 'UnverifiedDomains',
  components: { DomainListHeadVerify },
  props: {
    domains: {
      type: Array
    }
  }
}
</script>
