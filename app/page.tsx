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
  import React,{useRef} from 'react';
  import Typewriter from 'typewriter-effect';
  import { Carousel } from "@material-tailwind/react";
  import App from './carosal';

  declare global {
    interface Window {
      Telegram?: {
        WebApp: WebApp
      }
    }
  }

  export default function Home() {
    const [user, setUser] = useState<any>(null)  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
      const [refreshB, setRefreshB] = useState<boolean>(false);
       const [first, setFirst] = useState<boolean>(true);

       
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
                
              } else {
                 setRefresh(true)
                setTimeout(() => {
                  setUser(data)
                }, 4000);
                
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
      if(refresh == false) {
        timerRef.current = setInterval(() =>{
        setRefreshB(!refreshB)
        },4000);
       }
      return () => {  if (timerRef.current) {
        clearInterval(timerRef.current);
      };
      
    };
      
    }, [refreshB])


//     if (!user) return (
//       <div className="container flex flex-col  mx-auto h-screen justify-between items-center w-full bg-[#ffae19] ">
//           <div className='flex h-0'/>
        
//         <div className='mr-1 ml-1 flex-col text-wrap flex space-y-1 justify-center items-center text-center'>
//         <Image 
//         src={StartPic as StaticImageData} 
//       className="size-20 glowbx rounded-full border-2 border-[#fda500] animate-waving-hand aspect-square object-fit"
//       alt=""
//     />
//     <Typewriter
//   options={{
//     strings: ['Keep mining, we are getting bigger'],
//     autoStart: true,
//     loop: true,
//     wrapperClassName: 'text-white text-base italic glow text-wrap text-justify'
//   }}
// />     
//         </div>
          
           
         
//         <div className='mr-1 ml-1 flex-col text-wrap flex justify-center items-center text-center'>
//         <div className='flex space-x-1'>
//         <div className='flex flex-col justify-center items-center'>
//           <Image 
//         src={WalkTask as StaticImageData}
         
//       className="size-10  aspect-square rounded-xl object-cover"
//       alt=""
//     />
      
//                   <p className="text-white font-Large">WalkTask</p>

//         </div>
//         <button onClick={() => window.open("https://play.google.com/store/apps/details?id=com.walktask.app&pcampaignid=web_share")}>
          
//           <Image 
//            src={getGoogleplay as StaticImageData} 
//          className="size-28 aspect-square object-cover"
//          alt=""
//        />
//        </button>
       
       
      
//        </div>
//        <p className="text-white font-Large font-bold text-wrap">Listing Date is set for May 29, 2025</p>
//        <div className='h-5' />
//           </div>
    
//       </div>
//     )
    
if (first) return (
    <App />
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
