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
export const getCustomerList = async (params) => {
  const { headers } = getToken()
  const newObj = {
    headers,
    params
  }
  const res = await useAxiosGet('/admin/customerList', newObj)
  return res?.data
}

export const updateCustomerAccountStatus = async (bodyObj) => {
  const obj = getToken()
  const res = await useAxiosPatch('/admin/customers', bodyObj, obj)
  return res
}

export const getMessageList = async (params) => {
  const obj = getToken()
  const res = await useAxiosGet(`/chat/getChatHistory/${params}`, obj)
  return res?.data
}
