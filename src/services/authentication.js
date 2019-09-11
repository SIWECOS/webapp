import Api from './api'

const login = async (username, password) => {
  if (!username || !password) return

  try {
    return await Api.create('v2/user/login', { username, password })
  } catch (e) {
    throw e
  }
}
