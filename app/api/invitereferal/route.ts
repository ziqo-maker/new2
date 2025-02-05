import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd,idb,referal} = await req.json()

          

      
            let userB = await prisma.user.findFirst({
                where: { idd }
            })
            if(userB){

                const str: string = String(userB?.invite)+String(idb)+",";
            await prisma.user.update({
                where: { idd},
                data: {  
                    invite : str
                }
            })

            await prisma.user.update({
                where: { idd:idb },
                data: {  
                    referal
                }
            })

            }
            
        
        return NextResponse.json('')
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}
