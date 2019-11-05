<template>
  <div class="content__detail">
    <section
      :id="`${id}_${detail.scanner_name}`"
      class="detail__contentsection"
      v-for="(detail, scannerKey) in report.report"
      :key="scannerKey">
      <h4>{{ detail.scanner_name }} [{{ detail.scanner_code }}]</h4>
      <div
        class="contentsection__accordion"
        v-if="detail.tests.length === 0">
        <div class="accordion__item active">
          <span class="accordionitem__heading">
            <span class="testheading__title">
              <span
                class="testheading__icon"
                :class="getHeadingIcon({ has_error: true })">
              </span>
              <span>{{ detail.error_message }}</span>
            </span>
          </span>
        </div>
      </div>
      <div
        class="contentsection__accordion"
        v-if="detail.tests.length > 0">
        <div
          class="accordion__item active"
          v-for="(test, testKey) in detail.tests"
          :key="testKey">
          <button
            v-if="test.score_type !== 'hidden'"
            @click="toggle(`${scannerKey}${testKey}`)"
            class="accordionitem__heading">
            <span class="testheading__title">
              <span
                class="testheading__icon"
                :class="getHeadingIcon(test)">
              </span>
              <span v-html="test.headline"></span>
            </span>
            <span class="testheading__toggle">
              {{ shownTests[`${scannerKey}${testKey}`] ? $t('domains.hide_details') : $t('domains.show_details') }}
            </span>
          </button>
          <div
            v-if="test.score_type !== 'hidden'"
            class="accordionitem__content"
            :class="(shownTests[`${scannerKey}${testKey}`]) ? 'active' : ''">
            <p v-html="test.result"></p>
            <h5 v-if="test.has_error">{{ $t('common.error') }}</h5>
            <ul v-if="test.result_details">
              <li
                v-for="(detail, key) in test.result_details"
                v-html="detail"
                :key="key">
              </li>
            </ul>
            <div v-if="report[detail.scanner_code] && report[detail.scanner_code].length">
              <Urls
                :urls="report[detail.scanner_code]"
                :headline="test.headline" />
            </div>
          </div>
        </div>
      </div>
      <a
        class="jumplink"
        :href="`#${id}`">
        {{ $t('domains.jumplink') }}
      </a>
    </section>
  </div>
</template>

<script>
import Urls from './Urls'
export default {
  name: 'DomainListReports',
  components: { Urls },
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
  },
  methods: {
    /**
     *
     * @param key
     */
    toggle (key) {
      this.$set(this.shownTests, key, !this.shownTests[key])
    },
    getHeadingIcon (test) {
      if (test.has_error) {
        return 'testheading__icon--error'
      }

      if (test.score < 100) {
        return 'testheading__icon--warning'
      }

      return 'testheading__icon--success'
    }
  }
}
</script>
