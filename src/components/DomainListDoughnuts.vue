<template>
  <div class="content__overview">
    <div
      class="itemoverview__testometercontainer"
      v-for="(details, key) in report"
      :key="key">
      <div
        id="testometer__scanner1"
        class="testometer">
        <Doughnut
          :score="details.score"
          :id="`${id}__content__${key}`"/>
        <span class="testometer__result">
            {{ details.score }}
          </span>
      </div>
      <h3>
        {{ details.scanner_name }}
      </h3>
    </div>
  </div>
</template>

<script>
import Doughnut from './Doughnut'
export default {
  name: 'DomainListDoughnuts',
  props: {
    id: {
      type: String
    },
    report: {
      type: Array
    }
  },
  components: { Doughnut }
}
</script>
