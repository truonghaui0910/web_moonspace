
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createDemoUser() {
  try {
    const hashedPassword = await bcrypt.hash('123456a@', 12)
    
    const user = await prisma.user.create({
      data: {
        email: 'truongpv@moonspace.com',
        username: 'truongpv',
        password: hashedPassword,
        name: 'Truong Pham'
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
