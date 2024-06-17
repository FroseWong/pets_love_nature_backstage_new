import { useAxiosPost } from './axios'
import router from '@/router'

// const loginData = { account: 'admin', password: 'abc123456789' }

export const login = async (data) => {
  //   console.log('data', data)
  const res = await useAxiosPost('/admin/signIn', data)
  console.log('res?.data', res?.data)
  console.log(res)

  if (res?.status === 'success') {
    // 成功登入
    console.log('成功登入')
    localStorage.setItem('token', res?.data?.token)
    router.push({ path: '/banner-setting' })
  } else {
    // 登入失敗
    // const obj = {
    //     mess
    // }
  }
  //   return res
}
