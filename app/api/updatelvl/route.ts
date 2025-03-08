import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd,tokenvalue,lvl} = await req.json()

         await prisma.user.update({
            where: { idd },
            data: { tokenvalue }
        })
          
        let user = await prisma.price.findFirst({
            where: { idd }
        })
        if(user){
            await prisma.price.update({
                where: idd,
                data: { lvl }
            }) 
        }
        
        
        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}