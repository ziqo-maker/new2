import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { NewUserContext } from '@/contexts/UserContextB';
import React from 'react';


export async function POST(req: NextRequest) {
    try {
        const userData = await req.json()

         const { UserDt,setUserData } = React.useContext(NewUserContext);
        
        if (!userData || !userData.id) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
        }

       let user = await prisma.user.findFirst({
            where: { idd: String(userData.id) }
        })
              
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
                    referal:'',
                    speedlvl:1,
                    points:0,
                    selectcharacter:1
                }
            })
            setUserData({idd:String(userData.id),gtpoint:"0",selectcharacter:"1",speedlvl:"1",
                upgrade:"1",username:String(userData.username),value:"0.00000001"
              })
        }else{
          setUserData({idd:String(userData.id),gtpoint:String(user.points),selectcharacter:String(user.selectcharacter),speedlvl:String(user.speedlvl),
            upgrade:String(user.upgrade),username:String(user.username),value:String(user.tokenvalue)
          })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
