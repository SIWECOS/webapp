<template>
  <section
    v-if="Object.keys(report).length"
    class="item__content"
    :class="[accordions.includes(`item__content__${getReportId}`) ? 'active' : '', `item__content__${getReportId}`]">
    <DomainListDoughnuts
      :scores="scores"
      :id="getReportId"/>
    <DomainListReports
      :id="getReportId"
      :report="getReport"/>
  </section>
</template>

<script>
import DomainListDoughnuts from './DomainListDoughnuts'
import DomainListReports from './DomainListReports'
export default {
  name: 'ReportDetails',
  components: { DomainListReports, DomainListDoughnuts },
  computed: {
    /**
     * @return {string}
     */
    getReportId () {
      return this.report.id.toString()
    },
    /**
     * @return {{}}
     */
    getReport () {
      let urls = this.report.reports
      let url = this.getUrl(urls, this.report.domain)
      let data = {}

      if (urls[url]) {
        Reflect.set(data, 'report', urls[url].report)
      }

      // Fetch URL keys
      for (let reportUrl in urls) {
        // Skip main domain as it gets print out anyway
        if (reportUrl === url) {
          continue
        }

        // Special handling for mail servers as those use other scanners
        if (reportUrl.includes('mx')) {
          Reflect.set(data, 'mail', this.getMailReport())

          continue
        }

        // Fetch affected urls for each scanner, which have not a score of 100
        for (let report of urls[reportUrl].report) {
          if (!Reflect.get(data, report.scanner_code)) {
            Reflect.set(data, report.scanner_code, [])
          }

          data[report.scanner_code].push(...this.getAffectedUrls(report.tests, reportUrl))
        }
      }

      return data
    },
    /**
     *
     * @return {[]|Array}
     */
    scores () {
      let scores = []

      Object
        .keys(this.report.scanner_scores)
        .forEach(name => scores.push({ name, score: this.report.scanner_scores[name] }))

      return scores || []
    }
  },
  methods: {
    /**
     * Affected urls are those, who have unsatisfying scores.
     *
     * @param tests
     * @param domain
     *
     * @return {{}}
     */
    getAffectedUrls (tests, domain) {
      let urls = []

      for (let test of tests) {
        if (test.score === 100 && test.has_error === false) {
          continue
        }

        urls.push({ domain, headline: test.headline })
      }

      return urls
    },
    /**
     * @return {{}}
     */
    getMailReport () {
      return {}
    },
    /**
     *
     * @param urls
     * @param domain
     * @return {string}
     */
    getUrl (urls, domain) {
      for (let url in urls) {
        if (!url.includes(domain)) {
          continue
        }

        let usesHttps = url.includes('https')
        let protocol = usesHttps ? 'https://' : 'http://'
        let domainUrl = `${protocol}${domain}`

        return usesHttps ? `${domainUrl}/` : domainUrl
      }
    }
  },
  props: {
    report: {
      type: Object
    },
    accordions: {
      type: Array
    }
  }
}
</script>
