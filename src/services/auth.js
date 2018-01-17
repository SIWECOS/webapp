import router from '../router/index.js'
import api from '../services/api.js'

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned token
  login (context, creds, redirect) {
    api.$http.post(api.urls.login_url, creds).then((response) => {
      if (creds.rememberme) {
        localStorage.setItem('access_token', response.data.token)
      } else {
        sessionStorage.setItem('access_token', response.data.token)
      }

      this.user.authenticated = true
      api.$http.defaults.headers.common['userToken'] = response.data.token

      router.push('/domains')
    }).catch(() => {
      context.msg = 'invalid_credentials'
    })
  },

  // To log out, we just need to remove the token
  logout () {
    sessionStorage.removeItem('access_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
    api.$http.defaults.headers.common['userToken'] = false

    router.push('/login')
  },

  checkRememberStatus () {
    if (localStorage.getItem('access_token') && !this.user.authenticated) {
      this.user.authenticated = true
      sessionStorage.setItem('access_token', localStorage.getItem('access_token'))
      api.$http.defaults.headers.common['userToken'] = localStorage.getItem('access_token')

      router.push('/domains')
    }
  }
}
