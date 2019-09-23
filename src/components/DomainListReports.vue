<template>
  <div class="content__detail">
    <section
      class="detail__contentsection"
      v-for="(detail, scannerKey) in report"
      :key="scannerKey">
      <h4>{{ detail.scanner_name }}</h4>
      <div class="contentsection__accordion">
        <div
          class="accordion__item active"
          v-for="(test, testKey) in detail.tests"
          :key="testKey">
          <button
            @click="toggle(`${scannerKey}${testKey}`)"
            class="accordionitem__heading">
            <span class="heading__title">
              {{ test.headline }}
            </span>
            <span class="heading__toggle">
              {{ shownTests[`${scannerKey}${testKey}`] ? $t('domains.hide_details') : $t('domains.show_details') }}
            </span>
          </button>
          <div
            class="accordionitem__content"
            :class="(shownTests[`${scannerKey}${testKey}`]) ? 'active' : ''">
            <p v-html="test.result"></p>
            <h5 v-if="test.has_error">Fehler</h5>
            <ul v-if="test.result_details">
              <li
                v-html="detail"
                v-for="(detail, key) in test.result_details"
                :key="key">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DomainListReports',
  data () {
    return {
      accordions: [],
      shownTests: {}
    }
  },
  props: {
    report: {
      type: Array
    },
    id: {
      type: String
    }
  },
  methods: {
    /**
     *
     * @param key
     */
    toggle (key) {
      this.$set(this.shownTests, key, !this.shownTests[key])
    }
  }
}
</script>
