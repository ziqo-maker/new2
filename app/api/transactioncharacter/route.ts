import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { useContext } from 'react';

export async function POST(req: NextRequest) {
    try {

        const {idd,amount,idcharacter} = await req.json()

        
          await prisma.transactioncharacter.create({
                data: {
                    idd,
                    amount,
                    idcharacter
                }
            })
        



        return NextResponse.json({success :true})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}