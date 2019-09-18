<template>
  <div>
    <ul
      class="scanresults"
      v-if="reports.length">
      <li
        class="item"
        v-for="(report, key) in reports"
        :key="key">
        <DomainListHead
          v-on:toggle="setVisibility"
          :report="report"/>
        <div class="item__wrapper">
          <section
            v-for="(details, key) in report.report"
            :key="key"
            class="item__content"
            v-if="showDetails">
            <DomainListDoughnuts
              :details="details"
              :itemKey="key.toString()"
              :id="report.id.toString()"/>
            <div class="content__detail">
              <section class="detail__contentsection">
                <h4>Sectionheading</h4>
                <div class="contentsection__accordion">
                  <div class="accordion__item">
                    <span class="accordionitem__heading"> Accordion-Item Heading </span>
                    <div class="accordionitem__content">
                      <p>Die Content-Security-Policy ist eine strukturierte Vorgehensweise, welche das Injizieren und Ausführen von evtl. bösartigen Befehlen in einer Webanwendung (Injection-Angriffe) mildern soll. Es stellt über eine Whitelist dar, von welchen Quellen z. B. Javascript, Bilder, Schriftarten und andere Inhalte auf Ihrer Seite eingebunden werden dürfen.</p>
                      <h5>Fehler</h5>
                      <p>Here might be bad Mistake</p>
                      <h5>URLs</h5>
                      <ul>
                        <li>Url.de</li>
                        <li>Url.de</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DomainListHead from './DomainListHead'
import DomainListDoughnuts from './DomainListDoughnuts'
export default {
  name: 'DomainList',
  components: { DomainListDoughnuts, DomainListHead },
  data () {
    return {
      reports: [],
      showDetails: false
    }
  },
  mounted () {
    this.domains.forEach(item => {
      this.$api.get(`domain/${item.domain}/report/en`).then(report => {
        Reflect.set(report, 'domain', item.domain)
        Reflect.set(report, 'verified', item.is_verified)

        this.reports.push(report)
      })
    })
  },
  props: {
    domains: {
      type: Array
    }
  },
  methods: {
    /**
     *
     * @param url
     * @return {Promise<void>}
     */
    destroy (url) {
      this.$emit('refresh')
    },
    /**
     *
     * @param state
     */
    setVisibility (state) {
      this.showDetails = state
    }
  }
}
</script>
