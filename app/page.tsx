'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Apis from '@/app/libs/apis'
import { Button, InputText } from "@/app/ui/components/atoms";
import { GoogleButton, LoadingScreen } from "@/app/ui/components/molecules";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = async (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await Apis.users.Login(email, password)
      console.log(res)
      if ( res ) {
        router.push('/dashboard')
      }
    } catch (error) {
      setError(true)
    }
  }

  // 3MiJ6R2glGF2Ql

  return (
    <div className="login mx-auto my-0 w-11/12">
      <div className="login__image mb-8">
        <h2 className="font-bold text-2xl">Welcome!</h2>
      </div>
      <form onSubmit={handleLogin} className="loginform">
        <div className="loginform__input">
          <InputText 
            className="mb-4 w-full"
            placeholder="Email:"
            type="text"
            onChange={handleChangeEmail}
          />
        </div>
        <div className="loginform__input">
          <InputText 
            className="mb-4 w-full"
            placeholder="Password:"
            type="password"
            onChange={handleChangePassword}
          />
        </div>
        <div className="loginform__input">
          <Button
            className="flex items-center justify-center w-full"
            color="success"
            inactive={!(email && password)}
            text="Login"
            type="submit" 
          />
        </div>
        <div className="loginform__separator py-8">
          <p className="font-light text-center text-sm">
            Or Login with
          </p>
        </div>
        <div className="loginform__input mb-8">
          <GoogleButton
            className="flex gap-2 items-center justify-center w-full" 
            color="light"
            inactive={false}
            text="Login with Google"
            type="button"
          />
        </div>
        <div className="font-light text-center text-sm">
          You Don&apos;t have an account?
          <br />
          <Link 
            className="font-semibold underline"
            href='/sign-up'
          >
            Sign up
          </Link>
        </div>
      </form>
      {loading && ( <LoadingScreen /> )}
    </div>
  );
}
