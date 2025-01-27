import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd} = await req.json()

        const updateuser = await prisma.user.update({
            where: { idd },
            data: { date : new Date()}
        })
        const newdate = new Date(updateuser.date)
        const increase = newdate.getTime() +(2*60*60*1000)
        await prisma.user.update({
            where: { idd },
            data: { 
                dateMining : new Date(increase),
                isMining : 1,
                isClaim :0
            }
        })
        
        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}