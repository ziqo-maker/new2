import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd,tokenvalue,task} = await req.json()

         await prisma.user.update({
            where: { idd },
            data: { tokenvalue }
        })

        await prisma.inviteTask.create({
            data: {
                idd,
                task
            }
        })
        
        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}