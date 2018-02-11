import axios from 'axios'

axios.defaults.baseURL = 'http://bla.staging2.siwecos.de'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default {
  $http: axios,
  urls: {
    login_url: '/api/v1/users/login',
    signup_url: '/api/v1/users/createCaptcha',
    domain_list: '/api/v1/domains/listDomains/',
    domain_add: '/api/v1/domains/addNewDomain',
    domain_verify: '/api/v1/domains/verifyDomain'
  }
}
