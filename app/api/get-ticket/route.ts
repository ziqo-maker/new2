import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {

        const {idd,ticket,ticketb} = await req.json()

       let user = await prisma.ticket.findFirst({
            where: { idd }
        })
              
        if (!user) {
            user = await prisma.ticket.create({
                data: {
                    idd,
                    ticket:"0"
                }
            })
          
        }

        let userB = await prisma.useticket.findFirst({
            where: { idd }
        })
         var gtuseticket = 0

        if (!userB) {
            gtuseticket=1
        }

        return NextResponse.json({success:true,ticket:String(user.ticket),useticket:String(gtuseticket == 0 ? userB?.ticket : '0')})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
