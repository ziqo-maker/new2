import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { useContext } from 'react';

export async function POST(req: NextRequest) {
    try {

        const {idd,address,network,amount,status,points} = await req.json()

        
          const user =  await prisma.payment.create({
                data: {
                    idd,
                    address,
                    amount,
                    status,
                    network
                }
            })
             
            if(user){
                await prisma.user.update({
                    where: { idd },
                    data: {  
                        points
                    }
                })
            }
           
        



        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}