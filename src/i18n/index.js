import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  de: {
    messages: {
      nav: {
        login: 'Anmeldung',
        register: 'Registrierung',
        logout: 'Abmelden',
        domains: 'Domainübersicht',
        myaccount: 'Mein Konto',
        deleteaccount: 'Konto löschen'
      },
      account_headline: 'Mein Konto',
      fieldset_credentials: 'Zugangsdaten',
      field_email: 'E-Mail*',
      field_newpassword: 'Neues Passwort',
      field_newpasswordrepeat: 'Neues Passwort wiederholen',
      fieldset_profile: 'Persönliche Daten',
      field_salutation: 'Anrede*',
      fieldvalue_saluation_pleaseselect: '- Anrede wählen -',
      fieldvalue_saluation_mr: 'Herr',
      fieldvalue_saluation_mrs: 'Frau',
      field_firstname: 'Vorname*',
      field_lastname: 'Nachname*',
      field_address: 'Adresse',
      field_zip: 'PLZ',
      field_city: 'Stadt',
      field_telephone: 'Telefon',
      fieldset_company: 'Firmenangaben',
      field_company: 'Firmenname',
      field_companysize: 'Größe',
      field_companysize_pleaseselect: '- Unternehmensgröße wählen - ',
      field_industry: 'Branche',
      submit: 'Speichern',
      account_saved: 'Konto erfolgreich gespeichert',
      error_saving_account: 'Konto konnte nicht gespeichert werden',
      password_no_match: 'Bitte Passwortbestätigung prüfen',
      accountdelete_text: 'SIWECOS Account löschen',
      confirm_accountdelete: 'Möchten Sie Ihr Benutzerkonto unwiderruflich löschen?',
      headline_domainadd: 'Domain hinzufügen',
      field_domain_submit: 'Hinzufügen',
      field_domain: 'Domain',
      domain_in_use: 'Die angegebene Domain wird bereits in einem SIWECOS Konto verwendet',
      domain_could_not_add: 'Die Domain konnte nicht hinzugefügt werden, bitte versuchen Sie es später erneut',
      verifyDomain: 'Domain bestätigen',
      startScan: 'Neuen Scan starten',
      startedScan: 'Scan gestartet',
      fetch_error: 'Fehler beim Abruf der Scan-Ergebnisse, bitte versuchen Sie es später erneut',
      start_error: 'Fehler beim Starten des Scans, bitte versuchen Sie es später erneut',
      start_success: 'Scan erfolgreich gestartet, die Ergebnisse stehen in einigen Minuten zur Verfügung',
      lastScan: 'Letzter Scan',
      showResults: 'Zeige Ergebnisse',
      more_info: 'Mehr Informationen',
      deleteDomain: 'Domain entfernen',
      delete_error: 'Fehler beim Löschen der Domain, bitte versuchen Sie es später erneut',
      confirm_domain_delete: 'Möchten Sie diese Domain wirklich löschen?',
      domainlist_headline: 'Sicherheitsbericht',
      api_error: 'Fehler beim Abruf der Domaindaten, bitte versuchen Sie es später erneut',
      nodomains: 'Keine Domains verfügbar',
      addDomain: 'Domain hinzufügen',
      domainverify_headline: 'Domain bestätigen',
      domainverify_api_error: 'Fehler beim Abruf der Domaindaten, bitte versuchen Sie es später erneut',
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
      could_not_verify: 'Fehler bei der Überprüfung, bitte folgen Sie den Schritten in der Anleitung',
      forgot_headline: 'Passwort zurücksetzen',
      field_reset_submit: 'Passwort zurücksetzen',
      no_user_found: 'Es wurde kein Nutzer mit der angegebenen Adresse gefunden',
      mail_sent: 'Wir haben Ihnen eine E-Mail mit weiteren Instruktionen zugesendet.',
      login_headline: 'Login',
      field_password: 'Passwort',
      field_remember: 'Angemeldet bleiben',
      field_submit: 'Anmelden',
      invalid_credentials: 'Ungültige Zugangsdaten',
      user_inactive: 'Bitte aktivieren Sie Ihren Account, bevor Sie sich einloggen',
      forgotpassword: 'Passwort vergessen?',
      loggingout: 'Sie werden nun abgemeldet',
      register_headline: 'Konto anlegen',
      field_passwordrepeat: 'Passwort wiederholen*',
      field_tos: 'Ich akzeptiere die',
      fielset_iagree: 'Zustimmung',
      register_submit: 'Registrieren',
      emailaddress_in_use: 'Die gewünschte E-Mail-Adresse wird bereits verwendet',
      could_not_register: 'Bei der Registrierung ist ein Fehler aufgetreten, bitte versuchen Sie es später erneut',
      successmessage: 'Vielen Dank für Ihre Anmeldung bei SIWECOS! Bitte aktivieren Sie nun Ihr Konto, indem Sie den Bestätigungslink aufrufen, den wir Ihnen per E-Mail zugesendet haben.',
      resetpassword_headline: 'Passwort zurücksetzen',
      field_resetpassword_submit: 'Passwort zurücksetzen',
      reset_complete: 'Ihr Passwort wurde zurückgesetzt, Sie werden weitergeleitet',
      detailed_info: 'Ausführliche Beschreibung >>>'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'de', // set locale
  messages // set locale messages
})

export default i18n
