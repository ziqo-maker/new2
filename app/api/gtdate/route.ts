import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd} = await req.json()

        const user = await prisma.user.findFirst({
            where: { idd }
        })
        
        return NextResponse.json({success:true,claim:user?.isClaim,mining:user?.isMining,dt:user?.date,dtMining:user?.dateMining,point:user?.points})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}