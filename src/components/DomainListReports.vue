<template>

  <div class="content__detail">

    <headlines
      :scanner="report"
      :id="id" />

    <a
      class="scanner-jumplink"
      :href="`#${id}`">
      {{ $t('domains.jumplink') }}
    </a>

  </div>

</template>

<script>
import Headlines from './Headlines'
export default {
  name: 'DomainListReports',
  components: { Headlines },
  data () {
    return {
      accordions: [],
      shownTests: {}
    }
  },
  props: {
    report: {
      type: Object
    },
    id: {
      type: String
    }
  }
}
</script>
