<template>
    <div>
        <h3>{{ $t("messages.domainverify_headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <div id="wppb-domainverify-wrap" class="wppb-domain-forms">
            <p><strong>{{ $t("messages.verifyheading") }}</strong></p>
            <p>{{ $t("messages.verify_explanation1") }}</p>
            <p>{{ $t("messages.verify_explanation2") }}</p>

            <p><strong>{{ $t("messages.method_metatag") }}</strong></p>

            <ul>
                <li>{{ $t("messages.method_metatag_step1") }}</li>
                <li>{{ $t("messages.method_metatag_step2") }}</li>
                <li>{{ $t('messages.method_metatag_step3') }}<br />
                    <strong>{{ this.metaTag}}</strong> <button type="button" v-clipboard:copy="metaTag">{{ $t('messages.copy') }}</button>
                </li>
                <li>{{ $t("messages.method_metatag_step4") }}</li>
                <li>{{ $t("messages.method_metatag_step5") }}</li>
            </ul>

            <p><strong>{{ $t("messages.method_file") }}</strong></p>

            <ul>
                <li>
                    {{ $t('messages.method_file_step1') }}<br />
                    <button type="button" v-on:click="downloadHtml">{{ $t('messages.method_file_download') }}</button>
                </li>
                <li>{{ $t("messages.method_file_step2") }}</li>
                <li>{{ $t("messages.method_file_step3") }}</li>
            </ul>

            <a href="#" @click="verifyDomain()" class="btn btn-primary">{{ $t('messages.verify') }}</a>
        </div>
    </div>
</template>

<script>
  import api from '../services/api.js'
  import auth from '../services/auth.js'
  import router from '../router/index.js'
  import FileSaver from 'file-saver'

  export default {
    name: 'DomainVerify',
    data () {
      return {
        domain: {},
        msg: false
      }
    },
    created: function () {
      if (!auth.user.authenticated) {
        router.push('/login')
      }

      this.fetchDomainInfo()
    },
    methods: {
      verifyDomain () {
        api.$http.post(api.urls.domain_verify, {domain: this.domain.domain}).then((data) => {
          router.push('/domains')
        }).catch((err) => {
          if (err.response.status === 417) {
            this.msg = 'could_not_verify'
          } else {
            this.msg = 'domainverify_api_error'
          }
        })
      },
      downloadHtml () {
        let blob = new Blob([this.domain.domainToken], {type: 'text/html;charset=utf-8'})

        FileSaver.saveAs(blob, this.domain.domainToken + '.html')
      },
      fetchDomainInfo () {
        api.$http.post(api.urls.domain_list).then((data) => {
          data.data.domains.forEach(function (domain) {
            if (parseInt(domain.id) === parseInt(this.$route.params.id)) {
              this.domain = domain
              this.metaTag = '<meta name="siwecostoken" content="' + domain.domainToken + '" />'
            }
          }.bind(this))
        }).catch(() => {
          this.msg = 'api_error'
        })
      }
    }
  }
</script>