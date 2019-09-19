<template>
  <button
    @click="destroy(domain)"
    class="link link-error siteninformation__delete">
    {{ $t('domains.delete_domain') }}
  </button>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ButtonDomainDelete',
  props: {
    domain: String
  },
  methods: {
    ...mapActions('domains', ['fetch']),
    /**
     *
     * @param url
     * @return {Promise<void>}
     */
    async destroy (url) {
      await this.$api.delete('domain', '', { domain: url })
      await this.fetch()
    }
  }
}
</script>
