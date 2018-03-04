<template>
    <div class="domain-item-data" :class="domainClass" >
        <span class="domain-address">{{ domain.domain }}</span>

        <ul class="domain-item-actionlist">
            <li v-if="!domain.verificationStatus">
                <router-link :to="{ name: 'DomainVerify', params: { id: domain.id }}" class="btn btn-primary">{{ $t('messages.verifyDomain') }}</router-link>
            </li>
            <li v-if="domain.verificationStatus">
                <button class="btn btn-primary" v-on:click="scanStart" :disabled="scanStarted">{{ $t('messages.startScan') }}</button>
            </li>
            <li v-if="result">
                <button class="btn btn-primary" v-on:click="showDetails = (showDetails) ? 0 : 1">{{ $t('messages.showResults') }}</button>
            </li>
        </ul>
        <div style="padding-bottom: 25px;" class="clear: both"></div>


        <div class="scanners-wrapper" v-show="result && showDetails">
          <h3>Gesamtergebnis</h3>
          <div class="impact-gauge gaugeMeter" :data-percent="result.weightedMedia.toFixed(0)" data-size="100" data-width="20" data-style="Arch" data-theme="Red-Gold-Green" data-animate_gauge_colors="1" style="width: 100px;" v-if="result">

          </div>

          <div class="last-scan-data" v-if="result.scanFinished"><span>{{ $t('messages.lastScan') }}<br> {{ result.scanFinished.date }}</span></div>
            <div class="scanner-content" v-for="(scanner) in result.scanners">
                <scanner-details v-bind:scanner="scanner"></scanner-details>
            </div>
        </div>

        <span v-show="msg">{{ $t('messages.' + msg) }}</span>
    </div>
</template>

<script>
import api from '../services/api.js'
import ScannerDetails from './ScannerDetails'

export default {
  components: {ScannerDetails},
  name: 'DomainDetails',
  data () {
    return {
      'msg': false,
      'scanStarted': false,
      'result': false,
      'showDetails': false
    }
  },
  methods: {
    scanStart: function () {
      api.$http.post(api.urls.scan_start, {domain: this.domain.domain, dangerLevel: 10}).then((data) => {
        this.msg = 'start_success'
        this.scanStarted = true

        setTimeout(function () {
          this.msg = false
        }.bind(this), 5000)
      }).catch(() => {
        this.msg = 'start_error'

        setTimeout(function () {
          this.msg = false
        }.bind(this), 5000)
      })
    }
  },
  created: function () {
    if (!this.domain.verificationStatus) {
      return
    }

    api.$http.get(api.urls.scan_results + '?domain=' + encodeURI(this.domain.domain)).then((data) => {
      this.result = data.data

      // Trigger gauge
      setTimeout(function () {
        if (window.jQuery && window.jQuery('.domain-id-' + this.domain.id + ' .gaugeMeter') && typeof window.jQuery('.domain-id-' + this.domain.id + ' .gaugeMeter').gaugeMeter !== 'undefined') {
          window.jQuery('.domain-id-' + this.domain.id + ' .gaugeMeter').gaugeMeter()
        }
      }.bind(this), 500)
    }).catch(() => {
      this.msg = 'fetch_error'
    })
  },
  i18n: {
    messages: {
      de: {
        messages: {
          verifyDomain: 'Domain bestätigen',
          startScan: 'Neuen Scan starten',
          fetch_error: 'Fehler beim Abruf der Scan-Ergebnisse, bitte versuchen Sie es später erneut',
          start_error: 'Fehler beim Starten des Scans, bitte versuchen Sie es später erneut',
          start_success: 'Scan erfolgreich gestartet, die Ergebnisse stehen in einigen Minuten zur Verfügung',
          lastScan: 'Letzter Scan',
          showResults: 'Zeige Ergebnisse',
          more_info: 'Mehr Informationen'
        }
      }
    }
  },
  computed: {
    'domainClass': function () {
      return 'domain-id-' + this.domain.id
    }
  },
  props: ['domain']
}
</script>
