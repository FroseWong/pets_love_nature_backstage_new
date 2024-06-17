import axios from 'axios'
const baseURL = 'https://pets-love-nature-backend-n.onrender.com/api/v1'

export const useAxiosGet = async (url, config) => {
  console.log('useAxiosGet')
  const res = await axios
    .get(`${baseURL}${url}`, config)
    .then((res) => {
      console.log('res', res)
      return res?.data
    })
    .catch((error) => {
      console.log('error', error)
    })

  return res
}

export const useAxiosPost = async (url, body, config) => {
  console.log('useAxiosPost')
  const res = await axios
    .post(`${baseURL}${url}`, body, config)
    .then((res) => {
      console.log('res', res)
      return res?.data
    })
    .catch((error) => {
      console.log('error', error)
    })

  return res
}

export const useAxiosPatch = async (url, body, config) => {
  console.log('useAxiosPatch')
  const res = await axios
    .patch(`${baseURL}${url}`, body, config)
    .then((res) => {
      console.log('res', res)
      return res?.data
    })
    .catch((error) => {
      console.log('error', error)
    })

  return res
}

export const useAxiosDelete = async (url, config) => {
  console.log('useAxiosDelete')
  const res = await axios
    .delete(`${baseURL}${url}`, config)
    .then((res) => {
      console.log('res', res)
      return res?.data
    })
    .catch((error) => {
      console.log('error', error)
    })
  return res
}
