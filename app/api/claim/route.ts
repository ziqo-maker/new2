import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd,miningPoint} = await req.json()

         await prisma.user.update({
            where: { idd },
            data: { 
                isClaim : 1,
                isMining : 0,
                points : {increment : miningPoint}
            }
        })
        
        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}