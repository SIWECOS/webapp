<template>
  <svg
    ref="doughnut"
    class="testometer__scanometer"
    viewBox="0 0 100 100">
    <g>
      <circle class="scanometer__base" cx="50" cy="50" r="46" stroke="#969696" opacity="0.25">
      </circle>
    </g>
    <g>
      <circle class="scanometer__value" cx="50" cy="50" r="46" :stroke-dasharray="`${parseInt(length)}`" :stroke-dashoffset="`${parseInt(offset)}`" :stroke="stroke">
      </circle>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Doughnut',
  mounted () {
    this.draw()
  },
  props: {
    score: {
      type: Number
    }
  },
  watch: {
    score () {
      this.draw()
    }
  },
  data () {
    return {
      length: 0,
      offset: 0,
      stroke: 'red'
    }
  },
  methods: {
    /**
     * @return {void}
     */
    draw () {
      let doughnut = this.$refs.doughnut.querySelector('.scanometer__value')
      let doughnutLength = doughnut.getTotalLength()

      if (this.score < 50) {
        this.stroke = 'red'
      }

      if (this.score >= 50 && this.score < 75) {
        this.stroke = 'yellow'
      }

      if (this.score >= 75) {
        this.stroke = 'green'
      }

      this.length = doughnutLength
      this.offset = (doughnutLength - doughnutLength * (this.score / 100)).toString()
    }
  }
}
</script>
