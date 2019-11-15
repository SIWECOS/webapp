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
import pipe from 'lodash/fp/pipe'
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
      let data = []

      for (let url in urls) {
        // Construct object keys
        data.push(pipe([
          this.addScannerTypes,
          this.addResultHeader
        ])(urls[url], url))

        /** let affectedInfo = this.getAffected(urls[url], url)

        // Add affected urls to the object
        for (let info of affectedInfo) {
          if (typeof data[info['type']][info['resultHeader']][info['detailsHeader']] !== 'undefined') {
            data[info['type']][info['resultHeader']][info['detailsHeader']].push(info['url'])

            continue
          }

          if (typeof data[info['type']][info['resultHeader']]['url'] !== 'undefined') {
            data[info['type']][info['resultHeader']]['url'].push(info[url])
          }
        } **/
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
     * @param report {{}}
     * @param url {String}
     */
    getAffected (reports, url) {
      let urls = []

      for (let report of reports.report) {
        for (let test of report.tests) {
          if (test.score_type === 'success' && test.score === 100 && test.has_error === false) {
            continue
          }

          urls.push({
            type: report.scanner_code,
            url,
            resultHeader: test.result,
            detailsHeader: test.result_details
          })
        }
      }

      return urls
    },
    /**
     * @param reports {Object}
     * @param url {String}
     * @return {{}}
     */
    addScannerTypes (reports, url) {
      const types = {}

      for (let report of reports.report) {
        if (Reflect.get(types, report.scanner_code)) {
          continue
        }

        Reflect.set(types, report.scanner_code, {})
        Reflect.set(types[report.scanner_code], 'report', report)
        Reflect.set(types[report.scanner_code]['report'], 'url', url)
      }

      return types
    },
    /**
     * @param types {{}}
     * @return {{}}
     */
    addResultHeader (types) {
      for (let type in types) {
        for (let test of types[type].report.tests) {
          if (!Reflect.get(types[type], test.result)) {
            Reflect.set(types[type], test.result, { urls: [] })
          }

          if (test.result_details) {
            Reflect.set(types[type][test.result], this.getResultDetailsKey(test.result_details), [])
          }
        }
      }

      return types
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
