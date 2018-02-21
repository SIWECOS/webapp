<template>
    <div>
        <h3>{{ $t("messages.headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <div id="UserRegistration" v-if="!success">
            <form @submit.prevent="validateBeforeSubmit">
                <ul>
                    <li>
                        <h4>{{ $t("messages.fieldset_credentials") }}</h4>
                    </li>
                    <li>
                        <label for="email">{{ $t("messages.field_email") }}</label>
                        <input type="email" id="email" v-validate="'required|email'" :placeholder="$t('messages.field_email')" v-model="user.email" name="email"/>
                        <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
                    </li>
                    <li>
                        <label for="password">{{ $t("messages.field_password") }}</label>
                        <input type="password" id="password" v-validate="{required:true,min:8}" :placeholder="$t('messages.field_password')" v-model="user.password" name="password" />
                        <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
                    </li>
                    <li>
                        <label for="password_repeat">{{ $t("messages.field_passwordrepeat") }}</label>
                        <input type="password" id="password_repeat" v-validate="{required:true,is:user.password}"  :placeholder="$t('messages.field_passwordrepeat')" name="password2" />
                        <span v-show="errors.has('password2')">{{ errors.first('password2') }}</span>
                    </li>
                    <li>
                        <h4>{{ $t("messages.fieldset_profile") }}</h4>
                    </li>
                    <li>
                        <label for="salutation">{{ $t("messages.field_salutation") }}</label>
                        <select id="salutation" v-validate="{required:true}" name="salutation" v-model="user.salutation_id">
                            <option disabled value="">{{ $t("messages.fieldvalue_saluation_pleaseselect") }}</option>
                            <option value="1">{{ $t("messages.fieldvalue_saluation_mr") }}</option>
                            <option value="2">{{ $t("messages.fieldvalue_saluation_mrs") }}</option>
                        </select>
                        <span v-show="errors.has('salutation')">{{ errors.first('salutation') }}</span>
                    </li>
                    <li>
                        <label for="first_name">{{ $t("messages.field_firstname") }}</label>
                        <input type="text" id="first_name" v-validate="{required:true}" v-model="user.first_name" :placeholder="$t('messages.field_firstname')" name="first_name" />
                        <span v-show="errors.has('first_name')">{{ errors.first('first_name') }}</span>
                    </li>
                    <li>
                        <label for="last_name">{{ $t("messages.field_lastname") }}</label>
                        <input type="text" id="last_name" v-validate="{required:true}" v-model="user.last_name"  :placeholder="$t('messages.field_lastname')" name="last_name" />
                        <span v-show="errors.has('last_name')">{{ errors.first('last_name') }}</span>
                    </li>
                    <li>
                        <label for="address">{{ $t("messages.field_address") }}</label>
                        <input type="text" id="address" :placeholder="$t('messages.field_address')" name="address" v-model="user.address" />
                    </li>
                    <li>
                        <label for="plz">{{ $t("messages.field_zip") }}</label>
                        <input type="text" id="plz" :placeholder="$t('messages.field_zip')" name="plz" v-model="user.plz" />
                    </li>
                    <li>
                        <label for="city">{{ $t("messages.field_city") }}</label>
                        <input type="text" id="city" :placeholder="$t('messages.field_city')" name="city" v-model="user.city" />
                    </li>
                    <li>
                        <label for="phone">{{ $t("messages.field_telephone") }}</label>
                        <input type="text" id="phone" :placeholder="$t('messages.field_telephone')" name="phone" v-model="user.phone" />
                    </li>
                    <li>
                        <h4>{{ $t("messages.fieldset_company") }}</h4>
                    </li>
                    <li>
                        <label for="org_name">{{ $t("messages.field_company") }}</label>
                        <input type="text" id="org_name" :placeholder="$t('messages.field_company')" name="org_name" v-model="user.org_name" />
                    </li>
                    <li>
                        <label for="org_size">{{ $t("messages.field_companysize") }}</label>
                        <select id="org_size" name="org_size" v-model="user.org_size_id">
                            <option value="1">{{ $t("messages.field_companysize_pleaseselect") }}</option>
                            <option value="2">< 10</option>
                            <option value="3">10-50</option>
                            <option value="4">51-100</option>
                            <option value="5">101-500</option>
                            <option value="6">500-1000</option>
                            <option value="7">>1000</option>
                        </select>
                    </li>
                    <li>
                        <label for="org_industry">{{ $t("messages.field_industry") }}</label>
                        <input type="text" id="org_industry" :placeholder="$t('messages.field_industry')" name="org_industry" v-model="user.org_industry" />
                    </li>
                    <li>
                        <label for="org_address">{{ $t("messages.field_address") }}</label>
                        <input type="text" id="org_address" :placeholder="$t('messages.field_address')" name="org_address" v-model="user.org_address" />
                    </li>
                    <li>
                        <label for="org_plz">{{ $t("messages.field_zip") }}</label>
                        <input type="text" id="org_plz" :placeholder="$t('messages.field_zip')" name="org_plz" v-model="user.org_plz" />
                    </li>
                    <li>
                        <label for="org_city">{{ $t("messages.field_city") }}</label>
                        <input type="text" id="org_city" :placeholder="$t('messages.field_city')" name="org_city" v-model="user.org_city" />
                    </li>
                    <li>
                        <label for="org_phone">{{ $t("messages.field_telephone") }}</label>
                        <input type="text" id="org_phone" :placeholder="$t('messages.field_telephone')" name="org_phone" v-model="user.org_phone" />
                    </li>
                    <li>
                        <h4>{{ $t("messages.fielset_iagree") }}</h4>
                    </li>
                    <li>
                        <label for="tos">
                            <input type="checkbox" id="tos" v-validate="{required:true}" name="tos" v-model="user.agb"/>
                            {{ $t("messages.field_tos") }} <a href="https://www.siwecos.de/agb/">AGB</a>
                        </label>
                        <span v-show="errors.has('tos')">{{ errors.first('tos') }}</span>
                    </li>
                </ul>

                <vue-recaptcha size="invisible" ref="recaptcha" @verify="onVerify":sitekey="sitekey"></vue-recaptcha>

                <input type="submit" class="submit button" :value="$t('messages.submit')" />
            </form>
        </div>

        <div id="UserRegistrationSuccess" v-if="success">
            {{ $t("messages.successmessage") }}
        </div>
    </div>
</template>

<script>
import api from '../services/api.js'
import auth from '../services/auth.js'
import router from '../router/index.js'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'Register',
  components: {VueRecaptcha},
  data () {
    return {
      user: {salutation_id: '', org_size_id: 1},
      msg: false,
      success: false,
      sitekey: '6LeCFkYUAAAAANxnJp11dXVNBELcyVfMn0b2FQMG'
    }
  },
  i18n: {
    messages: {
      de: {
        messages: {
          headline: 'Konto anlegen',
          fieldset_credentials: 'Zugangsdaten',
          field_email: 'E-Mail*',
          field_password: 'Passwort*',
          field_passwordrepeat: 'Passwort wiederholen*',
          fieldset_profile: 'Persönliche Daten',
          field_salutation: 'Anrede',
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
          field_tos: 'Ich akzeptiere die',
          fielset_iagree: 'Zustimmung',
          submit: 'Registrieren',
          emailaddress_in_use: 'Die gewünschte E-Mail-Adresse wird bereits verwendet',
          could_not_register: 'Bei der Registrierung ist ein Fehler aufgetreten, bitte versuchen Sie es später erneut',
          successmessage: 'Vielen Dank für Ihre Anmeldung bei SIWECOS! Bitte aktivieren Sie nun Ihr Konto, indem Sie den Bestätigungslink aufrufen, den wir Ihnen per E-Mail zugesendet haben.'
        }
      }
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$refs.recaptcha.execute()
          return false
        }

        return true
      })
    },
    onVerify: function (response) {
      this.user['g-recaptcha-response'] = response
      this.submitForm()
    },
    submitForm () {
      api.$http.post(api.urls.signup_url, this.user).then((data) => {
        this.success = true
        this.msg = false
      }).catch((err) => {
        if (err.response.status === 422 && err.response.data.errors.email) {
          this.msg = 'emailaddress_in_use'
          return
        }

        this.msg = 'could_not_register'
      })
    }
  },
  created: function () {
    if (auth.user.authenticated) {
      router.push('/domains')
    }
  }
}
</script>
