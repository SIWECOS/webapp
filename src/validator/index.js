import VeeValidate from 'vee-validate'
import de from 'vee-validate/dist/locale/de'

VeeValidate.Validator.localize('de', {
  messages: de.messages,
  attributes: {
    email: 'E-Mail',
    password: 'Password',
    password2: 'Passwort-Bestätigung',
    first_name: 'Vorname',
    last_name: 'Nachname',
    address: 'Adresse',
    zip: 'PLZ',
    city: 'Ort',
    telephone: 'Telefon',
    salutation: 'Anrede'
  },
  custom: {
    tos: {
      required: 'Bitte stimmen Sie unseren Allgemeinen Geschäftsbindungen zu.'
    }
  }
})

export default VeeValidate
