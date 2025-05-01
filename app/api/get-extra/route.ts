import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd} = await req.json()

        let user = await prisma.extra.findFirst({
            where: { idd }
        })
        
        if (!user) {
            user = await prisma.extra.create({
                data: {
                    idd: String(idd),
                    items:''
                }
            })
          
        }
        
        return NextResponse.json({success:true,items:String(user.items)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}