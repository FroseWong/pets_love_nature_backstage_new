import { useAxiosGet, useAxiosPost, useAxiosPatch, useAxiosDelete } from './axios'

const getToken = () => {
  const token = localStorage.getItem('token')
  const obj = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  return obj
}
export const getBanner = async () => {
  const obj = getToken()
  const res = await useAxiosGet('/admin/banner', obj)
  return res?.data
}

export const addBanner = async (data) => {
  const obj = getToken()
  const res = await useAxiosPost('/admin/banner', data, obj)
  return res?.data
}

export const updateBanner = async (data) => {
  console.log('data', data)
  const obj = getToken()
  const id = data._id
  const res = await useAxiosPatch(`/admin/banner/${id}`, data, obj)
  console.log('res', res)
  return res?.data
}

export const deleteBanner = async (id) => {
  const obj = getToken()
  console.log('obj', obj)
  const res = await useAxiosDelete(`/admin/banner/${id}`, obj)
  console.log('res', res)
  return res?.data
}
