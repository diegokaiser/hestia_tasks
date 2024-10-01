'use client'

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'universal-cookie';
import SkeletonNav from '@/app/ui/skeletons/wrappers/Nav';

interface User {
  uid: string;
  displayName?: string;
  emailVerified?: boolean;
  photoURL: string
}

const PreNav = () => {
  const cookies = new Cookies
  const [thisUser, setThisUser] = useState<User | null >(null)
  const [error, setError] = useState<boolean>(true)
  const router = useRouter()
  
  const handleLogout = () => {
    cookies.set('hestia', '', { path: '/' })
    router.push('/')
  }
  
  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('hestia')
      if ( user ) {
        setError(false)
        setThisUser(user)
      } else {
        setError(false)
      }
    }
    getUser()
  }, [])

  if ( error ) {
    return <SkeletonNav />
  }

  if ( !thisUser ) {
    return null
  }
  
  return (
    <>
      <nav className='nav'>
        <div className='flex items-center justify-between mx-auto my-0 w-11/12'>
          <div className='nav__avatar flex items-center'>
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
          </div>
          <div className='nav__actions'>
            <button
              className='btn btn-danger font-semibold uppercase'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

const Nav = () => {
  return (
    <Suspense>
      <PreNav />
    </Suspense>
  )
}

export default Nav
