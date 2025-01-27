'use client'
import Image, {StaticImageData} from "next/image"
import FootPrint from '@/icons/footprint.svg';
import FootPrintA from '@/icons/footprinta.svg';  
import { useEffect,useState,useRef } from "react"
import React, { useContext } from 'react';
import toyspeed1 from '@/gif/toyspeed1.gif'
import UpgradeIcon from '@/icons/upgrade.svg';
import Marquee from 'react-fast-marquee'
import { useTab } from '@/contexts/TabContext'
import { UserContext } from '@/contexts/userContext';
import { NewUserContext } from '@/contexts/UserContextB';
import toypic from '@/imgs/toypic.png';



const HomeTab = () => {
 
  const [dateA,setDateA] = useState();
  const [isSpin,setSpin] = useState(true);
  const [hours,setHours] = useState("00");
  const [minutes,setMinutes] = useState("00");
  const [miningPoint,setMiningPoint] = useState(0);
  const [seconds,setSeconds] = useState("00");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isready, setReady] = useState<boolean>(false);
  const [isClaim, setClaim] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { userData,setUserData } = React.useContext(NewUserContext);
  
  const { activeTab, setActiveTab } = useTab()

  // const userContext = useContext(UserContext);
  
  const handleStart = async () => {

    if(isClaim){
      try {
        fetch('/api/claim', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String(userData?.idd),miningPoint: miningPoint }),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
          const plus = Number(userData?.gtpoint) + miningPoint
          // userContext?.updateUserPoint(String(plus))
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
         body: JSON.stringify({ idd: String(userData?.idd),dateTime: dateA }),
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
       body: JSON.stringify({ idd: String(userData?.idd) }),
     })
     .then((res) => res.json())
     .then((data) => {
       if (data.success) {
        const target = new Date(data.dtMining);
        const now = new Date(data.dt);
          const difference = target.getTime() - now.getTime();
          if(data.mining == 1 && difference < 0 && data.claim == 0){
            setMiningPoint(7200*Number(userData?.speedlvl))
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
          setMiningPoint(Math.trunc(t/1000)*Number(userData?.speedlvl))
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
     <div className="w-full bg-white text-white h-screen text-wrap font-bold flex flex-col max-w-xl">

    <section className="flex bg-[#ffae19]/[0.9] justify-center items-center w-full">
        <div className="items-center justify ">
          <Marquee gradient className=" items-center py-2 overflow-hidden ">
          <div className=" flex pr-10 flex-col justify-center items-center  mx-5 ">
          <p className="text-white font-Large">use***66 withdrawn 0.5 USDT</p>
          </div>
          <div className=" flex pr-10 flex-col justify-center items-center  mx-5 ">
          <p className="text-white font-Large">use***66 withdrawn 0.5 USDT</p>
          </div>
          </Marquee>
        </div>
      </section>

       <div className="flex w-full  items-center justify-center items-center">
       <div className="flex bg-[#ffae19]/[0.9] border-white border-4 border-double mt-4 items-center w-2/4  text-wrap  rounded-full px-1 py-[3px] ">
        <Image
        src={FootPrint as StaticImageData} 
      className="w-10 h-10 aspect-square object-cover"
      alt="Shiba Inu"
    />
              <div className="flex-1 text-center">
              <div className="flex items-center justify-center">
              <p className=" text-white font-Large glow text-base truncate">{userData?.gtpoint}</p>
              </div>
              </div>
              </div>
       </div>
       

       <div className="flex-grow mt-5 bg-[#f3ba2f] rounded-t-[48px] relative z-0">
        <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-white rounded-t-[46px]">        
        

        <div className="flex justify-center items-center  relative mt-4 ">
          <div className="flex w-80 h-80 p-3">   
          <div className="relative inline-flex items-center  text-center text-white">
        <Image
        src={isActive? toyspeed1 as StaticImageData : toypic}
        unoptimized={true}
      className={`h-full rounded-full border-4 border-double`}
      alt="Shiba Inu"
        />
  <div className="absolute inline-flex items-center justify-center w-6 h-6 rounded-full -top-2 -end-2">
  
  <div className=" mt-4 justify-end items-center ">
        <button className="flex  border-[#ffae19]/[0.9] space-x-1 items-center text-wrap border-2 rounded-full px-3 py-[6px] ">
         <p className="text-lg text-[#ffae19]/[0.9] font-Large">Change</p>
        </button>
        </div>
  </div>
</div>
          </div>
          
        </div>
        <div className="flex grow px-50 justify-center items-center space-x-1">
        <div className="flex invisible grow-0 bg-[#ffae19]/[0.9] space-x-1 items-center text-wrap border-2 border-white rounded-full px-3 py-[6px] ">
        <Image
        src={UpgradeIcon as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt="Shiba Inu"
       />
         <p className="text-lg text-white font-Large">Speed Up</p>
        </div>
          
          <div className="flex space-x-2 items-center text-wrap">
          <p className="text-xl text-[#ffae19] font-Large text-wrap">{miningPoint}</p>
          <p className="text-base text-white bg-[#ffae19]/[0.9] font-Large rounded-full px-2 py-[3px]">×{userData?.speedlvl}</p>
          </div>
          
        <button onClick={() => setActiveTab('speed')} className="flex grow-0 bg-[#ffae19]/[0.9] space-x-1 items-center text-wrap border-2 border-white rounded-full px-3 py-[6px] ">
        <Image
        src={UpgradeIcon as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt="Shiba Inu"
       />
         <p className="text-lg text-white font-Large">Speed Up</p>
        </button>
        </div>
        <div className="flex px-10 justify-center">
        <button onClick={handleStart} className="flex mt-5 items-center w-80 rounded-full px-4 py-[12px] bg-[#ffae19]/[0.9] ">
        
    <div className="flex items-center justify-center space-x-1">
    </div>
    <div className="flex-1 text-center">
        <div className="flex items-center justify-center space-x-2">
        <Image
        src={FootPrintA as StaticImageData}
      className={`${isready? 'w-7 h-7' : 'w-0 h-0' } aspect-square object-cover`}
      alt="Shiba Inu"
    />
     <div className="flex items-center justify-center">
    <svg aria-hidden="true" className={`${isSpin? 'w-6 h-6' : 'w-0 h-0'} text-gray-200 animate-spin dark:text-gray-600 fill-white `} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <p className={`${isClaim? '' : 'text-[0px] w-0 h-0'} text-white font-Large glowsmall animate-pulse`}>Claim</p>
     <p className={`${isready? '' : 'text-[0px] w-0 h-0'} text-white font-Large glowsmall`}>Start</p>
     <p className={`${isActive? '' : 'text-[0px] w-0 h-0'} text-white font-Large glowsmall `}>({hours}:{minutes}:{seconds})</p>
     </div>
        </div>
        </div>
        </button>
        </div>
       </div> 
       </div>
     </div>

    )
}

export default HomeTab