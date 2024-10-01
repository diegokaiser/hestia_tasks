'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
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
  const cookies = new Cookies
  const [loading, setLoading] = useState<boolean>(false)
  const [thisUser, setThisUser] = useState<User | null >(null)
  const [listName, setListName] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  const handleChangeListName = (e: ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value)
  }

  const handleCreateList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const list = {
      name: listName
    }
    try {
      if ( thisUser ) {
        const res = await Apis.lists.PostList(thisUser.uid, list)
        if ( res ) {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      setError(true)
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
      <div className="my-0 mx-auto py-4 w-11/12">
        <form
          className="hs__forms mb-4"
          onSubmit={handleCreateList}
        >
          <h3 className="font-semibold mb-4 text-2xl">
            Crear lista
          </h3>
          <div className="hs__forms-item mb-4">
            <InputText
              className="w-full"
              placeholder="List name..."
              type="text"
              onChange={handleChangeListName}
            />
          </div>
          <div className="hs__forms-item mb-4">

          </div>
          <div className="hs__forms-actions">
            <Button
              className="flex items-center justify-center w-full"
              color="success"
              inactive={!listName}
              text="Create list"
              type="submit"
            />
          </div>
        </form>
      </div>
      {loading && ( <LoadingScreen /> )}
    </>
  )
}
