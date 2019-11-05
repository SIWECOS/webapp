<template>
  <section
    v-if="Object.keys(report).length"
    class="item__content">
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

      // Set main report
      if (urls[url]) {
        Reflect.set(data, 'report', urls[url].report)
      }

      // Set main scanner codes
      this.fetchReport(urls[url].report, item => {
        if (!Reflect.get(data, item.scanner_code)) {
          Reflect.set(data, item.scanner_code, [])
        }
      })

      // Fetch URL keys
      for (let reportUrl in urls) {
        // Skip main domain as it gets print out anyway
        if (reportUrl === url) {
          continue
        }

        this.fetchReport(urls[reportUrl].report, item => {
          if (!Reflect.get(data, item.scanner_code)) {
            Reflect.set(data, item.scanner_code, [])

            data.report.push(item)
          }

          // In this case it is probably a mail server scanner which has been included as an report item before
          if (!Reflect.get(data, item.scanner_code)) {
            throw new Error('Scanner not found')
          }

          data[item.scanner_code].push(...this.getAffectedUrls(item.tests, reportUrl))
        })
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
     * @param report {Array}
     * @param callback {Function}
     * @return void
     */
    fetchReport (report, callback) {
      for (let data of report) {
        try {
          callback(data)
        } catch (e) {
          continue
        }
      }
    },
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
    }
  }
}
</script>
