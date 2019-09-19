<template>
  <button
    :disabled="isDisabled"
    @click="scan"
    class="success itemhead__scantoggler">
    Scan start
  </button>
</template>

<script>
import { mapActions } from 'vuex'
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
    async scan () {
      try {
        const response = await this.$api.create(`scan`, { domain: this.domain })

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
        return
      }

      let { status } = await this.$api.create(`scan/${id}`)

      setTimeout(() => this.checkScanStatus(id, status), 2000)
    }
  }
}
</script>
