<template>
    <div class="domain-item-data" :class="domainClass" >
        <span class="domain-address" v-on:click="showDetails = (showDetails) ? 0 : 1">{{ domain.domain }}</span>

        <ul class="domain-item-actionlist">
            <li v-if="!domain.verificationStatus">
                <router-link :to="{ name: 'DomainVerify', params: { id: domain.id }}" class="btn btn-primary" :disabled="deleteStarted">{{ $t('messages.verifyDomain') }}</router-link>
            </li>
            <li v-if="domain.verificationStatus">
                <button class="btn btn-primary" v-on:click="scanStart" :disabled="scanStarted || deleteStarted">{{ (scanStarted) ? $t('messages.startedScan') : $t('messages.startScan') }}</button>
            </li>
            <li v-if="domain.verificationStatus">
                <button class="btn btn-primary" v-on:click="showDetails = (showDetails) ? 0 : 1" :disabled="!result">{{ $t('messages.showResults') }}</button>
            </li>
            <li>
                <button class="btn btn-danger" v-on:click="deleteDomain" :disabled="deleteStarted">{{ $t('messages.deleteDomain') }}</button>
            </li>
        </ul>
        <div style="padding-bottom: 25px;" class="clear: both"></div>


        <div v-show="result">
            <div class="impact-gauge gaugeMeter" :data-percent="result.weightedMedia.toFixed(0)" data-size="100" data-width="20" data-style="Arch" data-theme="Red-Gold-Green" data-animate_gauge_colors="1" style="width: 100px;" v-if="result">
            </div>
            <a href="/gesamtscore/" target="_blank" class="scanner-score-information">Informationen</a>

            <div class="last-scan-data" v-if="result.scanFinished"><span>{{ result.scanFinished.humanDate }}</span></div>
        </div>

        <div class="scanners-wrapper" v-show="result && showDetails">
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
import moment from 'moment'

export default {
  components: {ScannerDetails},
  name: 'DomainDetails',
  data () {
    return {
      'msg': false,
      'scanStarted': false,
      'result': false,
      'showDetails': false,
      'deleteStarted': false,
      'fetchInterval': false,
      'scanId': false,
      'hasGauge': false
    }
  },
  methods: {
    scanStart: function () {
      this.scanStarted = true
      this.msg = 'start_success'

      api.$http.post(api.urls.scan_start, {domain: this.domain.domain, dangerLevel: 10}).then((response) => {
        this.scanId = response.data.id

        this.fetchInterval = setInterval(this.getScanStatus, 3000)

        setTimeout(function () {
          this.msg = false
        }.bind(this), 5000)
      }).catch((error) => {
        if (error.response.status === 452) {
          this.msg = 'insufficent_token'
          return
        }

        this.scanStarted = false
        this.msg = 'start_error'

        setTimeout(function () {
          this.msg = false
        }.bind(this), 5000)
      })
    },
    getScanStatus: function () {
      api.$http.get(api.urls.status_url + '/' + this.scanId).then((response) => {
        if (response.data.status === 3) {
          clearInterval(this.fetchInterval)
          this.fetchInterval = false
          this.scanStarted = false

          this.fetchResult()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteDomain: function () {
      if (!confirm(this.$t('messages.confirm_domain_delete'))) {
        return false
      }

      this.deleteStarted = true

      api.$http.post(api.urls.domain_delete, {domain: this.domain.domain}).then((data) => {
        console.log(data)
        this.$emit('delete-domain')
      }).catch(() => {
        this.msg = 'delete_error'
        this.deleteStarted = false

        setTimeout(function () {
          this.msg = false
        }.bind(this), 5000)
      })
    },
    fetchResult: function () {
      api.$http.get(api.urls.scan_results + '?domain=' + encodeURI(this.domain.domain)).then((data) => {
        this.result = data.data
        this.result.scanFinished.humanDate = moment(String(data.data.scanFinished.date)).add('1', 'hours').format('DD.MM.YYYY HH:mm')

        // Trigger gauge
        setTimeout(function () {
          if (
            window.jQuery && window.jQuery('.domain-id-' + this.domain.id + ' .gaugeMeter') &&
            typeof window.jQuery('.domain-id-' + this.domain.id + ' .gaugeMeter').gaugeMeter !== 'undefined' &&
            !this.hasGauge
          ) {
            window.jQuery('.domain-id-' + this.domain.id + ' .gaugeMeter').gaugeMeter()
            this.hasGauge = true
          }
        }.bind(this), 500)
      }).catch(() => {
        this.msg = 'fetch_error'
      })
    }
  },
  created: function () {
    if (!this.domain.verificationStatus) {
      return
    }

    this.fetchResult()
  },
  computed: {
    'domainClass': function () {
      return 'domain-id-' + this.domain.id
    }
  },
  props: ['domain']
}
</script>
