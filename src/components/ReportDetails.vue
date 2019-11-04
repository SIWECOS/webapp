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
      // https://backupmonkey.io/: Object => report { score: 100, tests: [...], ... }
      // mx01.hosting.de: Object
      let reports = this.report.reports
      let reportsClone = { ...this.report.reports }
      let details = {}

      Reflect.deleteProperty(reportsClone, `https://${this.report.domain}/`)

      // This is the main domain
      let domainObject = reports[`https://${this.report.domain}/`]

      if (domainObject) {
        Reflect.set(details, 'report', domainObject.report)
      }

      for (let domain in reportsClone) {
        for (let report of reportsClone[domain].report) {
          if (!Reflect.get(details, report.scanner_code)) {
            Reflect.set(details, report.scanner_code, [])
          }

          for (let test of report.tests) {
            if (test.score === 100 && test.has_error === false) {
              continue
            }

            details[report.scanner_code].push({ domain, headline: test.headline })
          }
        }
      }

      return details
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
