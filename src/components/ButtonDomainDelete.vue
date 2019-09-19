<template>
  <button
    @click="destroy(report.domain)"
    class="link link-error siteninformation__delete">
    Delete domain
  </button>
</template>

<script>
export default {
  name: 'ButtonDomainDelete',
  props: {
    domain: String
  },
  methods: {
    /**
     *
     * @param url
     * @return {Promise<void>}
     */
    async destroy (url) {
      await this.$api.delete('domain', '', { domain: url })
      // TODO:: REFRESH HERE
    }
  }
}
</script>
