import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const userData = await req.json()
        
        if (!userData || !userData.id) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
        }

       let user = await prisma.user.findFirst({
            where: { idd: String(userData.id) }
        })
        
        // window.localStorage.setItem('userid', userData.id)
        // const gt = localStorage.getItem('test')
        // if (!user) {
        //     user = await prisma.user.create({
        //         data: {
        //             idd: String(userData.id),
        //             username: userData.username,
        //             firstName: userData.first_name || '',
        //             lastName: userData.last_name || '',
        //             donetasks: '',
        //             pendingtasks : ''
        //         }
        //     })
        // }

        // var userid = localStorage.getItem("userid");
        // if (userid !== String(userData.id)) {    
        //   localStorage.clear();
        //   localStorage.setItem("userid", String(userData.id));
        // }
        // localStorage.setItem("point", String(user.points));

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
