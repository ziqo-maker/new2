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
import { TonConnectUIProvider } from "@tonconnect/ui-react"

import { GoDotFill } from "react-icons/go";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import test from '@/imgs/test.png';
import Marquee from 'react-fast-marquee'


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
       const [first, setFirst] = useState<boolean>(false);
       
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
                const gt = String(data.first)
                  if(gt == '1'){
                     setFirst(true)
                  }
                setTimeout(() => {
                  setUser(data)
                }, 5500);
                
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

    const slides = [
        {
          nmb: 0
        },
        {
          nmb:1
        },
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
      const goToSlide = (slideIndex:number) => {
        setCurrentIndex(slideIndex);
      };


    if (!user) return (
      <div className="container flex flex-col  mx-auto h-screen justify-between items-center w-full bg-[#ffae19] ">
        

       <div className='mr-1 ml-1 flex-col text-wrap flex justify-center items-center text-center'>
        <div className='flex space-x-1'>
        <div className='flex flex-col justify-center items-center'>
          <Image 
        src={WalkTask as StaticImageData}
         
      className="size-8  aspect-square rounded-xl object-cover"
      alt=""
    />
      
                  <p className="text-white font-Large text-sm">WalkTask</p>

        </div>
        <button onClick={() => window.open("https://play.google.com/store/apps/details?id=com.walktask.app&pcampaignid=web_share")}>
          
          <Image 
           src={getGoogleplay as StaticImageData} 
         className="w-24 h-16 aspect-square object-cover"
         alt=""
       />
       </button>
       
       
      
       </div>
      
          </div>

          
            <div className='mr-2 ml-2 flex-col text-wrap flex space-y-1 justify-center items-center text-center'>
        <Image 
        src={StartPic as StaticImageData} 
      className="size-20 glowbx rounded-full border-2 border-[#fda500] animate-waving-hand aspect-square object-fit"
      alt=""
    />
              
    <Typewriter
  options={{
     // strings: ["The servers are under maintenance and the server repair will take about a week. Please be patient. The raffle has been postponed, don't worry, the raffle tickets will be kept. Please contact the support team if you have any questions."],
    strings: ['Earn more, play smart and keep your WalkCoin growing'],
    autoStart: true,
    loop: true,
    wrapperClassName: 'text-white text-base italic glow text-wrap text-justify'
  }}
/>     
        </div>
          
           
         
       <div className='mr-1 ml-1 flex-col text-wrap flex justify-center items-center text-center'>
       
         <p className="text-white font-Large font-bold text-wrap">Contact us</p>
          <p className="text-white font-Large text-sm">Vuorikatu 20</p>
           <p className="text-white font-Large text-sm">00100 Helsinki, Finland</p>
           <p className="text-white font-Large text-sm">voizynt@gmail.com</p>
       <div className='h-2' />
          </div>
      </div>
    )

    return (
         <UserNew>
          <TonConnectUIProvider manifestUrl="https://emerald-rear-parrotfish-934.mypinata.cloud/ipfs/bafkreiefycb6u266ssmwexxziehzmqoffbfaumzp3dbsa2vdak6sujnffm">
    <TabProvider>
          <main className='main-h-screen content-around bg-white '>
            <TabContainer/>
            <NavigationBar/>
          </main>
        </TabProvider>
        </TonConnectUIProvider>
        </UserNew>
      
    )
    
  }
