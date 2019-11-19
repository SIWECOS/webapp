<template>

  <div>

    <button
      @click="toggle = !toggle"
      class="accordionitem__heading">

      <span class="testheading__title headline-toggle">

        <span
          class="testheading__icon"
          :class="getHeadingIcon(scanner[name][headline].score)">
        </span>

        <span v-html="headline"></span>

      </span>

      <span class="testheading__toggle">

        {{ showOrHideText }}

      </span>

    </button>

    <div v-if="toggle">

      <div
        class="accordionitem__content"
        :class="toggle ? 'active' : ''"
        v-for="(result, resultKey) in Object.keys(scanner[name][headline])"
        :key="resultKey">

        <div v-if="result === 'urls'">
          <p>Domains / URLs</p>

          <ul>
            <li
              v-for="(errorMsg, errorKey) in scanner[name][headline].urls"
              :key="errorKey">
              {{ errorMsg }}
            </li>
          </ul>
        </div>

        <div v-if="result !== 'score' && result !== 'urls'">

          <span v-html="result"></span>

          <div v-if="scanner[name][headline][result].urls && scanner[name][headline][result].urls">

            <p v-if="scanner[name][headline][result].urls.length">
              Domains / URLs
            </p>

            <ul>

              <li
                v-for="(resultUrl, resultUrlKey) in scanner[name][headline][result].urls"
                :key="resultUrlKey">
                {{ resultUrl }}
              </li>

            </ul>

            <div
              v-for="(resultDetails, resultDetailsKey) in Object.keys(scanner[name][headline][result])"
              :key="resultDetailsKey">

              <div v-if="resultDetails !== 'urls' && resultDetails !== 'information_link'">

                <p
                  v-for="(details, detailsKey) in resultDetails.split('%20&')"
                  :key="detailsKey"
                  v-html="details">
                </p>

                <p>
                  Domains / URLs
                </p>

                <ul>

                  <li
                    v-for="(resultDetailsUrl, resultDetailsUrlKey) in scanner[name][headline][result][resultDetails].urls"
                    :key="resultDetailsUrlKey"
                    v-html="resultDetailsUrl">
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'ScannerContentToggle',
  data () {
    return {
      toggle: false
    }
  },
  computed: {
    /**
     * @return {string}
     */
    showOrHideText () {
      return this.toggle ? this.$t('domains.hide_details') : this.$t('domains.show_details')
    }
  },
  methods: {
    /**
     *
     * @param score
     * @return {string}
     */
    getHeadingIcon (score) {
      if (score === -1) {
        return 'testheading__icon--error'
      }

      if (score < 100) {
        return 'testheading__icon--warning'
      }

      return 'testheading__icon--success'
    }
  },
  props: {
    scanner: {
      type: Object
    },
    name: {
      type: String
    },
    headline: {
      type: String
    }
  }
}
</script>
