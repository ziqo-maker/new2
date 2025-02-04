import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { useContext } from 'react';

export async function POST(req: NextRequest) {
    try {
        const {gtuser} = await req.json()
        
        const userData = gtuser
        if (!userData || !userData.id) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
        }

       let user = await prisma.user.findFirst({
            where: { idd: String(userData.id) }
        })

        // const gtprm = prm.prm || ''

        // if(String(gtprm).length != 0){
        //     let userB = await prisma.user.findFirst({
        //         where: { idd: String(gtprm) }
        //     })
        //     const str: string = String(userB?.invite)+','+String(userData.id);
        //     await prisma.user.update({
        //         where: { idd:String(gtprm) },
        //         data: {  
        //             invite : str
        //         }
        //     })
            
        // }
        
        

      
        if (!user) {
            user = await prisma.user.create({
                data: {
                    idd: String(userData.id),
                    username: userData.username,
                    firstName: userData.first_name || '',
                    lastName: userData.last_name || '',
                    donetasks: '',
                    pendingtasks : '',
                    tokenvalue: '0.00000001',
                    upgrade :'1,',
                    donecreatedtasks :'',
                    invite:'',
                    pendingcreatedtasks:'',
                     referal:''
                }
            })
        }else{
            // userContext!.updateUser(String(userData.id),String(user.points),String(user.speedlvl),)
        }



        return NextResponse.json(user)
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
