import { 
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  serverTimestamp,
  query,
  updateDoc,
  where
} from "firebase/firestore"
import { db } from '@/app/libs/utils/firebase'

const lists = {
  GetList: async ( userUid: string, listUid: string ) => {
    try {
      const listDocRef = doc(db, 'data', userUid, 'lists', listUid)
      const listDoc = await getDoc(listDocRef)

      if ( !listDoc.exists() ) {
        return null
      }

      const { name } = listDoc.data()
      return name
    } catch (error) {
      console.info(`GetList: Error al obtener la lista ${listUid} del usuario ${userUid}:`)
      console.error(error)
    }
  },
  GetLists: async ( userUid: string ) => {
    try {
      const listCollectionRef = collection(db, 'data', userUid, 'lists')
      const q = query(listCollectionRef, orderBy('createdAt', 'asc'))
      const listSnapshot = await getDocs(q)

      const lists = listSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return lists
    } catch (error) {
      console.info(`GetList: Error al obtener la listas del usuario ${userUid}:`)
      console.error(error)
    }
  },
  PostList: async ( userUid: string, list: object ) => {
    try {
      const dataRef = doc(db, 'data', userUid)
      const listsCollectionRef = collection(dataRef, 'lists')

      const newListDoc = await addDoc(listsCollectionRef, {
        ...list,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: false
      })

      return newListDoc.id
    } catch (error) {
      console.info(`PostList: Error al crear la lista:`)
      console.error(error)
    }
  },
  PatchList: async ( userUid: string, listUid: string, list: object ) => {
    try {
      const listDocRef = doc(db, 'data', userUid, 'lists', listUid)
      const listDoc = await getDoc(listDocRef)

      if ( listDoc.exists() ) {
        await updateDoc(listDocRef, {
          ...list,
          updatedAt: serverTimestamp()
        })
        return true
      } else {
        return false
      }
    } catch (error) {
      console.info(`PatchList: Error al actualizar la lista:`)
      console.error(error)
    }
  },
  DeleteList: async ( userUid: string, listUid: string ) => {
    try {
      const listDocRef = doc(db, 'data', userUid, 'lists', listUid)
      const listDoc = await getDoc(listDocRef)

      if ( listDoc.exists() ) {
        await updateDoc(listDocRef, {
          status: 'deleted',
          updatedAt: serverTimestamp()
        })
        return true
      } else {
        return false
      }
    } catch (error) {
      console.info(`DeleteList: Error al eliminar la lista:`)
      console.error(error)
    }
  },
}

export default lists
