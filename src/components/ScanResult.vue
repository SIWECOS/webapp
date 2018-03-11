<template>
  <div class="scanner-check-item-data" v-if="scanresult.scoreTypeRaw !== 'hidden'">
    <div class="col-85">
      <span class="round-check scanner-check-data"
            v-bind:class="{ 'score-red': scanresult.score < 30, 'score-orange': scanresult.score >= 30 && scanresult.score < 50, 'score-yellow': scanresult.score >= 50 && scanresult.score < 80, 'score-green': scanresult.score >=80 }">{{ scanresult.name}}</span>
    </div>
    <div class="col-20">
      <button class="btn btn-primary" v-bind:class="(showDetails) ? 'active' : ''" v-on:click="showDetails = (showDetails) ? 0 : 1">{{ $t('messages.more_info') }}
      </button>
    </div>
    <div style="clear: both"></div>
    <div class="scanner-check-item-description" v-show="showDetails">
      <p class="scanner-check-item-description-title" v-html="scanresult.description"></p>
      <p class="scanner-check-item-description-report" v-if="scanresult.report" v-html="scanresult.report"></p>
      <div style="clear: both;"></div>
      <small><a :href="scanresult.link" target="_blank">{{ $t('messages.detailed_info') }}</a></small>
      <div style="clear: both;"></div>
      <ul class="scanner-check-item-details" v-show="showDetails">
        <li v-for="(detail) in scanresult.testDetails">{{ detail.name }}</li>
      </ul>
      <div style="clear: both; padding-bottom: 20px"></div>
    </div>


  </div>


</template>

<style>

  .col-85 {
    width: 70%;
    float: left;
  }

  .col-20 {
    width: 30%;
    float: left;
    text-align: center;
  }

</style>
<script>
  export default {
    name: 'ScanResult',
    data () {
      return {
        'showDetails': false
      }
    },
    props: ['scanresult']
  }
</script>
