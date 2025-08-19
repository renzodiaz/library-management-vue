import axios from 'axios'
import { getCurrentToken, getCurrentUser } from '@/api/auth'

import { API_KEY, API_REALM, API_TOKEN, BASE_API_URL } from '@/utils/variables'

const axiosConfig = {
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

const secureAxiosInstance = axios.create({ ...axiosConfig })

const plainAxiosInstance = axios.create({
  ...axiosConfig,
  headers: {
    Authorization: `${API_REALM} api_key=${API_KEY}:${API_TOKEN}`,
  },
})

const requestHandler = (request) => {
  let user_id = getCurrentUser()
  let access_token = getCurrentToken()

  if (access_token) {
    request.headers.Authorization = `${API_REALM} api_key=${API_KEY}:${API_TOKEN}, access_token=${user_id}:${access_token}`
  }

  return request
}

const responseHandler = (response) => {
  if (response.status === 401) {
    console.log('Unauthorized', response)
  }

  return response
}

const errorHandler = (error) => Promise.reject(error)

secureAxiosInstance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error),
)

secureAxiosInstance.interceptors.request.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error),
)

export { secureAxiosInstance, plainAxiosInstance }
