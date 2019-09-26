<template>
  <div>
    <UnverifiedDomains :domains="unverified" />
    <VerifiedDomains
      :domains="verified"
      :reports="getReports"/>
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
    sortByAlphabet (target) {
      const alphabet = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ]

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

        if (alphabet.indexOf(first) === alphabet.indexOf(second)) {
          compareCharacters(firstDomain, secondDomain, letterPosition + 1)
        }

        if (alphabet.indexOf(first) > alphabet.indexOf(second)) {
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

      this.sortByAlphabet(this.unverified)
      this.sortByAlphabet(this.verified)
    }
  }
}
</script>
