import axios from 'axios'
import env from '@/../env'

/**
 * @class Api
 */
class Api {
  /**
   * @constructor
   *
   * @param httpClient HTTP service
   * @param token authentication tokens for users
   */
  constructor ({ httpClient = null, token = '' } = {}) {
    this.axios = httpClient || axios
    this.token = token || sessionStorage.getItem(env.ID_TOKEN)
    this.baseUrl = `${env.APP_URL}/api`

    if (this.token) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    }
  }

  /**
   *
   * @param path
   * @param id
   * @param params
   *
   * @returns {Promise<null>}
   */
  async get (path, { id = '', params = {} } = {}) {
    if (this.axios === null) {
      return null
    }

    const pathGen = id ? `${this.baseUrl}/${path}/${id}` : `${this.baseUrl}/${path}`

    try {
      const { data } = await this.axios.get(pathGen, { params })

      return data
    } catch (e) {
      throw e.response
    }
  }

  /**
   *
   * @param path
   * @param requestBody
   *
   * @returns {Promise<null|*>}
   */
  async create (path, requestBody = {}) {
    if (this.axios === null) {
      return null
    }

    try {
      const { data } = await this.axios.post(`${this.baseUrl}/${path}`, requestBody)

      return data
    } catch (e) {
      throw e.response
    }
  }

  /**
   *
   * @param path
   * @param id
   * @param requestBody
   *
   * @returns {Promise<null>}
   */
  async update (path, id, requestBody) {
    if (this.axios === null) {
      return null
    }

    try {
      const { data } = await this.axios.put(`${this.baseUrl}/${path}/${id}`, requestBody)

      return data
    } catch (e) {
      throw e.response
    }
  }

  /**
   *
   * @param path
   * @param id
   *
   * @returns {Promise<null>}
   */
  async delete (path, id) {
    if (this.axios === null) {
      return null
    }

    try {
      await this.axios.delete(`${this.baseUrl}/${path}/${id}`)
    } catch (e) {
      throw e.response
    }
  }
}

export default Api
