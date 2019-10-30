<template>
  <section
    v-if="Object.keys(report).length"
    class="item__content"
    :class="[accordions.includes(`item__content__${reportKey}`) ? 'active' : '', `item__content__${reportKey}`]">
    <DomainListDoughnuts
      :report="report.report"
      :id="report.id.toString()" />
    <DomainListReports
      :id="reportKey.toString()"
      :report="report.report" />
  </section>
</template>

<script>
import DomainListDoughnuts from './DomainListDoughnuts'
import DomainListReports from './DomainListReports'
export default {
  name: 'ReportDetails',
  components: { DomainListReports, DomainListDoughnuts },
  props: {
    report: {
      type: Object
    },
    accordions: {
      type: Array
    },
    reportKey: {
      type: Number
    }
  }
}
</script>
