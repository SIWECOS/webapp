<template>
  <section class="item__head">
    <DomainListHeadBase :report="report"/>
    <div
      id="testometer__general"
      class="testometer itemhead__testometer">
      <Doughnut
        :score="report.score"
        :id="report.id.toString()" />
      <span class="testometer__result"> {{ report.score }} </span>
    </div>
    <button
      class="success itemhead__scantoggler">
      Scan start
    </button>
    <a class="itemhead__infolink" href="#">
      More about the SIWECOS score
    </a>
    <button
      @click="reverseState"
      class="itemhead__contenttoggler">
      Show details
    </button>
  </section>
</template>

<script>
import Doughnut from './Doughnut'
import DomainListHeadBase from './DomainListHeadBase'
export default {
  name: 'DomainListHead',
  components: { DomainListHeadBase, Doughnut },
  data () {
    return {
      showDetails: false
    }
  },
  props: {
    report: {
      type: Object
    }
  },
  methods: {
    reverseState () {
      this.showDetails = !this.showDetails

      this.$emit('toggle', this.showDetails)
    }
  }
}
</script>
