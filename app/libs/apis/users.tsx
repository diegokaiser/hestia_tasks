import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Cookies from "universal-cookie";
import { auth } from '@/app/libs/utils/firebase'

const cookies = new Cookies

const users = {
  Login: async (email: string, password: string) => {
    console.log(`email: ${email}`)
    console.log(`password: ${password}`)
    const res = await signInWithEmailAndPassword(auth, email, password)
    console.log(`res: ${res}`)
    if ( res ) {
      const user = {
        displayName: res.user.displayName,
        emailVerified: res.user.emailVerified,
        photoURL: res.user.photoURL,
        uid: res.user.uid
      }
      cookies.set('hestia', JSON.stringify(user), { path: '/' })
    }
    return res
  },
  Logout: async () => {
    const res = await signOut(auth)
    cookies.remove('hestia')
    return res
  },
  SignIn: async () => {

  },
  GetUser: async ( uid: string ) => {
    return uid
  },
  GetUsers: async () => {
    const users: object[] = []
    return users
  }
}

export default users
