import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd,useticket,ticket,name} = await req.json()
        
                
        await prisma.ticket.updateMany({
            where: { idd },
            data: { 
                ticket
            }
        })

        let userB = await prisma.useticket.findFirst({
            where: { idd }
        })
              
        if (!userB) {
            userB = await prisma.useticket.create({
                data: {
                    idd,
                    ticket:useticket,
                     name
                }
            })
        }else{
            await prisma.useticket.updateMany({
                where: { idd },
                data: { 
                    ticket:useticket,
                    name
                }
            })
        }
        
        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}