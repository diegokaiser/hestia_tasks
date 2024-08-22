'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'universal-cookie';
import { Loading } from '@/app/ui/components/atoms';
import { LoadingScreen } from "@/app/ui/components/molecules";

interface User {
  uid: string;
  displayName?: string;
  emailVerified?: boolean;
  photoURL: string
}

const Nav = () => {
  const cookies = new Cookies
  const [loading, setLoading] = useState<boolean>(false)
  const [thisUser, setThisUser] = useState<User | null >(null)
  const router = useRouter()

  const handleLogout = () => {
    setLoading(true)
    cookies.set('hestia', '', { path: '/' })
    router.push('/')
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
      <nav className='nav'>
        <div className='flex items-center justify-between mx-auto my-0 w-11/12'>
          <div className='nav__avatar flex items-center'>
            {loading ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                {thisUser && (
                  <>
                    {thisUser.displayName == null ? (
                      <>
                        <p className='ml-3'>
                          Welcome!
                        </p>
                      </>
                    ) : (
                      <>
                        <Image 
                          alt={thisUser.photoURL}
                          src={thisUser.photoURL}
                          height={35}
                          width={35}
                          loading='lazy'
                        />
                        <p className='ml-3'>
                          {thisUser.displayName}
                        </p>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className='nav__actions'>
            <button
              className='btn btn-danger uppercase'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      {loading && ( <LoadingScreen /> )}
    </>
  )
}

export default Nav
