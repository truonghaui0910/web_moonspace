
import { prisma } from '@/lib/prisma'
import LogoDemo from '@/components/LogoDemo'

export default async function Home() {
  let userCount = 0;
  let dbStatus = 'Connected';
  let errorMessage = '';
  
  try {
    // Test database connection with timeout
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database connection timeout')), 10000)
    );
    
    const query = prisma.user.count();
    userCount = await Promise.race([query, timeout]) as number;
    
  } catch (error: any) {
    console.error('Database connection error:', error);
    dbStatus = 'Connection failed';
    errorMessage = error.message || 'Unknown database error';
  }
  
  return (
    <main className="min-h-screen">
      {/* Logo Demo Section */}
      <LogoDemo />
      
      {/* Database Status Section */}
      <div className="p-8 border-t border-gray-200">
        <h1 className="text-2xl font-bold">YouTube CMS</h1>
        <p>Database status: <span className={dbStatus === 'Connected' ? 'text-green-600' : 'text-red-600'}>{dbStatus}</span></p>
        {dbStatus === 'Connected' && <p>Users: {userCount}</p>}
        {dbStatus === 'Connection failed' && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p><strong>Error:</strong> {errorMessage}</p>
            <p className="mt-2 text-sm">
              This might be because:
              <br />• Supabase database is sleeping (try refreshing in a few seconds)
              <br />• Environment variables are not loaded correctly
              <br />• Network connectivity issues
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
