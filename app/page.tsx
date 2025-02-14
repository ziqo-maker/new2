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
    const [error, setError] = useState<any>(null)  

  
    useEffect(() => {

      const initWebApp = async () => {
      
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp
        tg.ready()

        const initDataUnsafe = tg.initDataUnsafe || {}
       
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
              
                setTimeout(() => {
                  setUser(data)
                }, 3000);
                
              }
            })
            .catch((err) => {
            })
        } else {
        }
      } else {
      } 
     };

      initWebApp();
      
    }, [])

    if (!error) <div className='flex bg-black'> <p className="text-black font-Large">{error}</p></div>

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
      
                  <p className="text-white font-Large">WalkTask</p>

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
