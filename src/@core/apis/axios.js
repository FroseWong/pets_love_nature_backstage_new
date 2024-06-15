import axios from 'axios'
const baseURL = 'https://pets-love-nature-backend-n.onrender.com/api/v1'

export const useAxiosGet = async (url, headers) => {
  console.log('useAxiosGet')
  const res = axios
    .get(`${baseURL}${url}`, headers)
    .then((res) => {
      console.log('res', res)
      return res?.data
    })
    .catch((error) => {
      console.log('error', error)
    })

  return res
}

export const useAxiosPost = async (url, body, headers) => {
  console.log('useAxiosPost')
  const res = axios
    .post(`${baseURL}${url}`, body, headers)
    .then((res) => {
      console.log('res', res)
      return res?.data
    })
    .catch((error) => {
      console.log('error', error)
    })

  return res
}

export const useAxiosPatch = async (url, body, headers) => {
  console.log('useAxiosPatch')
  axios
    .patch(`${baseURL}${url}`, body, headers)
    .then((res) => {
      console.log('res', res)
      return res?.data
    })
    .catch((error) => {
      console.log('error', error)
    })
}

export const useAxiosDelete = async (url, body, headers) => {
  console.log('useAxiosDelete')
  const res = axios
    .delete(`${baseURL}${url}`, body, headers)
    .then((res) => {
      console.log('res', res)
      return res?.data
    })
    .catch((error) => {
      console.log('error', error)
    })
  return res
}
