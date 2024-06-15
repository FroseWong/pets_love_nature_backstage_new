import { useAxiosPost } from './axios'

// const loginData = { account: 'admin', password: 'abc123456789' }

export const login = async (data) => {
  //   console.log('data', data)
  const res = await useAxiosPost('/admin/signIn', data)
  console.log('res?.data', res?.data)

  if (res?.data?.status === 'success') {
    // 成功登入
  } else {
    // 登入失敗
    // const obj = {
    //     mess
    // }
  }
  //   return res
}
