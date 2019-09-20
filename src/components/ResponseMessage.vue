<script>
import { validationTypes } from '../services/response-transformer'

export default {
  name: 'ResponseMessage',
  props: {
    code: {
      type: Number
    },
    namespace: {
      type: String
    },
    validation: {
      type: Object
    }
  },
  /**
   *
   * @param h
   */
  render (h) {
    const messages = []

    if (typeof this.validation !== 'undefined') {
      const types = validationTypes(this.validation)

      types.forEach(item => {
        messages.push(h('div', this.$t(`responses.inputs.${item.field}.${item.type}`)))
      })
    }

    return h(
      'p',
      {
        attrs:
          {
            class: 'wppb-error'
          }
      },
      [
        this.$t(`responses.${this.namespace}.${this.code}`),
        messages || ''
      ]
    )
  }
}
</script>
