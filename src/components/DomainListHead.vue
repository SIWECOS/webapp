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
    <Scan :domain="report.domain" />
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
import Scan from './Scan'
export default {
  name: 'DomainListHead',
  components: {
    Scan,
    DomainListHeadBase,
    Doughnut
  },
  data () {
    return {
      show: false
    }
  },
  props: {
    report: {
      type: Object
    },
    headId: {
      type: String
    }
  },
  methods: {
    reverseState () {
      this.show = !this.show

      this.$emit('toggle', { target: `item__content__${this.headId}`, active: this.show })
    }
  }
}
</script>
