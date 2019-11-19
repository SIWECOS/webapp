<template>

  <section
    v-if="Object.keys(report).length"
    class="item__content">

    <DomainListDoughnuts
      :scores="scores"
      :id="getReportId"/>

    <DomainListReports
      :id="getReportId"
      :report="getModifiedReportVersion"/>

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
    getModifiedReportVersion () {
      let urls = this.report.reports
      let finalReport = {}

      // Get access to the domains content
      for (let url in urls) {
        if (!urls.hasOwnProperty(url)) {
          continue
        }

        let reports = urls[url].report

        // Fetch all reports of the domain
        for (let report of reports) {
          let code = Reflect.get(finalReport, report.scanner_code)

          if (!code) {
            Reflect.set(finalReport, report.scanner_code, {
              scanner_code: report.scanner_code,
              scanner_name: report.scanner_name
            })
          }

          if (!report.tests.length && !Reflect.get(finalReport[report.scanner_code], report.error_message)) {
            Reflect.set(finalReport[report.scanner_code], report.error_message, { urls: [], score: -1 })
          }

          if (!report.tests.length) {
            finalReport[report.scanner_code][report.error_message]['urls'].push(url)

            continue
          }

          // Get all test results of this domain
          for (let test of report.tests) {
            let scanner = Reflect.get(finalReport, report.scanner_code)
            let headline = Reflect.get(scanner, test.headline)

            if (!headline) {
              Reflect.set(scanner, test.headline, { score: test.score })
            }

            if (this.isValid(test)) {
              Reflect.set(finalReport[report.scanner_code][test.headline], 'Es sind keine Fehler aufgetreten!', { score: 100 })

              continue
            }

            let result = Reflect.get(scanner[test.headline], test.result)

            if (!result && test.result) {
              Reflect.set(scanner[test.headline], test.result, { urls: [] })
            }

            if (scanner[test.headline].score > test.score) {
              scanner[test.headline].score = test.score
            }

            if (!test.result_details) {
              scanner[test.headline][test.result]['urls'].push(url)

              continue
            }

            let chainedDetails = this.getResultDetailsKey(test.result_details)
            let resultDetails = Reflect.get(scanner[test.headline][test.result], chainedDetails)

            if (!resultDetails && test.result_details) {
              Reflect.set(scanner[test.headline][test.result], chainedDetails, { urls: [] })
            }

            scanner[test.headline][test.result][chainedDetails]['urls'].push(url)
          }
        }
      }

      return finalReport
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
     * @param test {Boolean}
     * @return {Boolean}
     */
    isValid (test) {
      let state = false

      if (test.score_type === 'success' && test.score === 100 && test.has_error === false) {
        state = true
      }

      return state
    },
    /**
     * @param resultDetails {Array}
     * @return {String}
     */
    getResultDetailsKey (resultDetails) {
      let key = ''

      for (let item of resultDetails) {
        if (key) {
          key += '%20&'
        }

        key += item
      }

      return key
    }
  },
  props: {
    report: {
      type: Object
    }
  }
}
</script>
