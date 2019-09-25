<template>
  <div>
    <ul class="scanresults">
      <li
        class="item"
        v-for="(domain, key) in domains"
        :key="key">
        <DomainListHeadVerify
          v-if="!domain.is_verified"
          :domain="domain.domain" />
        <div
          v-else
          class="item__wrapper">
          <DomainListHead
            v-on:toggle="setVisibility"
            :headId="key.toString()"
            :domain="domain"
            :report="reports[key] ? reports[key] : {}"/>
          <section
            v-if="reports[key]"
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
  </div>
</template>

<script>
import DomainListHead from './DomainListHead'
import DomainListHeadVerify from './DomainListHeadVerify'
import DomainListReports from './DomainListReports'
import DomainListDoughnuts from './DomainListDoughnuts'
import { mapGetters } from 'vuex'
export default {
  name: 'DomainList',
  components: {
    DomainListDoughnuts,
    DomainListReports,
    DomainListHeadVerify,
    DomainListHead
  },
  data () {
    return {
      reports: [],
      accordions: []
    }
  },
  mounted () {
    this.getReports()
  },
  watch: {
    domains () {
      this.getReports()
    }
  },
  props: {
    domains: {
      type: Array
    }
  },
  computed: {
    ...mapGetters('language', ['language'])
  },
  methods: {
    /**
     * @return {void}
     */
    async getReports () {
      this.reports = []

      for (let domain of this.domains) {
        if (!domain.is_verified) {
          continue
        }

        const report = await this.$api.get(`domain/${domain.domain}/report/${this.language}`)

        Reflect.set(report, 'domain', domain.domain)
        Reflect.set(report, 'verified', domain.is_verified)

        this.reports.push(report)
      }
    },
    /**
     *
     * @param state
     */
    setVisibility (state) {
      if (this.accordions.includes(state.target) && !state.active) {
        this.accordions = this.accordions.filter(accordion => accordion !== state.target)
        return
      }

      this.accordions.push(state.target)
    }
  }
}
</script>
