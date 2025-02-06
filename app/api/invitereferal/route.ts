import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd,idb,referal} = await req.json()

          
        let userA = await prisma.user.findFirst({
            where: { idd:idb }
        })
         
        if(userA){
            const gt = userA.referal
            if(gt.length <1){
                let userB = await prisma.user.findFirst({
                    where: { idd }
                })
                if(userB){
    
                   const str: string = String(userB?.invite)+String(idb)+",";
                   const nmb = str.split(',').map(Number);
                   const count = nmb.length <= 12 ? 50000:  0
                await prisma.user.update({
                    where: { idd},
                    data: {  
                        invite : str,
                        points : {increment : count}
                    }
                })
    
                await prisma.user.update({
                    where: { idd:idb },
                    data: {  
                        referal,
                        points : {increment : 30000}
                    }
                })
    
                }
            }
        }
            
        
        return NextResponse.json('')
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}
