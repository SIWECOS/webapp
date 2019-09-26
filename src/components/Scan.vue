<template>
  <button
    :disabled="isDisabled"
    @click="scan"
    class="success itemhead__scantoggler">
    {{ $t('common.scan_start') }}
  </button>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'Scan',
  data () {
    return {
      isDisabled: false
    }
  },
  props: {
    domain: String
  },
  methods: {
    ...mapActions('domains', ['fetch']),
    ...mapMutations('domains', ['setScanId']),
    async scan () {
      let response

      try {
        response = await this.$api.create(`scan`, { domain: this.domain })

        this.isDisabled = true
        this.checkScanStatus(response.scan_id, 'running')
        this.isDisabled = false
      } catch (e) {
        this.isDisabled = false
      }
    },
    /**
     *
     * @param id
     * @param progress
     * @return {Promise<*>}
     */
    async checkScanStatus (id, progress) {
      if (progress === 'finished') {
        this.fetch()
        this.setScanId({ domain: this.domain, scanId: id })
        return
      }

      let { status } = await this.$api.create(`scan/${id}`)

      setTimeout(() => this.checkScanStatus(id, status), 2000)
    }
  }
}
</script>
