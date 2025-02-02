import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {

        const {describe,contact,keyword,platform,project,url,clicks,points,idd,keyworddescribe} = await req.json()
        
           await prisma.taskuser.create({
                data: {
                    describe,
                    contact,
                    keyword,
                    platform,
                    project,
                    url,
                    verify:'false',
                    clicks,
                    keyworddescribe
                }
            })

            await prisma.user.update({
                where: { idd },
                data: { 
                    points
                }
            })
        



        return NextResponse.json({success:true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}