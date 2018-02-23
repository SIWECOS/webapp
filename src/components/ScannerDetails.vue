<template>
    <div class="scanner-item-data">
        <span class="scanner-data">{{ scanner.scanner_type }}</span>

        <button class="btn btn-primary" v-on:click="showDetails = (showDetails) ? 0 : 1">{{ $t('messages.more_info') }}</button>
        {{ scanner.showDetails }}

        <div class="scanner-check-item-description" v-show="showDetails">
            {{ scanner.description}}

            <small><a :href="'https://www.siwecos.de/wiki/' + scanner.scanner_type" :title="$t('messages.more_info')" target="_blank">{{ $t('messages.more_info') }} &gt;&gt;</a></small>
        </div>

        <br><span><small>{{ $t('messages.lastScan') }}: {{ scanner.updated_at }}</small></span><p></p>

        <div class="scanner-check-wrapper">
            <div class="scanner-check-content" v-for="(scanresult) in scanner.result">
                <scan-result v-bind:scanresult="scanresult"></scan-result>
            </div>
        </div>

        <div class="impact-gauge gaugeMeter" :data-percent="scanner.score" data-size="75" data-width="14" data-style="Full" data-theme="Red-Gold-Green" data-animate_gauge_colors="1" style="width: 75px;">
            <span style="line-height: 75px; font-size: 16.5px;">{{ scanner.score }}</span><canvas width="75" height="75"></canvas>
        </div>
    </div>
</template>

<script>
  import ScanResult from './ScanResult'

  export default {
    components: {ScanResult},
    name: 'ScannerDetails',
    data () {
      return {
        'showDetails': false
      }
    },
    i18n: {
      messages: {
        de: {
          messages: {
            lastScan: 'Letzter Scan',
            more_info: 'Mehr Informationen'
          }
        }
      }
    },
    props: ['scanner']
  }
</script>