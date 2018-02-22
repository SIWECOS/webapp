<template>
    <div class="domain-item-data">
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

        <div class="impact-gauge gaugeMeter" :data-percent="result.score" data-size="100" data-width="20" data-style="Arch" data-theme="Red-Gold-Green" data-animate_gauge_colors="1" style="width: 100px;" v-if="result">
            <span style="line-height: 100px; font-size: 22px;">{{ result.score }}</span>
            <canvas width="100" height="100"></canvas>
        </div>

        <div class="last-scan-data" v-if="result"><span>{{ $t('messages.lastScan') }}<br> {{ result.scanFinished }}</span></div>

        <div class="scanners-wrapper" v-if="result && showDetails">
            <div class="scanner-content" v-for="(scanner) in result.scanners">
                <div class="scanner-item-data">
                    <span class="scanner-data">{{ scanner.scanner_type }}</span>
                    <small><a :href="'https://www.siwecos.de/wiki/' + scanner.scanner_type" title="Mehr Informationen" target="_blank">Mehr Informationen &gt;&gt;</a></small>
                    <br><span><small>{{ $t('messages.lastScan') }}: {{ scanner.updated_at }}</small></span><p></p>

                    <div class="scanner-check-wrapper">
                        <div class="scanner-check-content" v-for="(scanresult) in scanner.result">
                            <div class="scanner-check-item-data">
                                <span class="round-check">{{ scanresult.score }}</span>
                                <span class="scanner-check-data">{{ scanresult.name}}</span>

                                <small><a :href="'https://www.siwecos.de/wiki/' + scanresult.name" title="Mehr Informationen" target="_blank">Mehr Informationen &gt;&gt;</a></small>

                                <ul class="scanner-check-item-details" v-if="scanresult.testDetails">
                                    <li v-for="(detail) in scanresult.testDetails">{{ detail }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="impact-gauge gaugeMeter" :data-percent="scanner.score" data-size="75" data-width="14" data-style="Full" data-theme="Red-Gold-Green" data-animate_gauge_colors="1" style="width: 75px;">
                        <span style="line-height: 75px; font-size: 16.5px;">{{ scanner.score }}</span><canvas width="75" height="75"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <span v-if="msg">{{ $t('messages.' + msg) }}</span>
    </div>
</template>

<script>
import api from '../services/api.js'

export default {
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
    api.$http.get(api.urls.scan_results + '?domain=' + encodeURI(this.domain.domain)).then((data) => {
      this.result = data.data
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
          showResults: 'Zeige Ergebnisse'
        }
      }
    }
  },
  props: ['domain']
}
</script>