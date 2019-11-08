<template>
  <div
    :id="id"
    class="content__overview">
    <div
      class="itemoverview__testometercontainer"
      v-for="(score, key) in scores"
      :key="key">
      <div class="testometer">
        <a :href="`#${id}_${score.name}`">
          <Doughnut
            :score="parseInt(score.score)"
            :id="`${id}__content__${key}`"/>
        </a>
        <span class="testometer__result">
          {{ parseInt(score.score) }}
        </span>
      </div>
      <h3>
        {{ score.name }}
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
    scores: {
      type: Array
    }
  },
  components: { Doughnut }
}
</script>
