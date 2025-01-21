'use client'
import Image, {StaticImageData} from "next/image"
import Shiba from '@/imgs/shibalogo.png'
import ShibaMining from '@/imgs/miningshiba.jpg'
import miningicon from '@/icons/miningicon.svg'
import { useEffect,useState,useRef } from "react"
import React from 'react';





interface Props {
  point: number;
}


const HomeTab = ({ point }: Props) => {
    

  const [dateA,setDateA] = useState();
  const [isSpin,setSpin] = useState(true);
  const [hours,setHours] = useState("00");
  const [minutes,setMinutes] = useState("00");
  const [miningPoint,setMiningPoint] = useState(0);
  const [points,setPoint] = useState(0);
  const [seconds,setSeconds] = useState("00");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isready, setReady] = useState<boolean>(false);
  const [isClaim, setClaim] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleStart = async () => {
    if(isClaim){
      try {
        fetch('/api/claim', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String("6124587322"),miningPoint: miningPoint }),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
          const plus = points + miningPoint
          setPoint(plus)
          localStorage.setItem("point", String(plus));
          setClaim(false)
          setReady(true)
          setMiningPoint(0)
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
         } else {
         }
       })
     } catch (err) {
     }
    }else if (isready){
      try {
        fetch('/api/startmining', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String("6124587322"),dateTime: dateA }),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
          setReady(false);
          setIsActive(true)
         } else {
          
         }
       })
     } catch (err) {
     }
    }
    
  }


  useEffect(() => {
    try {
      fetch('/api/gtdate', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ idd: String("6124587322") }),
     })
     .then((res) => res.json())
     .then((data) => {
       if (data.success) {
        setPoint(point)
        const target = new Date(data.dtMining);
        const now = new Date(data.dt);
          const difference = target.getTime() - now.getTime();
          if(data.mining == 1 && difference < 0 && data.claim == 0){
            setMiningPoint(71)
            setClaim(true);
            setSpin(false);
          }else if(data.mining == 0){
            setReady(true);
            setSpin(false);
          }else if(data.mining == 1 && !isClaim && difference > 0){
            setIsActive(true)
            setSpin(false);
            setDateA(data.dt)
            var q = 0
            var totaldiff = 7200000
      timerRef.current = setInterval(() =>{
        q += 1000
        const difference = target.getTime() - now.getTime() - q;
        const h = Math.floor(difference % (1000*60*60*24)) / (1000*60*60);
        var hstr = Math.trunc(h).toString();
        setHours(String(hstr).padStart(2, "0")); 
        const m = Math.floor((difference % (1000*60*60)) / (1000*60))
        if(Math.sign(m) === -1){
         setMinutes("00")
        }else{
          var mstr = m.toString();
          setMinutes(String(mstr).padStart(2, "0"));
        }
        const s = Math.floor((difference % (1000*60)) / 1000)
        if(Math.sign(s) === -1){
          setSeconds("00")
        }else{
          var sstr = s.toString();
          setSeconds(String(sstr).padStart(2, "0"));
        }
        if(difference <0){
          setClaim(true);
          setIsActive(false);
        }else{
           var t = totaldiff - difference 
          setMiningPoint(Math.trunc(t/100000))
        }
      },1000);
    }
      
       } else {
        
       }
     })
   } catch (err) {
    
   }

    return () => {  if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  },[isActive])

    return (
     <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
    <div className="h-7"/>
       <center>
       <div className="flex  glowWite items-center w-2/2 border-2 border-white rounded-full px-3 py-[3px] max-w-64 ">
        <Image
        src={Shiba as StaticImageData}
      className="w-10 h-10 aspect-square object-cover"
      alt="Shiba Inu"
    />
              <div className="flex-1 text-center">
              <div className="flex items-center justify-center space-x-1">
              <p className="text-white font-Large">Shiba Inu</p>
              <p className="text-white font-medium">Balance</p>
              </div>
              <div className="flex items-center justify-center">
              <p className=" text-white font-Large glow text-lg">{points}</p>
              </div>
              </div>
              </div>
       </center>

       <div className="flex-grow mt-5 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
       { <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
        <div className="px-4 mt-4 flex justify-center">
          <div className="w-80 h-80 p-5">
          <Image
        src={ShibaMining as StaticImageData}
      className={`w-full h-full rounded-full ${isActive? 'animate-pulse' : ''}`}
      alt="Shiba Inu"
    />
          </div>
        </div>
        <div className="flex px-50 justify-center">
        <p className="text-2xl text-[#ffae19] font-Large gloworange truncate">{miningPoint}</p>
        </div>
        <div className="flex px-10 justify-center">
        <button onClick={handleStart} className="flex mt-5 items-center  w-80 rounded-full px-4 py-[12px] bg-[#ffae19]/[0.9] ">
        
    <div className="flex items-center justify-center space-x-1">
    </div>
    <div className="flex-1 text-center">
        <div className="flex items-center justify-center space-x-2">
        <Image
        src={miningicon as StaticImageData}
      className={`${isready? 'w-6 h-6' : 'w-0 h-0' } aspect-square object-cover`}
      alt="Shiba Inu"
    />
     <div className="flex items-center justify-center space-x-1">
     
     
    <svg aria-hidden="true" className={`${isSpin? 'w-6 h-6' : 'w-0 h-0'} text-gray-200 animate-spin dark:text-gray-600 fill-white `} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <p className={`${isClaim? '' : 'text-[0px] w-0 h-0'} text-white font-Large glowsmall animate-pulse`}>Claim</p>
     <p className={`${isready? '' : 'text-[0px] w-0 h-0'} text-white font-Large glowsmall`}>Start Mining</p>
     <p className={`${isActive? '' : 'text-[0px] w-0 h-0'} text-white font-Large glowsmall `}>Mining ({hours}:{minutes}:{seconds})</p>
     </div>
        </div>
        </div>
        </button>
        </div>
       </div> }
       </div>
     </div>

    )
}

export default HomeTab