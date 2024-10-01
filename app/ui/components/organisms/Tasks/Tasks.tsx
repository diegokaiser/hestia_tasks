'use client'

import { Suspense, useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { FaCheck, FaPencilAlt, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import Apis from "@/app/libs/apis";
import SkeletonTasks from "@/app/ui/skeletons/organisms/Tasks";

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

const Task = ({userUid, listUid}: Props) => {
  const [dataTasks, setDataTasks] = useState<Task[]>([])
  const [error, setError] = useState<boolean>(true)
  const router = useRouter()
  
  const handleDeleteTask = async (userUid: string, listUid: string, taskUid: string) => {
    try {
      await Apis.tasks.DeleteTask(userUid, listUid, taskUid)
    } catch (error) {
      console.log(error)
    }
  }
  
  const gotoEdit = (taskUid: string) => {
    router.push(`/tasks/${listUid}/${taskUid}`)
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
          setError(false)
          setDataTasks(formattedTasks)
        })
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    getTasks()
  }, [userUid, listUid])

  if ( error ) {
    return <SkeletonTasks />
  }

  if ( !dataTasks ) {
    return null
  }
  
  return (
    <>
      <div className="hs__tasks flex flex-col gap-4">
        {dataTasks.length > 0 ? (
          <>
            {dataTasks.map(task => (
              <div 
                key={task.uid}
                className={`task relative completed-${task.completed} ${task.priority == 'high' ? 'priority' : ''}`}
              >
                <div 
                  className={`task__content cursor-pointer items-center grid grid-cols-6 gap-3 relative`}
                >
                  <div 
                    className={`task__completed flex items-center justify-center`}
                    onClick={() => handleUpdateTask(task.uid, task.completed)}
                  >
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
                  <div className={`font-semibold ${task.completed ? 'col-span-5' : 'col-span-3'} leading-tight`}>
                    {task.name}
                  </div>
                  {!task.completed && ( 
                    <>
                      <div 
                        className={`task__edit col-start-5 cursor-pointer flex flex-col gap-1 items-center justify-center`}
                        onClick={() => gotoEdit(task.uid)}
                      >
                        <FaPencilAlt />
                      </div>
                      <div 
                        className={`task__delete col-start-6 cursor-pointer flex flex-col gap-1 items-center justify-center `}
                        onClick={() => handleDeleteTask(userUid, listUid, task.uid)}
                      >
                        <FaRegTrashAlt />
                      </div>
                    </>
                  )}
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
    </>
  )
}

const Tasks = ({userUid, listUid}: Props) => {
  return (
    <Suspense fallback={<SkeletonTasks />}>
      <Task userUid={userUid} listUid={listUid} />
    </Suspense>
  )
}

export default Tasks
