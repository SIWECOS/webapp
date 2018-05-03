import router from '../router/index.js'
import api from '../services/api.js'

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false,
    data: {}
  },

  // Send a request to the login URL and save the returned token
  login (context, creds, redirect) {
    api.$http.post(api.urls.login_url, creds).then((response) => {
      if (!response.data.active) {
        context.msg = 'user_inactive'

        return
      }

      if (creds.rememberme) {
        localStorage.setItem('access_token', response.data.token)
      } else {
        sessionStorage.setItem('access_token', response.data.token)
      }

      this.user.authenticated = true
      this.user.data = response.data

      if (typeof window.login_announce !== 'undefined') {
        window.login_announce(response.data)
      }

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

    if (typeof window.login_announce !== 'undefined') {
      window.login_announce(null)
    }

    router.push('/login')
  },

  checkLoginStatus () {
    if (this.user.authenticated) {
      return
    }

    let token = false

    if (localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token')
    }

    if (sessionStorage.getItem('access_token')) {
      token = sessionStorage.getItem('access_token')
    }

    if (!token) {
      return
    }

    api.$http.defaults.headers.common['userToken'] = token

    api.$http.post(api.urls.get_user).then((response) => {
      this.user.data = response.data
      this.user.authenticated = true

      router.push('/domains')

      if (typeof window.login_announce !== 'undefined') {
        window.login_announce(response.data)
      }
    })
  }
}
