import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import React,{useState} from 'react';
  
  
export async function POST(req: NextRequest) {
    try {
        const userData = await req.json()

        if (!userData || !userData.id) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
        }

       let user = await prisma.user.findFirst({
            where: { idd: String(userData.id) }
        })
              
        var cnt = 0
        if (!user) {
            user = await prisma.user.create({
                data: {
                    idd: String(userData.id),
                    username: userData.username || '',
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
            cnt++
        }

        
const fs = userData.first_name || userData.last_name  || userData.username || ''
      if(String(fs) === String(user.firstName)){
        
      }else{
        await prisma.user.update({
            where: { idd:String(userData.id) },
            data: { 
                firstName: String(fs)
            }
        })
      }
      
      let userB = await prisma.ticket.findFirst({
            where: { idd:String(userData.id) }
        })
              
        if (!userB) {
            userB = await prisma.ticket.create({
                data: {
                    idd:String(userData.id),
                    ticket:"0"
                }
            })
          
        }
        return NextResponse.json({idd:String(userData.id),gtpoint:String(user.points),selectcharacter:String(user.selectcharacter),speedlvl:String(user.speedlvl),
            upgrade:String(user.upgrade),username:String(user.username),value:String(user.tokenvalue),first:String(cnt),firstName: String(fs),ticket:String(userB.ticket)})
    } catch (error) {
        console.error('Error processing user data:', error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
