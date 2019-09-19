<script>
export default {
  name: 'ToggleText',
  props: {
    listOfShowables: {
      type: Array
    },
    id: {
      type: String
    }
  },
  render (h) {
    const text = this.listOfShowables.includes(`heading__toggle__${this.id}__${this.key}`) === true
      ? this.$t('domains.hide_details')
      : this.$t('domains.show_details')

    return h('span', {
      attrs: {
        class: [`heading__toggle__${this.id}__${this.key}`, 'heading__toggle']
      } }, text)
  }
}
</script>
