<template>
    <div>
        <h3>{{ $t("messages.headline") }}</h3>

        <p class="wppb-error" v-if="msg">{{ $t('messages.' + msg) }}</p>

        <div id="UserAccount">
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
                        <label for="newpassword">{{ $t("messages.field_newpassword") }}</label>
                        <input type="password" id="newpassword" v-validate="{min:8}" :placeholder="$t('messages.field_newpassword')" v-model="user.newpassword" name="newpassword" />
                        <span v-show="errors.has('newpassword')">{{ errors.first('newpassword') }}</span>
                    </li>
                    <li>
                        <label for="newpassword_repeat">{{ $t("messages.field_newpasswordrepeat") }}</label>
                        <input type="password" id="newpassword_repeat" v-validate="{is:user.newpassword}" :placeholder="$t('messages.field_newpasswordrepeat')" v-model="user.newpassword2" name="newpassword2" />
                        <span v-show="errors.has('newpassword2')">{{ errors.first('newpassword2') }}</span>
                    </li>
                    <li>
                        <h4>{{ $t("messages.fieldset_profile") }}</h4>
                    </li>
                    <li>
                        <label for="salutation">{{ $t("messages.field_salutation") }}</label>
                        <select id="salutation" v-validate="{required:true}" name="salutation" v-model="user.salutation_id">
                            <option v-for="option in salutations" v-bind:value="option.id">
                                {{ $t('messages.fieldvalue_saluation_' + option.value.toLowerCase().substr(0, option.value.length -1)) }}
                            </option>
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
                            <option v-for="option in org_sizes" v-bind:value="option.id">
                                {{ option.value }}
                            </option>
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
                </ul>

                <input type="submit" class="submit button" :value="$t('messages.submit')" />
            </form>
        </div>
    </div>
</template>

<script>
import auth from '../services/auth.js'
import router from '../router/index.js'
import api from '../services/api.js'

export default {
  name: 'Account',
  data () {
    return {
      user: {},
      msg: false,
      salutations: [],
      org_sizes: []
    }
  },
  i18n: {
    messages: {
      de: {
        messages: {
          headline: 'Mein Konto',
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
          error_saving_account: 'Konto konnte nicht gespeichert werden'
        }
      }
    }
  },
  methods: {
    validateBeforeSubmit () {
      if (this.user.newpassword !== '' && this.user.newpassword !== this.user.newpassword2) {
        return true
      }

      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submitForm()
          return false
        }

        return true
      })
    },
    submitForm () {
      api.$http.post(api.urls.update_user, this.user).then((data) => {
        this.msg = 'account_saved'
      }).catch(() => {
        this.msg = 'error_saving_account'
      })
    }
  },
  created: function () {
    if (!auth.user.authenticated) {
      router.push('/login')
    }

    this.user = auth.user.data
  },
  mounted: function () {
    api.$http.get(api.urls.salutations)
      .then(response => {
        this.salutations = response.data
      })
    api.$http.get(api.urls.orgsizes)
      .then(response => {
        this.org_sizes = response.data
      })
  }
}
</script>