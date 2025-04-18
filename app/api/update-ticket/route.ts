import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd,ticket} = await req.json()

        await prisma.ticket.updateMany({
            where: { idd },
            data: { 
                ticket
            }
        })
        
        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}