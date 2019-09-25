<template>
  <div class="itemhead__siteinformation">
    <h2
      v-if="report !== null"
      class="siteinformation__title">
      {{ domain.domain }}
    </h2>
    <span
      v-if="report !== null"
      class="siteinformation__date">
      {{ localeDate }}
    </span>
    <ButtonDomainDelete :domain="report.domain" />
  </div>
</template>

<script>
export default {
  name: 'BaseHead'
}
</script>
