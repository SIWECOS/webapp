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
    const responseType = this.code === 200 ? 'wppb-success' : 'wppb-error'

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
            class: responseType
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
