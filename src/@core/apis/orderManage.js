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
export const getOrder = async (params) => {
  const { headers } = getToken()
  const newObj = {
    headers,
    params
  }
  console.log('newObj', newObj)
  const res = await useAxiosGet('/admin/orders', newObj)
  return res?.data
}

export const updateOrder = async (bodyObj) => {
  const obj = getToken()
  console.log('updateOrder')

  const body = {
    orderId: '663f2c28c52d18d64cdb4570',
    orderStatus: 2
  }

  await useAxiosPatch('/admin/updateOrder', bodyObj, obj)
}
