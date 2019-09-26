<template>
  <div>
    <ul class="scanresults">
      <UnverifiedDomains :domains="unverified" />
      <VerifiedDomains
        :domains="verified"
        :reports="getReports"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UnverifiedDomains from './UnverifiedDomains'
import VerifiedDomains from './VerifiedDomains'
export default {
  name: 'DomainList',
  components: {
    VerifiedDomains,
    UnverifiedDomains
  },
  data () {
    return {
      verified: [],
      unverified: [],
      reports: []
    }
  },
  mounted () {
    this.getDomainList()
  },
  watch: {
    /**
     * @return {void}
     */
    verified (domains) {
      this.setReports(domains).then(reports => {
        this.reports = reports
      })
    }
  },
  props: {
    domains: {
      type: Array
    }
  },
  computed: {
    ...mapGetters('language', ['language']),
    getReports () {
      return this.reports
    }
  },
  methods: {
    /**
     * @return {Array}
     */
    async setReports (domains) {
      let reports = []

      for (let domain of domains) {
        const report = await this.$api.get(`domain/${domain.domain}/report/${this.language}`)

        Reflect.set(report, 'domain', domain.domain)
        Reflect.set(report, 'verified', domain.is_verified)

        reports.push(report)
      }

      return reports
    },
    /**
     * @return {void}
     */
    getDomainList () {
      this.verified = []
      this.unverified = []

      for (let domain of this.domains) {
        if (!domain.is_verified) {
          this.unverified.push(domain)
          continue
        }

        this.verified.push(domain)
      }
    }
  }
}
</script>
