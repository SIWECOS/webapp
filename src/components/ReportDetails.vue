<template>
  <section
    v-if="Object.keys(report).length"
    class="item__content"
    :class="[accordions.includes(`item__content__${getReportId}`) ? 'active' : '', `item__content__${getReportId}`]">
    <DomainListDoughnuts
      :scores="scores"
      :id="getReportId" />
    <DomainListReports
      :id="getReportId"
      :report="report.report" />
  </section>
</template>

<script>
import DomainListDoughnuts from './DomainListDoughnuts'
import DomainListReports from './DomainListReports'
export default {
  name: 'ReportDetails',
  components: { DomainListReports, DomainListDoughnuts },
  computed: {
    getReportId () {
      return this.report.id.toString()
    },
    scores () {
      let scores = []

      Object
        .keys(this.report.scanner_scores)
        .forEach(name => scores.push({ name, score: this.report.scanner_scores[name] }))

      return scores
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
