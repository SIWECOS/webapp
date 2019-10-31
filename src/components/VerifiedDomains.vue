<template>
  <ul class="scanresults">
   <li
      class="item"
      v-for="(domain, key) in domains"
      :key="key">
      <div class="item__wrapper">
        <DomainListHead
          v-on:toggle="toggle"
          :headId="key.toString()"
          :domain="domain"
          :report="getAssociatedReport(domain.domain)"/>
        <ReportDetails
          :reportKey="key"
          :accordions="accordions"
          :report="getAssociatedReport(domain.domain)" />
      </div>
    </li>
  </ul>
</template>

<script>
import DomainListHead from './DomainListHead'
import ReportDetails from './ReportDetails'
export default {
  name: 'VerifiedDomains',
  data () {
    return {
      accordions: []
    }
  },
  methods: {
    /**
     *
     * @param state
     */
    toggle (state) {
      if (this.accordions.includes(state.target) && !state.active) {
        this.accordions = this.accordions.filter(accordion => accordion !== state.target)
        return
      }

      this.accordions.push(state.target)
    },
    /**
     *
     * @param domain
     * @return {*}
     */
    getAssociatedReport (domain) {
      return this.reports.filter(report => report.domain === domain)[0] || {}
    }
  },
  components: { ReportDetails, DomainListHead },
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
