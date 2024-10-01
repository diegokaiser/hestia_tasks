import { Nav } from '@/app/ui/components/wrappers'

export default function PageLayout({ 
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Nav />
    </>
  )
}
