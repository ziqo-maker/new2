import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
      const {idd} = await req.json()
      const user = await prisma.user.findFirst({
        where: { idd }
        })
        if(user){
            const str: string = String(user?.invite);
            const t = str.split(',').map(String);
            const getTasks = await prisma.user.findMany({
                where: {
                    idd: {in: t}
                }
            })
            return NextResponse.json({success:true,all:getTasks})
        }
        
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}