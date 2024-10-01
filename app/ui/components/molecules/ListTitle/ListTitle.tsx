'use client'

import { Suspense, useEffect, useState } from "react"
import Apis from "@/app/libs/apis";
import SkeletonListTitle from "@/app/ui/skeletons/molecules/ListTitle";

interface Props {
  userUid: string
  listUid: string
}

const Title = ({userUid, listUid}: Props) => {
  const [list, setList] = useState<string>('')
  const [error, setError] = useState<boolean>(true)
  
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await Apis.lists.GetList(userUid, listUid)
        if ( res ) {
          setError(false)
          setList(res)
        }
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    getList()
  }, [userUid, listUid])

  if ( error ) {
    return <SkeletonListTitle />
  }

  if ( !list ) {
    return null
  }
  
  return (
    <>
      <h3 className="font-semibold mb-4 text-2xl">
        {list}
      </h3>
    </>
  )
}

const ListTitle = ({userUid, listUid}: Props) => {
  return (
    <Suspense fallback={<SkeletonListTitle />}>
      <Title userUid={userUid} listUid={listUid} />
    </Suspense>
  )
}

export default ListTitle
