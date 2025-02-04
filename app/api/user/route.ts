import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { useContext } from 'react';

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json()
        
        if (!userData || !userData.id) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
        }

       let user = await prisma.user.findFirst({
            where: { idd: String(userData.id) }
        })
        
      
        if (!user) {
            // user = await prisma.user.create({
            //     data: {
            //         idd: String(userData.id),
            //         username: userData.username,
            //         firstName: userData.first_name || '',
            //         lastName: userData.last_name || '',
            //         donetasks: '',
            //         pendingtasks : '',
            //         tokenvalue: '0.00000001',
            //         upgrade :'1,',

            //     }
            // })
        }else{
            // userContext!.updateUser(String(userData.id),String(user.points),String(user.speedlvl),)
        }



        return NextResponse.json(user)
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
