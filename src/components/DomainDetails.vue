<template>
    <div class="domain-item-data">
        <span class="domain-address">{{ domain.domain }}</span>

        <router-link v-if="!domain.verificationStatus" :to="{ name: 'DomainVerify', params: { id: domain.id }}" class="btn btn-primary">{{ $t('messages.verifyDomain') }}</router-link></li>

        <div v-if="domain.verificationStatus">
            {{ domain }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'DomainDetails',
  data () {
    return {
    }
  },
  i18n: {
    messages: {
      de: {
        messages: {
          verifyDomain: 'Domain bestätigen'
        }
      }
    }
  },
  props: ['domain']
}
</script>