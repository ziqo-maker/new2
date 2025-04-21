import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {

        const {idd,amount,transactionid,forwhat} = await req.json()
        
           await prisma.buywithstar.create({
                data: {
                    idd,
                    amount,
                    transactionid,
                    forwhat
                }
            })



        return NextResponse.json({success:true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}