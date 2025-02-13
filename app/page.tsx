  'use client'

  import { useEffect, useState } from 'react'
  import { WebApp } from '@twa-dev/types'
  import { TabProvider } from '@/contexts/TabContext'
  import NavigationBar from "@/components/NavigationBar"
  import TabContainer from "@/components/TabContainer"
  import { UserNew } from '@/contexts/UserContextB'
  import Image, {StaticImageData} from "next/image"
  import StartPic from '@/imgs/startpic.webp';  
  import getGoogleplay from '@/imgs/getgoogleplay.webp';  
  import WalkTask from '@/imgs/walktask.webp';  
  import AppleStore from '@/imgs/applestore.webp';  
  import { NewUserContext } from '@/contexts/UserContextB';
  import React from 'react';

  declare global {
    interface Window {
      Telegram?: {
        WebApp: WebApp
      }
    }
  }

  export default function Home() {
    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const { UserDt,setUserData } = React.useContext(NewUserContext);
    const [gtid, setid] = useState<string>("")

    useEffect(() => {

      const initWebApp = async () => {

        try {
          fetch('/api/updatedt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idd: String("6124587322") }),
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            
          } else {
            
          }
        })
      } catch (err) {
      }

      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp
        tg.ready()

        const initDataUnsafe = tg.initDataUnsafe || {}
        const prm = tg.initDataUnsafe.start_param|| ''
       
        if (initDataUnsafe.user) {
          fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(initDataUnsafe.user),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                setError(data.error)
              } else {
                setUserData({idd:String(data.idd),gtpoint:String(data.points),selectcharacter:String(data.selectcharacter),speedlvl:String(data.speedlvl),
                  upgrade:String(data.upgrade),username:String(data.username),value:String(data.tokenvalue)
                })
               
                if(prm.length > 0){
                  try {
                    fetch('/api/invitereferal', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idd:String(prm),idb: String(data.idd),referal:String(prm) }),
                  })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.success) {
                      
                    } else {
                      
                    }
                  })
                } catch (err) {
                }
                }
                setid(data.idd)
                setUser(data)
              }
            })
            .catch((err) => {
              setError('Failed to fetch user data')
            })
        } else {
          setError('No user data available')
        }
      } else {
        setError('This app should be opened in Telegram')
      } 

      };

      initWebApp();

    }, [])

    // if (error) {
    //   return <div className="container mx-auto p-4 text-red-500">{error}</div>
    // }

    if (!user) return (
      <div className="container flex flex-col  mx-auto h-screen justify-between items-center w-full bg-[#ffae19] ">
          <div className='flex h-10'/>

       

               <Image 
        src={StartPic as StaticImageData} 
      className="size-20 glowbx rounded-full border-2 border-[#fda500] animate-waving-hand aspect-square object-fit"
      alt=""
    />
           
         
       <div className='flex space-x-1'>
        <div className='flex flex-col justify-center items-center'>
          <Image 
        src={WalkTask as StaticImageData}
         
      className="size-10  aspect-square rounded-xl object-cover"
      alt=""
    />
      
                  <p className="text-white font-Large">WalkTask{gtid}</p>

        </div>
        <button onClick={() => window.open("https://play.google.com/store/apps/details?id=com.walktask.app&pcampaignid=web_share")}>
          
          <Image 
           src={getGoogleplay as StaticImageData} 
         className="size-28 aspect-square object-cover"
         alt=""
       />
       </button>
       
       
      
       </div>
      </div>
    )

    return (
      <UserNew>
    
  <TabProvider>
        <main className='main-h-screen content-around bg-white '>
          <TabContainer/>
          <NavigationBar/>
        </main>
      </TabProvider>
  
      </UserNew>
      
    )
  }
