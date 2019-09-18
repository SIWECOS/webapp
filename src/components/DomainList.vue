<template>
  <section id="domains-wrapper">
    <ul
      id="domains-scanners-list"
      class="scanners-results">
      <li
        v-for="(domain, key) in domains"
        :key="key"
        class="domain-results-item">
        <div class="domain-item-data">
          <span class="domain-address">{{ domain.url }}</span>
          <ul class="domain-item-actionlist">
            <li>
              <router-link
                class="btn btn-primary"
                :to="{ path: `/domain/verify/${domain.domain}`, params: { domain: domain.domain } }">
                Verify Domain
              </router-link>
            </li>
            <li>
              <button
                @click="destroy(domain.domain)"
                class="btn btn-danger">
                Delete domain
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'DomainList',
  props: {
    domains: {
      type: Array
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
