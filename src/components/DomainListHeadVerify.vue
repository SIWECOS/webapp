<template>
  <section class="item__head">
    <div class="itemhead__siteinformation">
      <h2 class="siteinformation__title">
        {{ domain }}
      </h2>
      <ButtonDomainDelete :domain="domain" />
    </div>
    <router-link
      v-if="!domain.is_verified"
      class="btn btn-primary"
      :to="{ path: `/domain/verify/${domain}`, params: { domain } }">
      {{ $t('domains.verify_domain') }}
    </router-link>
    <a
      class="itemhead__infolink"
      href="https://siwecos.de/support/gesamtscore">
      {{ $t('domains.more_about') }}
    </a>
  </section>
</template>

<script>
import ButtonDomainDelete from './ButtonDomainDelete'
export default {
  name: 'DomainListHeadVerify',
  components: { ButtonDomainDelete },
  props: {
    domain: {
      type: String
    }
  }
}
</script>
