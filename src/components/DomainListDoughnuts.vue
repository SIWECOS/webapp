<template>
  <div
    :id="id"
    class="content__overview">
    <div
      class="itemoverview__testometercontainer"
      v-for="(score, key) in scanner"
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
  data () {
    return {
      scanner: []
    }
  },
  mounted () {
    this.scanner = this.scores

    this.scanner.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }

      return 0
    })
  },
  watch: {
    scores: {
      handler: function (value) {
        console.log(value)
      },
      deep: true
    }
  },
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
