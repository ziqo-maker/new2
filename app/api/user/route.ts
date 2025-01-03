import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json()
        
        if (!userData || !userData.id) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
        }

        let user = await prisma.user.findFirst({
            where: { id: userData.id }
        })

        
        // if (!user) {
            // user = await prisma.user.create({
            //     data: {
            //         username: userData.username,
            //         firstName: userData.first_name || '',
            //         lastName: userData.last_name || ''
            //     }
            // })
        // }

        return NextResponse.json({ error: userData.id }, { status: 400 })
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
