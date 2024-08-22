'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from 'universal-cookie';
import Apis from "@/app/libs/apis";
import { LoadingScreen } from "@/app/ui/components/molecules";

interface Props {
  uid: string
}

const Lists = ({uid}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataLists, setDataLists] = useState<Array<object>>([])

  useEffect(() => {
    setLoading(true)
    const getLists = async () => {
      try {
        const res = await Apis.lists.GetLists(uid)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getLists()
  }, [])
  console.log(`dataLists: ${dataLists}`)

  return (
    <>
      <div className="hs__lists">
        {dataLists ? (
          <>
            {dataLists.map(list => {
              <div className="hs__lists-item">
                <Link
                  className="hs__lists-item btn btn-light mb-4 text-base w-full"
                  href={`/lists/${list.uid}`}
                >
                  {list.name}
                </Link>
              </div>
            })}
          </>
        ) : (
          <>
            <p>
              Aún no tienes listas de tareas.
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

export default Lists
