<template>
  <section
    v-if="Object.keys(report).length"
    class="item__content">
    <DomainListDoughnuts
      :report="report.report"
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
    }
  },
  props: {
    report: {
      type: Object
    }
  }
}
</script>
