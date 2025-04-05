import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {

        const {idd} = await req.json()

        let userB = await prisma.useticket.findFirst({
            where: { idd }
        })
         var gtuseticket = 0

        if (!userB) {
            gtuseticket++
        }
 
        const cal = gtuseticket == 0 ? userB?.ticket : '0'
        return NextResponse.json({success:true,useticket:String(cal)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
