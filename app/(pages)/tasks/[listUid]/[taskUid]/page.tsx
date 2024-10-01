'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Cookies from "universal-cookie"
import { Task } from "@/app/ui/components/organisms";

interface User {
  uid: string;
  displayName?: string;
  emailVerified?: boolean;
  photoURL: string
}

export default function Tasks() {
  const params = useParams()
  const taskUid = Array.isArray(params.taskUid) ? params.taskUid[0] : params.taskUid
  const listUid = Array.isArray(params.listUid) ? params.listUid[0] : params.listUid
  const cookies = new Cookies
  const [thisUser, setThisUser] = useState<User | null >(null)
  const router = useRouter()

  useEffect(() => {
    const getData = () => {
      const user = cookies.get('hestia')
      if ( user ) {
        setThisUser(user)
      }
    }
    getData()
  }, [])

  return (
    <>
      <div className="my-0 mx-auto py-4 w-11/12">
        <div className="hs__content mb-4">
          {thisUser && (
            <>
              <Task userUid={thisUser.uid} listUid={listUid} taskUid={taskUid} />
            </>
          )}
        </div>
      </div>
    </>
  )
}
