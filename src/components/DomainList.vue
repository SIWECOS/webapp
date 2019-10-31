<template>
  <div>
    <VerifiedDomains
      :domains="verified"
      :reports="getReports"/>
    <UnverifiedDomains :domains="unverified" />
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
    this.getUnverifiedDomains()
    this.getVerifiedDomains()
  },
  watch: {
    /**
     * @return {void}
     */
    verified (domains) {
      this.setReports(domains).then(reports => {
        this.reports = reports
      })
    },
    /**
     * @return {void}
     */
    domains () {
      this.getVerifiedDomains()
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
    sortByAlphabet (target) {
      /**
       *
       * @param firstDomain
       * @param secondDomain
       * @param letterPosition
       * @return {number}
       */
      const compareCharacters = (firstDomain, secondDomain, letterPosition = 0) => {
        const first = firstDomain[letterPosition].toLowerCase()
        const second = secondDomain[letterPosition].toLowerCase()

        if (first === second) {
          return compareCharacters(firstDomain, secondDomain, letterPosition + 1)
        }

        if (first > second) {
          return 1
        }

        return -1
      }

      target.sort((firstDomain, secondDomain) => {
        let firstDomainName = firstDomain.domain
        let secondDomainName = secondDomain.domain

        if (firstDomain.domain.includes('www')) {
          firstDomainName = firstDomain.domain.replace('www.', '')
        }

        if (secondDomain.domain.includes('www')) {
          secondDomainName = secondDomain.domain.replace('www.', '')
        }

        return compareCharacters(firstDomainName, secondDomainName)
      })
    },
    /**
     * @return {Array}
     */
    async setReports (domains) {
      let reports = []

      for (let domain of domains) {
        let report = {}

        try {
          report = await this.$api.get(`domain/${domain.domain}/report/${this.language}`)
        } catch (e) {
          continue
        }

        Reflect.set(report, 'domain', domain.domain)
        Reflect.set(report, 'verified', domain.is_verified)

        reports.push(report)
      }

      return reports
    },
    /**
     * @return {void}
     */
    getVerifiedDomains () {
      this.verified = []

      for (let domain of this.domains) {
        if (!domain.is_verified) {
          continue
        }

        this.verified.push(domain)
      }

      this.sortByAlphabet(this.verified)
    },
    /**
     * @return {void}
     */
    getUnverifiedDomains () {
      this.unverified = []

      for (let domain of this.domains) {
        if (domain.is_verified) {
          continue
        }

        this.unverified.push(domain)
      }

      this.sortByAlphabet(this.unverified)
    }
  }
}
</script>
