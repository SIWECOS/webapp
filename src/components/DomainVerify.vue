<template>
    <div>
        <h3>{{ $t("messages.headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <div id="wppb-domainverify-wrap" class="wppb-domain-forms">
            <p><strong>{{ $t("messages.verifyheading") }}</strong></p>
            <p>{{ $t("messages.verify_explanation1") }}</p>
            <p>{{ $t("messages.verify_explanation2") }}</p>

            <p><strong>{{ $t("messages.method_metatag") }}</strong></p>

            <ul>
                <li>{{ $t("messages.method_metatag_step1") }}</li>
                <li>{{ $t("messages.method_metatag_step2") }}</li>
                <li>{{ $t('messages.method_metatag_step3') }} <strong>{{ this.metaTag}}</strong></li>
                <li>{{ $t("messages.method_metatag_step4") }}</li>
                <li>{{ $t("messages.method_metatag_step5") }}</li>
            </ul>

            <p><strong>{{ $t("messages.method_file") }}</strong></p>

            <ul>
                <li v-html="$t('messages.method_file_step1', {fileName: this.domain.domainToken + '.html'})"></li>
                <li v-html="$t('messages.method_file_step2', {token: this.domain.domainToken})"></li>
                <li>{{ $t("messages.method_file_step3") }}</li>
                <li>{{ $t("messages.method_file_step4") }}</li>
            </ul>

            <a href="#" @click="verifyDomain()">{{ $t('messages.verify') }}</a>
        </div>
    </div>
</template>

<script>
  import api from '../services/api.js'
  import auth from '../services/auth.js'
  import router from '../router/index.js'

  export default {
    name: 'DomainVerify',
    data () {
      return {
        domain: {},
        msg: false
      }
    },
    i18n: {
      messages: {
        de: {
          messages: {
            headline: 'Domain bestätigen',
            api_error: 'Fehler beim Abruf der Domaindaten, bitte versuchen Sie es später erneut',
            verifyheading: 'Das Verifizierungsverfahren',
            method_metatag: 'Meta-Tag',
            method_metatag_step1: 'Um eine Domain über ein Meta-Tag zu verifizieren, kopieren Sie den von uns angegebenen Code in die Headerinformationen ihrer Startseite.',
            method_metatag_step2: 'Laden Sie die Startseite (z.B. index.html) herunter und kopieren den Meta-Tag in den Kopfbereich der Datei.',
            method_metatag_step3: 'Meta-Tag:',
            method_metatag_step4: 'Laden Sie die Startdatei wieder in ihr Hauptverzeichnis der Webseite und klicken Sie Auf der Siwecos-Seite auf „Überprüfen“.',
            method_metatag_step5: 'Sollte die Meta-information gefunden werden, wird die neue Domain im Dienst von Siwecos aufgenommen bzw. gespeichert.',
            method_file: 'Datei',
            method_file_step1: 'Um eine Domain mit einer Datei verifizieren zu können, erstellen Sie bitte im ersten Schritt eine HTML-Datei mit dem von uns angegebenen Namen <strong>{fileName}</strong>',
            method_file_step2: 'Im zweiten Schritt kopieren Sie den Code <strong>{token}</strong>  in die erste Zeile der HTML-Datei.',
            method_file_step3: 'Im dritten Schritt laden Sie die erstellte HTML-Datei in das Hauptverzeichnis ihres Webseite hoch.',
            method_file_step4: 'Klicken Sie im Anschluss auf „Überprüfen“. Ist die Überprüfung erfolgreich, wird die neue Domain im Dienst von Siwecos aufgenommen bzw. gespeichert.',
            verify_explanation1: 'Alle Domains die bei Siwecos zur Überprüfung eingetragen werden, müssen verifiziert bzw. gegengeprüft werden. Dazu bietet Siwecos drei verschiedene Verfahren (Datei, Meta-Tag, E-Mail) an.',
            verify_explanation2: 'Wozu wird eine Verifizierung gemacht? Bei einer Verifizierung wird aus datenschutzrechtlichen Gründen nachgewiesen, dass Sie der wirkliche Inhaber der Domain sind.',
            verify: 'Überprüfen',
            could_not_verify: 'Fehler bei der Überprüfung'
          }
        }
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
          console.log(err)

          this.msg = 'could_not_verify'
        })
      },
      fetchDomainInfo () {
        api.$http.post(api.urls.domain_list).then((data) => {
          data.data.domains.forEach(function (domain) {
            if (parseInt(domain.id) === parseInt(this.$route.params.id)) {
              this.domain = domain
              this.metaTag = '<meta name="siwecos-site-verification" content="' + domain.domainToken + '" />'
            }
          }.bind(this))
        }).catch(() => {
          this.msg = 'api_error'
        })
      }
    }
  }
</script>