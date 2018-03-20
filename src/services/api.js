import axios from 'axios'

axios.defaults.baseURL = 'https://bla.staging2.siwecos.de'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
  $http: axios,
  urls: {
    login_url: '/api/v1/users/login',
    signup_url: '/api/v1/users/createCaptcha',
    domain_list: '/api/v1/domains/listDomains',
    domain_delete: '/api/v1/domains/deleteDomain',
    domain_add: '/api/v1/domains/addNewDomain',
    domain_verify: '/api/v1/domains/verifyDomain',
    scan_start: '/api/v1/scan/start',
    scan_results: '/api/v1/scan/result',
    orgsizes: '/api/v1/getOrgSizes',
    salutations: '/api/v1/getSalutation',
    update_user: '/api/v1/users/updateUserData',
    get_user: '/api/v1/users/getUserData',
    account_delete: '/api/v1/users/deleteUserData',
    reset_password: '/api/v1/users/password/sendForgotMail',
    process_reset: '/api/v1/users/password/processReset',
    resend_activation: '/api/v1/users/activate/resend',
    status_url: 'https://ca.staging2.siwecos.de//api/v1/scan/status/free'
  }
}
