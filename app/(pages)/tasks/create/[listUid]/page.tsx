'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis'
import { Button, InputText } from "@/app/ui/components/atoms";
import { LoadingScreen } from "@/app/ui/components/molecules";

interface User {
  uid: string;
  displayName?: string;
  emailVerified?: boolean;
  photoURL: string
}

export default function CreatePage() {
  const params = useParams()
  const listUid = Array.isArray(params.listUid) ? params.listUid[0] : params.listUid
  const cookies = new Cookies
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

  const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const task = {
      name: taskName,
      priority: priority ? priority : 'low',
      completed: false
    }
    try {
      if ( thisUser ) {
        await Apis.tasks.PostTask(thisUser.uid, listUid, task)
        router.back()
      }
    } catch (error) {
      console.log(error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

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
          onSubmit={handleCreateTask}
        >
          <h3 className="font-semibold mb-4 text-2xl">
            Create task
          </h3>
          <div className="hs__forms-item mb-4">
            <InputText
              className='w-full'
              placeholder='Task name...'
              type='text'
              onChange={handleChangeTaskName}
            />
          </div>
          <div className="hs__forms-item mb-4">
            <select
              className='w-full'
              onChange={handleChangePriority}
            >
              <option value="0">Seleccionar prioridad</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="hs__forms-actions">
            <Button
              className='flex items-center justify-center w-full'
              color="success"
              inactive={!taskName}
              text="Create task"
              type="submit"
            />
          </div>
        </form>
      </div>
      {loading && ( <LoadingScreen /> )}
    </>
  )
}
