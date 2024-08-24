import { 
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  serverTimestamp,
  query,
  updateDoc
} from "firebase/firestore"
import { db } from '@/app/libs/utils/firebase'

const tasks = {
  GetTask: async ( userUid: string, listUid: string, taskUid: string, callback: (data: object | null) => void ) => {
    try {
      const taskDocRef = doc(db, 'data', userUid, 'lists', listUid, 'tasks', taskUid)
      onSnapshot(taskDocRef, (docSnapshot) => {
        if ( docSnapshot.exists() ) {
          callback(docSnapshot.data())
        } else {
          callback(null)
        }
      })
    } catch (error) {
      console.info(`GetTask: Error al obtener la tarea ${taskUid} de la lista ${listUid} del usuario ${userUid}:`)
      console.error(error)
    }
  },
  GetTasks: async ( userUid: string, listUid: string, callback: (data: object[]) => void ) => {
    try {
      const tasksCollectionRef = collection(db, 'data', userUid, 'lists', listUid, 'tasks')
      onSnapshot(tasksCollectionRef, (snapshot) => {
        const tasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        callback(tasks)
      })
    } catch (error) {
      console.info(`GetTasks: Error al obtener la tareas de la lista ${listUid} del usuario ${userUid}:`)
      console.error(error)
    }
  },
  PostTask: async ( userUid: string, listUid: string, task: object ) => {
    try {
      const tasksCollectionRef = collection(db, 'data', userUid, 'lists', listUid, 'tasks')
      const newTask = {
        ...task,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: true
      }
      const taskDocRef = await addDoc(tasksCollectionRef, newTask)
      return taskDocRef.id
    } catch (error) {
      console.info(`PostTask: Error al crear una tarea en la lista ${listUid} del usuario ${userUid}:`)
      console.error(error)
    }
  },
  PatchTask: async ( userUid: string, listUid: string, taskUid: string, task: object ) => {
    try {
      const taskDocRef = doc(db, 'data', userUid, 'lists', listUid, 'tasks', taskUid)
      const updatedData = {
        ...task,
        updatedAt: serverTimestamp()
      }
      await updateDoc(taskDocRef, updatedData)
    } catch (error) {
      console.info(`PatchTask: Error al actualizar la tarea ${taskUid} de la lista ${listUid} del usuario ${userUid}:`)
      console.error(error)
    }
  },
  UpdateStatus: async ( userUid: string, listUid: string, taskUid: string, completed: boolean ) => {
    try {
      const taskDocRef = doc(db, 'data', userUid, 'lists', listUid, 'tasks', taskUid)
      await updateDoc(taskDocRef, {
        completed: completed,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.info(`UpdateStatus: Error al actualizar la tarea ${userUid} de la lista ${listUid} del usuario ${userUid}:`)
      console.error(error)
    }
  },
  DeleteTask: async ( userUid: string, listUid: string, taskUid: string ) => {
    try {
      const taskDocRef = doc(db, 'data', userUid, 'lists', listUid, 'tasks', taskUid)
      await updateDoc(taskDocRef, {
        status: 'deleted',
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.info(`DeleteTask: Error al actualizar la tarea ${userUid} de la lista ${listUid} del usuario ${userUid}:`)
      console.error(error)
    }
  }
}

export default tasks
