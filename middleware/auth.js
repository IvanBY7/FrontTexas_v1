import { getToken } from '~/utils/cookies'

export default async function ({ store, redirect, route }) {
  const whitelist = ['auth-login', 'auth-register']
  // determine whether the user has logged in
  const token = getToken()

  if (token) {
    if (route.path === '/auth/login' || route.path === '/auth/register') {
      // if is logged in, redirect to the home page
      redirect('/')
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      try {
        // get user info
        const user = await store.dispatch('modules/auth/getUser', token)
        store.commit('user', {
          name: user.username,
          avatar: `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mouth]=smile&[eyes]=wink&[eyebrow]=default&[skin]=light`,
          ...user
        })
      } catch (error) {
        console.log(error)
        // remove token and go to login page to re-login
        await store.dispatch('modules/auth/logout')
        redirect(`/auth/login?redirect=${route.path}`)
      }
    }
  } else if (!whitelist.includes(route.name)) {
    redirect(`/auth/login?redirect=${route.path}`)
  }
  return Promise.resolve()
}
