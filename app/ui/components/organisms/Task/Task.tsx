'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis'
import { Button, InputText } from "@/app/ui/components/atoms";

interface Task {
  uid: string,
  name: string,
  priority: string,
  updatedAt: string
}

interface User {
  uid: string;
  displayName?: string;
  emailVerified?: boolean;
  photoURL: string
}

interface Props {
  userUid: string,
  listUid: string,
  taskUid: string
}

const Task = ({userUid, listUid, taskUid}: Props) => {
  const [dataTask, setDataTask] = useState<Task | null >(null)
  const cookies = new Cookies()
  const [loading, setLoading] = useState<boolean>(false)
  const [thisUser, setThisUser] = useState<User | null >(null)
  const [taskName, setTaskName] = useState<string>('')
  const [priority, setPriority] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  const handleChangeTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value)
  }

  const handleChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value)
  }

  const handleUpdateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const task = {
      name: taskName,
      priority,
      updatedAt: new Date().toISOString()
    }
    try {
      if ( thisUser ) {
        await Apis.tasks.PatchTask(thisUser.uid, listUid, taskUid, task)
        setError(false)
        router.back()
      }
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await Apis.tasks.GetTask(userUid, listUid, taskUid)
        if ( res ) {
          const taskData: Task = {
            uid: res.uid,
            name: res.name,
            priority: res.priority,
            updatedAt: res.updatedAt
          }
          setDataTask(taskData)
          setTaskName(res.name)
          setPriority(res.priority)
        }
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    getTask()
  }, [userUid, listUid, taskUid])

  useEffect(() => {
    setLoading(true)
    const getUser = () => {
      const user = cookies.get('hestia')
      if ( user ) {
        setThisUser(user)
      }
      setLoading(false)
    }
    getUser()
  }, [])

  return (
    <>
      <div className="my-0 mx-auto pt-4 w-11/12">
        <form
          className="hs__forms mb-4"
          onSubmit={handleUpdateTask}
        >
          <h3 className="font-semibold mb-4 text-2xl">
            Edit task
          </h3>
          <div className="hs__forms-item mb-4">
            <InputText
              className='w-full'
              type='text'
              onChange={handleChangeTaskName}
              value={taskName}
            />
          </div>
          <div className="hs__forms-item mb-4">
            <select
              className='w-full'
              onChange={handleChangePriority}
              value={priority}
            >
              <option value="0">Select priority</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="hs__forms-actions">
            <Button
              className='flex items-center justify-center w-full'
              color="primary"
              inactive={!taskName}
              text="Update task"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default Task
