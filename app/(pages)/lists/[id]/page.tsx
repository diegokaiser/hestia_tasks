'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'universal-cookie';
import { Button } from '@/app/ui/components/atoms';
import { ListTitle, LoadingScreen } from "@/app/ui/components/molecules";
import { Tasks } from '@/app/ui/components/organisms';

interface User {
  uid: string;
  displayName?: string;
  emailVerified?: boolean;
  photoURL: string
}

export default function List() {
  const params = useParams()
  const uid = Array.isArray(params.id) ? params.id[0] : params.id
  const cookies = new Cookies
  const [loading, setLoading] = useState<boolean>(false)
  const [thisUser, setThisUser] = useState<User | null >(null)
  const router = useRouter()

  const handleCreateTask = () => {
    router.push(`/tasks/create/${uid}`)
  }

  useEffect(() => {
    setLoading(true)
    const getData = () => {
      const user = cookies.get('hestia')
      if ( user ) {
        setThisUser(user)
      }
      setLoading(false) 
    }
    getData()
  }, [])

  return (
    <>
      <div className="my-0 mx-auto py-4 w-11/12">
        <div className="hs__content mb-4">  
          {thisUser && (
            <>
              <ListTitle userUid={thisUser.uid} listUid={uid} />
              <Tasks userUid={thisUser.uid} listUid={uid} />
            </>
          )}
        </div>
        <div className="hs__actions">
          <Button
            className='flex items-center justify-center w-full'
            color='primary'
            inactive={false}
            text="Create a new task"
            type='button'
            onClick={handleCreateTask}
          />
        </div>
      </div>
      {loading && ( <LoadingScreen /> )}
    </>
  )
}
