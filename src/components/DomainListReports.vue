<template>
  <div class="content__detail">
    <section
      class="detail__contentsection"
      v-for="(detail, key) in report"
      :key="key">
      <h4>{{ detail.scanner_name }}</h4>
      <div class="contentsection__accordion">
        <div
          class="accordion__item active"
          v-for="(test, key) in detail.tests"
          :key="key">
          <button
            @click="toggle($event)"
            class="accordionitem__heading">
            <span class="heading__title">
              {{ test.headline }}
            </span>
            <span class="heading__toggle">
              {{ $t('domains.hide_details') }}
            </span>
          </button>
          <div class="accordionitem__content">
            <p> {{ test.result }} </p>
            <h5 v-if="test.has_error">Fehler</h5>
            <ul v-if="test.result_details">
              <li
                v-for="(detail, key) in test.result_details"
                :key="key">
                {{ detail }}
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
      show: false,
      accordions: []
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
     * @param event
     */
    toggle (event) {
      let element = event.target.nextElementSibling

      if (!event.target.classList.contains('accordionitem__heading')) {
        element = event.target.parentElement.nextElementSibling
      }

      element.classList.toggle('active')
    }
  }
}
</script>
