import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {     
      
        const getTasks = await prisma.useticket.findMany({
            orderBy: [
                {
                  ticket: 'desc'
                }]
        })
       
        return NextResponse.json({success:true,all:getTasks})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}