<template>
  <div class="item__wrapper">
    <DomainListHead
      v-on:toggle="setToggle"
      :domain="domain"
      :report="getAssociatedReport(domain.domain)"/>
    <ReportDetails
      :class="{ 'active': toggle }"
      :report="getAssociatedReport(domain.domain)" />
  </div>
</template>

<script>
import DomainListHead from './DomainListHead'
import ReportDetails from './ReportDetails'
export default {
  name: 'ItemWrapper',
  data () {
    return {
      toggle: false
    }
  },
  components: { DomainListHead, ReportDetails },
  props: {
    domain: {
      type: Object
    },
    reports: {
      type: Array
    }
  },
  methods: {
    /**
     *
     * @param state
     */
    setToggle (state) {
      this.toggle = state
    },
    /**
     *
     * @param domain
     * @return {*}
     */
    getAssociatedReport (domain) {
      return this.reports.filter(report => report.domain === domain)[0] || {}
    }
  }
}
</script>
