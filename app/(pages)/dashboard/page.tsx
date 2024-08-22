'use client'

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'universal-cookie';
import { Button } from "@/app/ui/components/atoms";
import { Lists } from "@/app/ui/components/organisms";
import { LoadingScreen } from "@/app/ui/components/molecules";

export default function Dashboard() {
  const cookies = new Cookies
  const [loading, setLoading] = useState<boolean>(false)
  const [thisUser, setThisUser] = useState<object>({})
  const router = useRouter()

  const handleCreateList = () => {
    router.push('/lists/create')
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
        <div className="hs__content mb-4">
          <h3 className="font-semibold mb-4 text-2xl">
            Your lists
          </h3>
          <Lists uid={thisUser.uid} />
        </div>
        <div className="hs__actions">
          <Button
            className="flex items-center justify-center w-full"
            color="primary"
            inactive={false}
            text="Create a new list"
            type="button"
            onClick={handleCreateList}
          />
        </div>
      </div>
    </>
  )
}
