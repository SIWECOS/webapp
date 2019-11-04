<template>
  <ul class="scanresults">
   <li
      class="item"
      v-for="(domain, key) in domains"
      :key="key">
      <ItemWrapper
        :domain="domain"
        :reports="reports" />
    </li>
  </ul>
</template>

<script>
import ItemWrapper from './ItemWrapper'
export default {
  name: 'VerifiedDomains',
  components: { ItemWrapper },
  props: {
    domains: {
      type: Array
    },
    reports: {
      type: Array
    }
  }
}
</script>
