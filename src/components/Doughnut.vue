<template>
  <svg
    ref="doughnut"
    class="testometer__scanometer"
    viewBox="0 0 100 100">
    <g>
      <circle class="scanometer__base" cx="50" cy="50" r="46"
              style="stroke: rgb(150, 150, 150); opacity: 0.25;">
      </circle>
    </g>
    <g>
      <circle class="scanometer__value" cx="50" cy="50" r="46"
              style="stroke: rgb(255, 59, 48); stroke-dasharray: 289.067px; stroke-dashoffset: 222.581px;">
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
  methods: {
    /**
     * @return {void}
     */
    draw () {
      let doughnut = this.$refs.doughnut.querySelector('.scanometer__value')
      let doughnutLength = doughnut.getTotalLength()

      if (this.score < 50) {
        doughnut.style.stroke = 'red'
      }

      if (this.score >= 50 && this.score < 75) {
        doughnut.style.stroke = 'yellow'
      }

      if (this.score >= 75) {
        doughnut.style.stroke = 'green'
      }

      doughnut.style.strokeDasharray = doughnutLength
      doughnut.style.strokeDashoffset = (doughnutLength - doughnutLength * (this.score / 100)).toString()
    }
  }
}
</script>
