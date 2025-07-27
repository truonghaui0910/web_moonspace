
import { prisma } from '@/lib/prisma'

export default async function Home() {
  let userCount = 0;
  let dbStatus = 'Connected';
  
  try {
    // Test database connection
    userCount = await prisma.user.count()
  } catch (error) {
    console.error('Database connection error:', error);
    dbStatus = 'Connection failed';
  }
  
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">YouTube CMS</h1>
      <p>Database status: {dbStatus}</p>
      {dbStatus === 'Connected' && <p>Users: {userCount}</p>}
    </main>
  )
}
