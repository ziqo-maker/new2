import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        
        const {idd,idb,referal,ticket} = await req.json()

          
        let userA = await prisma.user.findFirst({
            where: { idd:idb }
        })
         var cnt = 0
        if(userA){

               if(Number(idd) != Number(idb)){

                  const gt = userA.referal
            if(gt.length <1){
                let userB = await prisma.user.findFirst({
                    where: { idd }
                })
                if(userB){
    
                   const str: string = String(userB?.invite)+String(idb)+",";
                   const nmb = str.split(',').map(Number);
                   const count = nmb.length <= 12 ? 100000:  0
                await prisma.user.update({
                    where: { idd},
                    data: {  
                        invite : str,
                        points : {increment : count}
                    }
                })

                await prisma.ticket.updateMany({
                    where: { idd },
                    data: { 
                        ticket:"5"
                    }
                })

                await prisma.user.update({
                    where: { idd:idb },
                    data: {  
                        referal,
                        points : {increment : 50000}
                    }
                })
              cnt++
                }
            }
                   
               }
            
        }
            
        
        return NextResponse.json({success :true,first:String(cnt)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}
