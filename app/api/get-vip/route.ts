import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd} = await req.json()

        let user = await prisma.vipclub.findFirst({
            where: { idd }
        })
        
        if (!user) {
            const newdate = new Date()
            const increase = newdate.getTime() +(24*60*60*1000)
            user = await prisma.vipclub.create({
                data: {
                    idd: String(idd),
                    dateMining:new Date(increase),
                    ticket:1
                }
            })
          
        }else{
              await prisma.vipclub.updateMany({
                where: { idd },
                data: { date : new Date()}
            })
            
        }
        let userB = await prisma.vipclub.findFirst({
            where: { idd }
        })
        

        
        
        return NextResponse.json({success:true,ticket:String(userB?.ticket),dt:String(userB?.date),dtMining:String(userB?.dateMining)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}