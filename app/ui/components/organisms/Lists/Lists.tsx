'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import Apis from "@/app/libs/apis";
import { LoadingScreen } from "@/app/ui/components/molecules";

interface List {
  uid: string,
  name: string
}

interface Props {
  uid: string
}

const Lists = ({uid}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataLists, setDataLists] = useState<List[]>([])

  useEffect(() => {
    setLoading(true)
    const getLists = async () => {
      try {
        const res = await Apis.lists.GetLists(uid)
        if ( res && Array.isArray(res) ) {
          const formattedLists = res.map((item: any) => ({
            uid: item.id,
            name: item.name
          }))
          setDataLists(formattedLists)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getLists()
  }, [uid])
  console.log(dataLists)

  return (
    <>
      <div className="hs__lists">
        {dataLists ? (
          <>
            {dataLists.map(list => (
              <div className="hs__lists-item">
                <Link
                  className="hs__lists-item btn btn-light mb-4 text-base w-full"
                  href={`/lists/${list.uid}`}
                >
                  {list.name}
                </Link>
              </div>
            ))}
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
