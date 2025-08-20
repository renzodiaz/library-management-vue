import axios from 'axios'
import { popAlert } from '@/utils/alerts';
import { getCurrentToken, getCurrentUser } from '@/api/auth'

import { API_KEY, API_REALM, BASE_API_URL } from '@/utils/variables'

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
    Authorization: `${API_REALM} api_key=${API_KEY}`,
  },
})

const requestHandler = (request) => {
  let user_id = getCurrentUser()
  let access_token = getCurrentToken()

  if (access_token) {
    request.headers.Authorization = `${API_REALM} api_key=${API_KEY}, access_token=${user_id}:${access_token}`
  }

  return request
}

const responseHandler = (response) => response;

const errorHandler = (error) => {
  if (error.response) {
    const status = error.response.status;

    if (status === 401) {
      popAlert("Unauthorized, please contact support");
    } else if (status === 404) {
      popAlert(error.response.data.error || "Resource not found");
    } else if (status === 422) {
      popAlert(error.response.data.errors);
    } else {
      popAlert("Something went wrong");
    }
  } else {
    popAlert("Network error, please try again");
  }

  return Promise.reject(error);
}

secureAxiosInstance.interceptors.request.use(requestHandler, errorHandler)
secureAxiosInstance.interceptors.response.use(responseHandler, errorHandler)

export { secureAxiosInstance, plainAxiosInstance }
