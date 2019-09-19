<template>
  <section class="item__head">
    <div class="itemhead__siteinformation">
      <h2 class="siteinformation__title">
        {{ domain.domain }}
      </h2>
      <ButtonDomainDelete :domain="domain.domain" />
    </div>
    <router-link
      v-if="!domain.is_verified"
      class="btn btn-primary"
      :to="{ path: `/domain/verify/${domain.domain}`, params: { domain: domain.domain } }">
      Verify Domain
    </router-link>
    <a class="itemhead__infolink" href="#">
      More about the SIWECOS score
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
      type: Object
    }
  }
}
</script>
