'use client'
import Image, {StaticImageData} from "next/image"
import FootPrint from '@/icons/footprint.svg';
import FootPrintA from '@/icons/footprinta.svg';  
import { useEffect,useState,useRef } from "react"
import React from 'react';
import UpgradeIcon from '@/icons/upgrade.svg';
import Marquee from 'react-fast-marquee'
import { useTab } from '@/contexts/TabContext'
import { NewUserContext } from '@/contexts/UserContextB';
import toypic from '@/imgs/toypic.webp';
import AlienSoldier from '@/charactermg/AlienSoldier.webp';
import Mousey from '@/charactermg/Mousey.webp';
import ev from '@/charactermg/ev.webp';
import jackie from '@/charactermg/jackie.webp';
import swatguy from '@/charactermg/swatguy.webp';
import Script from "next/script";
import a11 from '@/gif/1-1.gif';
import a22 from '@/gif/2-2.gif';
import a33 from '@/gif/3-3.gif';
import a44 from '@/gif/4-4.gif';
import a55 from '@/gif/5-5.gif';
import a66 from '@/gif/6-6.gif';


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
  const timerRefB = useRef<NodeJS.Timeout | null>(null);

  const { UserDt,setUserData,loadUserData } = React.useContext(NewUserContext);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshB, setRefreshB] = useState<boolean>(false);
  const [chsLst, setChsLst] = useState([
    { str: '' }
     ]);


  const { activeTab, setActiveTab } = useTab()
  

  const list: { str: string }[] = [
    { str: 'loveutilld*** withdrawn 1.55 USDT' },
    { str: 'Mr_TA*** withdrawn 1.55 USDT' },
    { str: 'ali_dr*** withdrawn 1.84 USDT' },
    { str: 'A_HS*** withdrawn 2.00 USDT' },
    { str: 'Shl*** withdrawn 1.67 USDT' },
    { str: 'Elna*** withdrawn 2.65 USDT' },  
    { str: 'ramsaini*** withdrawn 1.73 USDT' },
    { str: 'Arifsikder*** withdrawn 2.03 USDT' },
]

const listB: { str: string }[] = [
  { str: 'MasterSyp*** withdrawn 1.90 USDT' },
  { str: 'DanielN_*** withdrawn 2.16 USDT' },
  { str: 'Bestfuri*** withdrawn 1.70 USDT' },
  { str: 'Ma_joo*** withdrawn 1.81 USDT' },
  { str: 'xlT*** withdrawn 1.53 USDT' },
  { str: 'Mokkach*** withdrawn 1.51 USDT' },
  { str: 'iamsappry*** withdrawn 1.94 USDT' },
  { str: 'Sajidali*** withdrawn 1.79 USDT' },
  
]

const listC: { str: string }[] = [
  { str: 'sheikh_arabi*** withdrawn 1.89 USDT' },
  { str: 'Hola*** withdrawn 1.71 USDT' },
  { str: 'Mejza*** withdrawn 2.22 USDT' },
  { str: 'itshemantsa*** withdrawn 1.88 USDT' },

]

const listD: { str: string }[] = [
  { str: 'zbornik*** withdrawn 1.63 USDT' },
  { str: 'Titanwta*** withdrawn 1.57 USDT' },
  { str: 'Asnaza*** withdrawn 1.94 USDT' },
  { str: 'Zzeuus_*** withdrawn 1.68 USDT' },
  { str: 'pan_d*** withdrawn 1.79 USDT' },

]


useEffect(() => {
  const rndNmb = Math.floor(Math.random() * 5) + 1
  const lst = rndNmb ==1? list: rndNmb ==2? listB:rndNmb ==3 ? listC:listD
  setChsLst(lst)
},[])  

  const handleStart = async () => {
     
    if(isClaim){
      setIsActive(false);
      try {
        fetch('/api/claim', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String(UserDt?.idd),miningPoint: miningPoint }),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
          const plus = Number(UserDt?.gtpoint) + miningPoint
          setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(plus),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username)})
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
         body: JSON.stringify({ idd: String(UserDt?.idd),dateTime: dateA }),
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
       body: JSON.stringify({ idd: String(UserDt?.idd) }),
     })
     .then((res) => res.json())
     .then((data) => {
       if (data.success) {
        setRefresh(true)
        const target = new Date(data.dtMining);
        const now = new Date(data.dt);
          const difference = target.getTime() - now.getTime();
          if(data.mining == 1 && difference < 0 && data.claim == 0){
            setMiningPoint(7200*Number(UserDt?.speedlvl))
            setIsActive(false);
            setReady(false);
            setClaim(true);
            setSpin(false);
          }else if(data.mining == 0){
            setReady(true);
            setSpin(false);
          }else if(data.mining == 1 && !isClaim && difference > 0){
            setIsActive(true)
            setSpin(false)
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
          setMiningPoint(Math.trunc(t/1000)*Number(UserDt?.speedlvl))
        }
      },1000);
    }
      
       } else {
       
       }
     })
   } catch (err) {
    
   }

   if(refresh == false) {
    timerRefB.current = setInterval(() =>{
    setRefreshB(!refreshB)
    },3000);
   }
  
    return () => {  if (timerRef.current) {
      clearInterval(timerRef.current);
    };
    if (timerRefB.current) {
      clearInterval(timerRefB.current);
    }
  };
  },[isActive,refreshB])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.onclckmn.com/static/onclicka.js';
    script.dataset.admpid = '294953'; //  AD-CODE-ID
    script.async = true;
    document.head.appendChild(script);
  }, []);
  
    return (
     <div className="w-full bg-white overflow-y-auto text-white h-screen text-wrap font-bold flex flex-col max-w-xl">
      
    
 {/* <iframe data-aa='2382049' src='//ad.a-ads.com/2382049?size=320x50' className='width:320px height-50px border-0px padding-0 overflow:hidden; bg-white'/> */}
      {/* <section className="flex bg-[#ffae19]/[0.9] justify-center items-center w-full">
          <div className="items-center w-full justify ">
            <Marquee gradientWidth={120} gradient={true} className=" items-center py-2 overflow-hidden ">
          
            {chsLst.map((str,index) => {
              return (
                <div key={index} className=" flex pr-10 flex-col justify-center items-center  mx-5 ">
                <p className="text-white font-Large">{str.str}</p>
                </div>
              )
            })}
          
            </Marquee>
          </div>
        </section> */}
        
       <div>
     
    </div>
       <div className="flex w-full   items-center  justify-center items-center">
       <div className="flex w-[calc(100%-2rem)]  bg-[#ffae19]/[0.9] border-white border-4 border-double mt-4 items-center  text-wrap  rounded-full px-1 py-[3px] ">
        <Image 
        src={FootPrint as StaticImageData} 
      className="w-10 h-10 aspect-square object-cover"
      alt="Shiba Inu"
    />
              <div className="flex-grow text-center ">
              <div className="flex items-center justify-center">
              <p className=" text-white font-Large glow text-base mr-6 truncate">{Number(UserDt?.gtpoint).toLocaleString()}</p>
              </div>
              </div>
              </div>
       </div>
       

       <div className="flex-grow mt-5 bg-[#f3ba2f]   rounded-t-[48px] relative z-0">
        <div className="absolute top-[2px] left-0 right-0 bottom-0  bg-white rounded-t-[46px]">        
        

        <div className="flex justify-center items-center  mt-4 ">
          <div className="flex w-80 h-80 p-3"> 
            <div className="flex grow w-full h-full relative  rounded-full border-4 border-double">
            
          <Image
          unoptimized={true}
       src={a55 as StaticImageData}
       className={` w-full h-full absolute rounded-full object-fill`}
       alt=""
         />  
            </div> 
   
          </div>
          
        </div>

        <div className="flex grow mr-4 ml-4 justify-between items-between">
 
        <button onClick={() => setActiveTab('character')} className="flex border-[#ffae19]/[0.9] space-x-1 items-center text-wrap border-2 rounded-full px-3 py-[6px] ">
         <p className="text-lg text-[#ffae19]/[0.9] font-Large">Characters</p>
        </button>

        <button onClick={ () => setActiveTab('speed')
          } className="flex grow-0 bg-[#ffae19]/[0.9] space-x-1 items-center text-wrap border-2 border-white rounded-full px-3 py-[6px] ">
        <Image
        src={UpgradeIcon as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt=""
       />
         <p className="text-lg text-white font-Large">Speed Up</p>
        </button>
  </div>

        <div className="flex grow px-50 mt-3 justify-center items-center space-x-1">
        <Image
        src={FootPrint as StaticImageData} 
      className="w-10 h-10"
      alt=""
       />
          <div className="flex space-x-2 items-center text-wrap">
          <p className="text-xl text-[#ffae19] font-Large text-wrap">{miningPoint.toLocaleString()}</p>
          <p className="text-base text-white bg-[#ffae19]/[0.9] font-Large rounded-full px-2 py-[3px]">×{UserDt?.speedlvl}</p>
          </div>
          
        
        </div>
        <div className="flex px-10 justify-center">
        <button onClick={handleStart} className="flex mt-3 items-center w-80 rounded-full px-4 py-[12px] bg-[#ffae19]/[0.9] ">
        
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
        <div className="h-20 mt-5" />
       </div> 
       </div>
     </div>

    )
}

export default HomeTab
