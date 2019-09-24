<script>
import env from '../../env'
export default {
  name: 'Logout',
  render (h) {
    return h('span')
  },
  mounted () {
    sessionStorage.removeItem(env.ID_TOKEN)
    localStorage.removeItem(env.ID_TOKEN)

    if (typeof window.login_announce !== 'undefined') {
      window.login_announce(null)
    }

    this.$router.push({ path: '/login' })
  }
}
</script>
