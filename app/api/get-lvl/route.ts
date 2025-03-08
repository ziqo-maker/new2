import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {

        const {idd} = await req.json()

       let user = await prisma.price.findFirst({
            where: { idd }
        })
              
        if (!user) {
            user = await prisma.price.create({
                data: {
                    idd,
                    lvl:"1"
                }
            })
          
        }

        return NextResponse.json({success:true,lvl:String(user.lvl)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}