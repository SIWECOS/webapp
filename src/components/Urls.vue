<script>
export default {
  name: 'Urls',
  props: {
    urls: {
      type: Array
    },
    headline: {
      type: String
    }
  },
  render (h) {
    let header = this.getNames(h).length ? this.$t('common.urls') : ''

    return h('ul', [header, ...this.getNames(h)])
  },
  methods: {
    /**
     *
     * @param h
     * @return {[]}
     */
    getNames (h) {
      let names = []

      for (let url of this.urls) {
        if (url.headline === this.headline) {
          names.push(h('li', url.domain))
        }
      }

      return names
    }
  }
}
</script>

<style scoped>

</style>
