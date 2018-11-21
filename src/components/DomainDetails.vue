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
            <svg xmlns="http://www.w3.org/2000/svg" width="126" height="126" version="1.1" v-if="result">
                <g transform="translate(63,63)">
                    <text x="0" y="0%" dominant-baseline="central" text-anchor="middle" font-size="200%">{{ result.weightedMedia.toFixed(0) }}</text>
                    <path d="M-35.35,35.36 A50,50 0 1 1 35.35,35.36" stroke="lightgrey" stroke-width="25" stroke-linecap="round" fill="none"/>
                    <path v-bind:d="'M-35.35,35.36 A50,50 0 ' +  gaugeData.big_arc + ' 1 ' + gaugeData.score_x + ',' + gaugeData.score_y" v-bind:stroke="gaugeData.score_col" stroke-width="25" stroke-linecap="round" fill="none"/>
                </g>
            </svg>

            <a href="/gesamtscore/" target="_blank" class="scanner-score-information">Informationen</a>

            <div class="last-scan-data" v-if="result.scanFinished"><span>{{ result.scanFinished.humanDate }}</span></div>
        </div>

        <div class="scanners-wrapper" v-show="result && showDetails">
            <div class="scanner-content" v-for="(scanner) in result.scanners">
                <scanner-details v-bind:scanner="scanner"></scanner-details>
            </div>

            <div class="seal-link">
                <a v-bind:href="sealLink + noProtocolDomain" target="_blank">{{ $t('messages.seallink-text', {domain: noProtocolDomain}) }}</a>
            </div>

            <div class="report-link">
                <a v-bind:href="reportLink" target="_blank" download>{{ $t('messages.reportlink-text') }}</a>
            </div>
        </div>

        <span v-show="msg">{{ $t('messages.' + msg) }}</span>
    </div>
</template>

<script>
import api from '../services/api.js'
import auth from '../services/auth.js'
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
      api.$http.get(api.urls.scan_results + '/' + this.$i18n.locale + '?domain=' + encodeURI(this.domain.domain)).then((data) => {
        let offset = new Date().getTimezoneOffset()

        this.result = data.data
        this.result.scanFinished.humanDate = moment(String(data.data.scanFinished.date)).add(parseInt(offset / 60 * -1), 'hours').format('DD.MM.YYYY HH:mm')
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
    },
    'noProtocolDomain': function () {
      return this.domain.domain.replace(/(^\w+:|^)\/\//, '')
    },
    'sealLink': function () {
      return this.$t('messages.seallink')
    },
    'reportLink': function () {
      if (!this.result.scanners || !this.results.scanners.length) {
        return ''
      }

      return api.$http.defaults.baseURL + 'pdf/' + this.result.scanners[0].scan_id + '/' + encodeURI(auth.user.data.token)
    },
    'gaugeData': function () {
      let radius = 50
      let origin = Math.PI * 0.25
      let factor = Math.PI * 1.5 / 100
      let deg = this.result.weightedMedia.toFixed(0) * factor
      let hue = (this.result.weightedMedia.toFixed(0) / 100 * 120)

      return {
        'score_x': Math.cos(deg - origin) * radius * -1,
        'score_y': Math.sin(deg - origin) * radius * -1,
        'score_col': 'hsl(' + hue + ', 100%, 50%)',
        'big_arc': (deg > Math.PI) ? 1 : 0
      }
    }
  },
  props: ['domain']
}
</script>
