import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd} = await req.json()
            const newdate = new Date()
            const increase = newdate.getTime() +(24*60*60*1000)
       await prisma.watchads.updateMany({
            where: { idd },
            data: { 
                dateMining:new Date(increase),
                cnt:0
             }
        })   
        let userB = await prisma.watchads.findFirst({
            where: { idd }
        })
        return NextResponse.json({success:true,cnt:String(userB?.cnt),dt:String(userB?.date),dtMining:String(userB?.dateMining)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}
