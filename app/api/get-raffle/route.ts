import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
    try {

       let raffle =  await prisma.raffle.update({
        where: { id:1 },
        data: { date1 : new Date()}
    })            

        return NextResponse.json({success:true,date1:String(raffle?.date1),date2:String(raffle?.date2),priceton:String(raffle?.priceton)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}