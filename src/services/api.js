import axios from 'axios'

axios.defaults.baseURL = 'https://api.staging.siwecos.de/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
  $http: axios,
  urls: {
    login_url: '/api/v1/users/login',
    signup_url: '/api/v2/user',
    domain_list: '/api/v1/domains/listDomains',
    domain_delete: '/api/v1/domains/deleteDomain',
    domain_add: '/api/v1/domains/addNewDomain',
    domain_verify: '/api/v1/domains/verifyDomain',
    scan_start: '/api/v1/scan/start',
    scan_results: '/api/v1/scan/result',
    update_user: '/api/v2/user',
    get_user: '/api/v1/users/getUserData',
    account_delete: '/api/v2/user',
    reset_password: '/api/v2/user/password/sendResetMail',
    process_reset: '/api/v2/user/password/reset',
    resend_activation: '/api/v1/users/activate/resend',
    status_url: 'https://api.staging.siwecos.de/api/v1/scan/status/free'
  }
}
