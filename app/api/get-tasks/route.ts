import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
      const {idd} = await req.json()
      const user = await prisma.user.findUnique({
        where: { idd, }
        })
        const str: string = String(user?.donetasks);
        const t = str.split(',').map(Number);
        const getTasks = await prisma.doing.findMany({
            where: {
              NOT: {
                id: {in: t}
              }
            }
        })
        const strpending: string = String(user?.pendingtasks);
        const tpending = strpending.split(',').map(Number);
        return NextResponse.json({success:true,all:getTasks,donetasks:t,pendingtasks:tpending})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}
