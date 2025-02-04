import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {prm,idd} = await req.json()

          

      
            let userB = await prisma.user.findFirst({
                where: { idd: String(prm.prm) }
            })
            if(userB){

                const str: string = String(userB?.invite)+','+String(idd);
            await prisma.user.update({
                where: { idd:String(prm.prm) },
                data: {  
                    invite : str
                }
            })

            await prisma.user.update({
                where: { idd },
                data: {  
                    referal : String(prm.prm)
                }
            })

            }
            
        
        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}
