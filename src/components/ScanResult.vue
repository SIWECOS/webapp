<template>
    <div class="scanner-check-item-data">
        <span class="round-check" v-bind:class="{ 'score-red': scanresult.score < 30, 'score-yellow': scanresult.score >= 30 && scanresult.score < 80, 'score-green': scanresult.score >=80 }">
            {{ scanresult.scoreType }}: {{ scanresult.score }}
        </span>
        <span class="scanner-check-data">{{ scanresult.name}}</span>

        <button class="btn btn-primary" v-on:click="showDetails = (showDetails) ? 0 : 1">{{ $t('messages.more_info') }}</button>

        <div class="scanner-check-item-description" v-show="showDetails">
            {{ scanresult.description }}

            <small><a :href="'https://www.siwecos.de/wiki/' + scanresult.name" :title="$t('messages.more_info')" target="_blank">{{ $t('messages.more_info') }} &gt;&gt;</a></small>
        </div>

        <ul class="scanner-check-item-details" v-show="scanresult.testDetails">
            <li v-for="(detail) in scanresult.testDetails">{{ detail }}</li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'ScanResult',
    data () {
      return {
        'showDetails': false
      }
    },
    i18n: {
      messages: {
        de: {
          messages: {
            more_info: 'Mehr Informationen'
          }
        }
      }
    },
    props: ['scanresult']
  }
</script>