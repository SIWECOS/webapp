import Api from './api'

/**
 *
 * @param email
 * @param password
 * @return {Promise<void>}
 */
const login = async (email, password) => {
  const api = new Api()

  if (!email || !password) return

  try {
    return await api.create('user/login', { email, password })
  } catch (e) {
    throw e
  }
}

export {
  login
}
