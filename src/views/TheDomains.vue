<template>
  <div>
    <h3>{{ $t('domains.headline') }}</h3>
    <router-link
      tag="button"
      :to="{ path: '/domain/add' }">
      {{ $t('domains.add') }}
    </router-link>
    <section id="domains-wrapper">
      <p v-if="!domains.length">{{ $t('domains.none_available') }}</p>
      <DomainList
        :domains="domains"
        v-else />
    </section>
    <router-link
      tag="button"
      :to="{ path: '/domain/add' }">
      {{ $t('domains.add') }}
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DomainList from '../components/DomainList'
export default {
  name: 'TheDomains',
  components: { DomainList },
  mounted () {
    this.clearDomains()
    this.fetch()
  },
  computed: {
    ...mapGetters('domains', ['domains'])
  },
  methods: {
    ...mapActions('domains', ['fetch']),
    ...mapMutations('domains', ['clearDomains'])
  }
}
</script>
