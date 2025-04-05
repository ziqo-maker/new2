import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {

        const {idd} = await req.json()

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

       

        return NextResponse.json({success:true,ticket:String(user.ticket)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}