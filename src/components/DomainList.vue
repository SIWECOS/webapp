<template>
  <div>
    <!-- Display full report -->
    <ul
      class="scanresults"
      v-if="reports.length">
      <li
        class="item"
        v-for="(report, key) in reports"
        :key="key">
        <div class="item__wrapper">
          <DomainListHead
            v-on:toggle="setVisibility"
            :headId="key.toString()"
            :report="report"/>
          <section
            class="item__content"
            :class="[accordions.includes(`item__content__${key}`) ? 'active' : '', `item__content__${key}`]">
            <DomainListDoughnuts
              :report="report.report"
              :id="report.id.toString()" />
            <DomainListReports
              :id="key.toString()"
              :report="report.report" />
          </section>
        </div>
      </li>
    </ul>
    <!-- Depending on the verified state: Display only the domain with or without the verify button -->
    <ul
      class="scanresults"
      v-if="domainsWithoutReports.length">
      <li
        class="item"
        v-for="(domains, key) in domainsWithoutReports"
        :key="key">
        <DomainListHeadVerify :domain="domains.domain" />
      </li>
    </ul>
  </div>
</template>

<script>
import DomainListHead from './DomainListHead'
import DomainListHeadVerify from './DomainListHeadVerify'
import DomainListReports from './DomainListReports'
import DomainListDoughnuts from './DomainListDoughnuts'
import { mapGetters } from 'vuex'
export default {
  name: 'DomainList',
  components: {
    DomainListDoughnuts,
    DomainListReports,
    DomainListHeadVerify,
    DomainListHead
  },
  data () {
    return {
      reports: [],
      domainsWithoutReports: [],
      accordions: []
    }
  },
  mounted () {
    this.getReports()
  },
  watch: {
    domains () {
      this.getReports()
    }
  },
  props: {
    domains: {
      type: Array
    }
  },
  computed: {
    ...mapGetters('language', ['language'])
  },
  methods: {
    /**
     * @return {void}
     */
    getReports () {
      this.reports = []
      this.domainsWithoutReports = []

      this.domains.forEach(item => {
        this.$api.get(`domain/${item.domain}/report/${this.language}`).then(report => {
          Reflect.set(report, 'domain', item.domain)
          Reflect.set(report, 'verified', item.is_verified)

          this.reports.push(report)
        }).catch(({ data }) => {
          // Hasn't been scanned yet. No report available.
          if (data.message === 'Scan Not Found') {
            this.domainsWithoutReports.push(item)
          }
        })
      })
    },
    /**
     *
     * @param state
     */
    setVisibility (state) {
      if (this.accordions.includes(state.target) && !state.active) {
        this.accordions = this.accordions.filter(accordion => accordion !== state.target)
        return
      }

      this.accordions.push(state.target)
    }
  }
}
</script>
