<template>
  <div class="content__detail">
    <section
      :id="`${id}_${detail.scanner_code}`"
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
            <div v-if="report[detail.scanner_code] && Object.keys(report[detail.scanner_code]).length">
              <div
                v-for="(header, headerKey) in Object.keys(report[detail.scanner_code])"
                :key="headerKey"
                v-if="header === test.result">
                <div v-html="header"></div>
                <div
                  v-for="(subHeader, subHeaderKey) in Object.keys(report[detail.scanner_code][header])"
                  :key="subHeaderKey">
                  <ul>
                    <li
                      v-for="(subHeaderItem, subbHeaderItemKey) in subHeader.split('%20&')"
                      :key="subbHeaderItemKey"
                      v-html="subHeaderItem">
                    </li>
                  </ul>
                  <div
                    v-for="(testUrls, testUrlsKey) in report[detail.scanner_code][header][subHeader]"
                    :key="testUrlsKey">
                    <div v-html="testUrls"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        class="scanner-jumplink"
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
    // Test.header in getTestHeader? Dann render da
    getTestHeader () {},
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
