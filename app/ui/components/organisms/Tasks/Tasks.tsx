'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { FaCheck, FaPencilAlt, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa6";
import Apis from "@/app/libs/apis";
import { LoadingScreen } from "@/app/ui/components/molecules";

interface Task {
  uid: string,
  name: string,
  status: string,
  completed: boolean,
  priority: string
}

interface Props {
  userUid: string,
  listUid: string
}

const Tasks = ({userUid, listUid}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataTasks, setDataTasks] = useState<Task[]>([])
  const router = useRouter()

  const handleDeleteTask = async (userUid: string, listUid: string, taskUid: string) => {
    setLoading(true)
    try {
      await Apis.tasks.DeleteTask(userUid, listUid, taskUid)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const gotoEdit = (taskUid: string) => {
    router.push(`/tasks/${taskUid}`)
  }

  const handleUpdateTask = async (taskUid: string, currentCompleted: boolean) => {
    try {
      const newCompleted = !currentCompleted
      await Apis.tasks.UpdateStatus(userUid, listUid, taskUid, newCompleted)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    const getTasks = async () => {
      try {
        await Apis.tasks.GetTasks(userUid, listUid, (tasks) => {
          const formattedTasks = tasks.map((item: any) => ({
            uid: item.id,
            name: item.name,
            status: item.status,
            completed: item.completed,
            priority: item.priority
          }))
          setDataTasks(formattedTasks)
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getTasks()
  }, [userUid, listUid])

  return (
    <>
      <div className="hs__tasks flex flex-col gap-3 overflow-hidden">
        {dataTasks.length > 0 ? (
          <>
            {dataTasks.map(task => (
              <div 
                key={task.uid}
                className={`task overflow-x-auto scroll-smooth relative scrollbar-hide`}
                onClick={() => handleUpdateTask(task.uid, task.completed)}
              >
                <div className={`task__edit absolute cursor-pointer flex flex-col gap-1 items-center justify-center`} style={{ right: '-81px' }}>
                  <FaPencilAlt />
                  <p className="text-xs">Edit</p>
                </div>
                <div className={`task__content completed-${task.completed} cursor-pointer flex gap-3 items-center justify-start relative`}>
                  <div className={`task__completed flex items-center justify-center`}>
                    {task.completed ? (
                      <>
                        <FaCheck />
                      </>
                    ) : (
                      <>
                        <FaTimes />
                      </>
                    )}
                  </div>
                  <div className="font-semibold">
                    {task.name}
                  </div>
                  {task.priority == 'high' && (
                    <div className="task__priority absolute flex items-center justify-center">
                      <FaExclamation />
                    </div>
                  )}
                </div>
                <div className={`task__delete absolute cursor-pointer flex flex-col gap-1 items-center justify-center `} style={{ right: '-154px' }}>
                  <FaRegTrashAlt />
                  <p className="text-xs">Delete</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <p>
              Aún no tienes tareas en esta lista.
            </p>
            <p>
              Por favor, crea una:
            </p>
          </>
        )}
      </div>
      {loading && ( <LoadingScreen /> )}
    </>
  )
}

export default Tasks
