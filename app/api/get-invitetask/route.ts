import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
      const {idd} = await req.json()
      const user = await prisma.inviteTask.findMany({
        where: { idd, }
        })
       
        return NextResponse.json({success:true,all:user})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}