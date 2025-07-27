import { prisma } from '@/lib/prisma'

export default async function Home() {
  // Test database connection
  const userCount = await prisma.user.count()
  
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">YouTube CMS</h1>
      <p>Database connected! Users: {userCount}</p>
    </main>
  )
}