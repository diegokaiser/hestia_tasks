import Link from "next/link"

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <div className="my-0 mx-auto pb-28 pt-4 w-11/12">
        <Link
          className="btn btn-light flex items-center justify-center w-full"
          href='/dashboard'
        >
          Go to dashboard
        </Link>
      </div>
    </>
  )
}
