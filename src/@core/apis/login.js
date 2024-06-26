import { useAxiosPost } from './axios'
import router from '@/router'

// const loginData = { account: 'admin', password: 'abc123456789' }

export const login = async (data) => {
  //   console.log('data', data)
  try {
    const res = await useAxiosPost('/admin/signIn', data)

    if (res?.status === 'success') {
      // 成功登入
      console.log('成功登入')
      localStorage.setItem('token', res?.data?.token)
      router.push({ path: '/products' })
    } else {
      alert('登入失敗，請確認帳號密碼')
    }
  } catch (e) {
    alert('登入失敗，請確認帳號密碼')
  }
}
