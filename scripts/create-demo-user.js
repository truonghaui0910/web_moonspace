
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createDemoUser() {
  try {
    const hashedPassword = await bcrypt.hash('demo123', 12)
    
    const user = await prisma.user.create({
      data: {
        email: 'demo@moonspace.com',
        username: 'demo',
        password: hashedPassword,
        name: 'Demo User'
      }
    })
    
    console.log('Demo user created:', user)
  } catch (error) {
    console.error('Error creating demo user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createDemoUser()
