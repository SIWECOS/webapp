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
    <Scan
      v-on:refresh="$emit('refresh')"
      :domain="report.domain" />
    <a class="itemhead__infolink" href="#">
      {{ $t('domains.more_about') }}
    </a>
    <button
      @click="reverseState"
      class="itemhead__contenttoggler">
      {{ show === true ? $t('domains.hide_details') : $t('domains.show_details') }}
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
