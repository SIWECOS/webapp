<template>
  <div>
    <h3 v-t="'domains.headline_add'"></h3>
    <div
      id="wppb-domainadd-wrap"
      class="wppb-domain-forms">
      <ValidationObserver
        ref="domain"
        id="domainform"
        tag="form"
        @submit.prevent="add">
        <p class="login-username">
          <label for="domain">{{ $t('common.domain') }}</label>
          <br>
          <ValidationProvider
            tag="div"
            mode="passive"
            name="domain"
            rules="required|url"
            v-slot="{ errors }">
            <input
              type="text"
              v-model="domain"
              name="domain"
              id="domain"
              :placeholder="$t('domains.add_example')">
            <span v-if="errors[0]">{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p class="login-submit">
          <input
            name="wp-submit"
            id="wppb-submit"
            type="submit"
            class="btn btn-primary"
            :value="$t('common.add')">
          <br>
        </p>
        <ResponseMessage
          :validation="response.data"
          :code="response.code"
          :namespace="response.namespace"
          v-if="response.code !== null" />
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ResponseMessage from '../components/ResponseMessage'
export default {
  name: 'TheDomainsAdd',
  components: { ResponseMessage },
  data () {
    return {
      domain: '',
      response: {
        code: null,
        namespace: 'add_domain'
      }
    }
  },
  methods: {
    ...mapActions('domains', ['fetch']),
    async add () {
      const valid = await this.$refs.domain.validate()

      if (!valid) return

      try {
        await this.$api.create('domain', { domain: this.domain })

        await this.fetch()

        this.$router.push({ path: `/domain/verify/${this.domain}` })
      } catch (e) {
        if (Object.keys(e.data).length > 0) {
          this.response.data = e.data
        }

        this.response.code = e.status
      }
    }
  }
}
</script>
