import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import Cookies from "universal-cookie";
import { auth } from '@/app/libs/utils/firebase'

const cookies = new Cookies
const googleProvider = new GoogleAuthProvider()

const users = {
  Login: async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
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
  GoogleLogin: async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
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
    } catch (error) {
      console.info(`GoogleLogin: Error al identificarse:`)
      console.error(error)
    }
  },
  GoogleLogout: async () => {
    await users.Logout()
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
