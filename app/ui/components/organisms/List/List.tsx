'use client'
import { useEffect, useState } from "react";
import Apis from "@/app/libs/apis";
import { LoadingScreen } from "@/app/ui/components/molecules";

interface List {
  uid: string,
  name: string,
}

interface Props {
  uid: string
}

const List = ({uid}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataList, setDataList] = useState<List[]>([])

  useEffect(() => {

  }, [uid])

  return (
    <>
      <div className="hs__list">

      </div>
    </>
  )
}

export default List
