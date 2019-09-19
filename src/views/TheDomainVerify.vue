<template>
  <div>
    <h3>{{ $t('verify.confirm_message') }} {{ domain }}</h3>
    <div
      id="wppb-domainverify-wrap"
      class="wppb-domain-forms">
      <p>
        <strong v-t="'verify.verification_process_title'"></strong>
      </p>
      <p
        v-for="(text, key) in $t('verify.verification_process')"
        :key="key">
        {{ text }}
      </p>
      <p>
        <strong v-t="'verify.meta_tag_title'"></strong>
      </p>
      <ul>
        <li>
          {{ $t('verify.meta_tag.item_one') }}
        </li>
        <li>
          {{ $t('verify.meta_tag.item_two') }}
        </li>
        <li>
          Meta Tag: <br> <strong> {{ meta }} </strong>
          <br>
          <button @click="clipboard(meta)">Copy</button>
        </li>
        <li>
          {{ $t('verify.meta_tag.item_three') }}
        </li>
        <li>
          {{ $t('verify.meta_tag.item_four') }}
        </li>
      </ul>
      <p>
        <strong v-t="'verify.file_title'"></strong>
      </p>
      <ul>
        <li>
          {{ $t('verify.file.item_one') }}
          <br>
          <button @click="download">Download</button>
        </li>
        <li>
          {{ $t('verify.file.item_two') }}
        </li>
        <li>
          {{ $t('verify.file.item_three') }}
        </li>
      </ul>
      <button
        @click="verify"
        class="btn btn-primary">
        Verify
      </button>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
export default {
  name: 'TheDomainVerify',
  data () {
    return {
      domain: '',
      data: {}
    }
  },
  computed: {
    /**
     * @return {string}
     */
    meta () {
      return `<meta name="siwecostoken" content="${this.data.verification_token || ''}" />`
    }
  },
  /**
   *
   * @param params
   * @param from
   * @param next
   */
  beforeRouteEnter ({ params }, from, next) {
    next(vue => {
      vue.domain = params.domain

      if (!vue.domain) return

      vue.$api.get(`domain/${vue.domain}`).then(data => {
        vue.data = data
      })
    })
  },
  methods: {
    /**
     * @return {void}
     */
    async verify () {
      try {
        await this.$api.create('domain/verify', { domain: this.domain })
      } catch (e) {
        // TODO:: Output error
      }
    },
    /**
     *
     * @param meta
     * @return {Promise<void>}
     */
    async clipboard (meta) {
      await navigator.clipboard.writeText(meta)
    },
    /**
     * @return {void}
     */
    download () {
      const file = new File(
        [this.data.verification_token],
        `${this.data.verification_token}.html`,
        { type: 'text/html;charset=utf-8' })

      saveAs(file)
    }
  }
}
</script>
