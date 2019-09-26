<template>
  <ul class="scanresults">
    <li
      class="item"
      v-for="(domain, key) in domains"
      :key="key">
      <div class="item__wrapper">
        <DomainListHead
          v-on:toggle="toggle"
          :headId="key.toString()"
          :domain="domain"
          :report="reports.length && reports[key] ? reports[key] : {}"/>
        <section
          v-if="reports.length && reports[key]"
          class="item__content"
          :class="[accordions.includes(`item__content__${key}`) ? 'active' : '', `item__content__${key}`]">
          <DomainListDoughnuts
            :report="reports[key].report"
            :id="reports[key].id.toString()" />
          <DomainListReports
            :id="key.toString()"
            :report="reports[key].report" />
        </section>
      </div>
    </li>
  </ul>
</template>

<script>
import DomainListHead from './DomainListHead'
import DomainListDoughnuts from './DomainListDoughnuts'
import DomainListReports from './DomainListReports'
export default {
  name: 'VerifiedDomains',
  data () {
    return {
      accordions: []
    }
  },
  methods: {
    /**
     *
     * @param state
     */
    toggle (state) {
      if (this.accordions.includes(state.target) && !state.active) {
        this.accordions = this.accordions.filter(accordion => accordion !== state.target)
        return
      }

      this.accordions.push(state.target)
    }
  },
  components: { DomainListReports, DomainListDoughnuts, DomainListHead },
  props: {
    domains: {
      type: Array
    },
    reports: {
      type: Array
    }
  }
}
</script>
