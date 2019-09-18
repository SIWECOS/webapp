<template>
  <section class="item__head">
    <div class="itemhead__siteinformation">
      <h2 class="siteinformation__title">{{ report.domain }}</h2>
      <span class="siteinformation__date">{{ report.finished_at }}</span>
      <button
        @click="destroy(report.domain)"
        class="link link-error siteninformation__delete">
        Delete domain
      </button>
    </div>
    <div
      v-if="report.verified"
      id="testometer__general"
      class="testometer itemhead__testometer">
      <Doughnut
        :score="report.score"
        :id="report.id.toString()" />
      <span class="testometer__result"> {{ report.score }} </span>
    </div>
    <router-link
      v-if="!report.verified"
      class="btn btn-primary"
      :to="{ path: `/domain/verify/${report.domain}`, params: { domain: report.domain } }">
      Verify Domain
    </router-link>
    <button
      v-if="report.verified"
      class="success itemhead__scantoggler">
      Scan start
    </button>
    <a class="itemhead__infolink" href="#">
      More about the SIWECOS score
    </a>
    <button
      @click="$emit('toggle', !showDetails)"
      class="itemhead__contenttoggler">
      Show details
    </button>
  </section>
</template>

<script>
import Doughnut from './Doughnut'
export default {
  name: 'DomainListHead',
  components: { Doughnut },
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
    /**
     *
     * @param url
     * @return {Promise<void>}
     */
    async destroy (url) {
      await this.$api.delete('domain', '', { domain: url })

      this.$emit('refresh')
    }
  }
}
</script>
