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
        let user = await prisma.user.findFirst({
            where: { idd }
        })
        const nameb = String(user?.firstName).length == 0 ?  String(user?.username) : String(user?.firstName)
        let userB = await prisma.useticket.findFirst({
            where: { idd }
        })
              
        if (!userB) {
            userB = await prisma.useticket.create({
                data: {
                    idd,
                    ticket:useticket,
                    name:String(nameb)
                }
            })
        }else{
            await prisma.useticket.updateMany({
                where: { idd },
                data: { 
                    ticket:useticket,
                    name:String(nameb)
                }
            })
        }
        
        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}