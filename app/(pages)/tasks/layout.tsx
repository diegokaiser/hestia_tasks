'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/components/atoms";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <>
      {children}
      <div className="my-0 mx-auto py-4 w-11/12">
        <Button
          className="flex items-center justify-center w-full"
          color="light"
          inactive={false}
          text="Go back"
          type="button"
          onClick={goBack}
        />
      </div>
    </>
  )
}
