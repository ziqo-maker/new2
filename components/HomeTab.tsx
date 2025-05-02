'use client' 
import Image, {StaticImageData} from "next/image"
import FootPrintA from '@/icons/footprinta.svg';  
import { useEffect,useState,useRef,useCallback } from "react"
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
import Toast from 'typescript-toastify';
import { GoDotFill } from "react-icons/go";
import Dollar from '@/icons/Dollar.svg';
import ProgressBar from "@ramonak/react-progress-bar";
import { ShowPromiseResult } from "@/types/adsgram";
import { useAdsgramD } from "./useAdsgramD";
import circleticket from '@/icons/ticketcircle.svg';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Extra from '@/imgs/extra.png';
import TicketCircle from '@/icons/whiteticket.svg';
import Star from '@/icons/star.svg';
import copy from '@/icons/copy.svg'
import FootPrint from '@/icons/footprint.svg';
import Close from '@/icons/close.svg';
import VipIcon from '@/imgs/vip.png';
import Vipticket from '@/imgs/vipticket.png';
import CloseB from '@/imgs/closeb.png';
import giftvip from '@/imgs/giftvip.png';


import gif from '@/imgs/gif.gif';
// import a11 from '@/gif/1-1.gif';
// import a12 from '@/gif/1-2.gif';
// import a13 from '@/gif/1-3.gif';
// import a14 from '@/gif/1-4.gif';
// import a15 from '@/gif/1-5.gif';
// import a16 from '@/gif/1-6.gif';
// import a17 from '@/gif/1-7.gif';
// import a21 from '@/gif/2-1.gif';
// import a22 from '@/gif/2-2.gif';
// import a23 from '@/gif/2-3.gif';
// import a24 from '@/gif/2-4.gif';
// import a25 from '@/gif/2-5.gif';
// import a26 from '@/gif/2-6.gif';
// import a27 from '@/gif/2-7.gif';
// import a31 from '@/gif/3-1.gif';
// import a32 from '@/gif/3-2.gif';
// import a33 from '@/gif/3-3.gif';
// import a34 from '@/gif/3-4.gif';
// import a35 from '@/gif/3-5.gif';
// import a36 from '@/gif/3-6.gif';
// import a37 from '@/gif/3-7.gif';
// import a41 from '@/gif/4-1.gif';
// import a42 from '@/gif/4-2.gif';
// import a43 from '@/gif/4-3.gif';
// import a44 from '@/gif/4-4.gif';
// import a45 from '@/gif/4-5.gif';
// import a46 from '@/gif/4-6.gif';
// import a47 from '@/gif/4-7.gif';
// import a51 from '@/gif/5-1.gif';
// import a52 from '@/gif/5-2.gif';
// import a53 from '@/gif/5-3.gif';
// import a54 from '@/gif/5-4.gif';
// import a55 from '@/gif/5-5.gif';
// import a56 from '@/gif/5-6.gif';
// import a57 from '@/gif/5-7.gif';
// import a61 from '@/gif/6-1.gif';
// import a62 from '@/gif/6-2.gif';
// import a63 from '@/gif/6-3.gif';
// import a64 from '@/gif/6-4.gif';
// import a65 from '@/gif/6-5.gif';
// import a66 from '@/gif/6-6.gif';
// import a67 from '@/gif/6-7.gif';
import Loading from '@/imgs/loading.png';
import { DialogHeader } from "@material-tailwind/react";

type modelB = {
  id: number
}

type modelC = {
  id: number,
   click:boolean
}

type claimtype = {
  id: number,
  clickb:boolean,
  start:boolean
}

//  type modelExtra = {
//       id: number
//   }
  //   const [gtModelExtra,setModelExtra] = useState<modelB[]>([
  //     { id: 1},
  //     { id: 2 },
  //     { id: 3 },
  //     { id: 4 },
  //     { id: 5},
  //     { id: 6 },
  // ]);

const HomeTab = () => {
 
  const [vipticketplus,setvipticketplus] = useState(0);
  const [vipwalkcoinplus,setvipwalkcoinplus] = useState(0);

  const [end,setEnd] = useState<boolean> (false);
          const [start,setStart] = useState<boolean> (false);
  const [activevip,setActiveVip] = useState(false);
  const [vipTicket,setvipTicket] = useState<number> (0);
         const [hoursvip,setHoursvip] = useState("00");
            const [minutesvip,setMinutesvip] = useState("00");
          const [secondsvip,setSecondsvip] = useState("00");
  const [extraTicket,setExtraTicket] = useState(0);
  const [extraWalkCoin,setExtraWalkCoin] = useState(0);
  const [open, setOpen] = useState(false)
  const [extra1, setExtra1] = useState(false)
  const [extra2, setExtra2] = useState(false)
  const [extra3, setExtra3] = useState(false)
  const [extra4, setExtra4] = useState(false)
  const [extra5, setExtra5] = useState(false)
  const [extra6, setExtra6] = useState(false)

  const [vip, setVip] = useState(false)
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
  const timerRefC = useRef<NodeJS.Timeout | null>(null);

  const [isMg, setMg] = useState<StaticImageData>();
  const [lvl,setLvl] = useState(5);
  const [price,setPrice] = useState(0);
  const [endpoint,setEndPoint] = useState(0);
  const [blnlvl,setBlnLvl] = useState(false);
  const { UserDt,setUserData,loadUserData } = React.useContext(NewUserContext);

   const [Itm, setItm] = useState<number>(0);
   const [isCopy,setIsCopy] = useState(false);
   const [isCopyVip,setIsCopyVip] = useState(false);

       const handleCopyLink = () => {
                    const inviteLink = `/extra`
                    navigator.clipboard.writeText(inviteLink)
                     setIsCopy(true)
                  }

                  const handleCopyLinkVIP = () => {
                    const inviteLink = `WalkCoin👣`
                    navigator.clipboard.writeText(inviteLink)
                    setIsCopyVip(true)
                  }
  
                  const handleOpenLink = () => {
                      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                        const tg = window.Telegram.WebApp
                      tg.ready()
                         tg.openTelegramLink("https://t.me/TheWalkCoinBot")     
                      }
                     }

  const handlePurchase = async () => {
    try {
            fetch('/api/create-buystar', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String(5640150352),amount:'1',transactionid:'s',forwhat: '' }),
           })
           .then((res) => res.json())
           .then((data) => {
             if (data.success) {
              new Toast({
                position: "top-center",
                toastMsg: `You're rece`,
                autoCloseTime: 4500,
                canClose: true,
                showProgress: true,
                pauseOnHover: true,
                pauseOnFocusLoss: true,
                type: "default",
                theme: "light"
              });
            }
           })
         } catch (err) {
         new Toast({
            position: "top-center",
            toastMsg: `You're received${err}`,
            autoCloseTime: 4500,
            canClose: true,
            showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "default",
            theme: "light"
          });
         }
  };

    const [gtClaimType,setClaimType] = useState<claimtype[]>([]);
   const [gtMpdel,setModelB] = useState<modelB[]>([
                   { id: 1},
                   { id: 2 },
                   { id: 3 },
                   { id: 4 },
                   { id: 5 },
               ]);

               const [gtModelExtra,setModelExtra] = useState<modelB[]>([
                { id: 1},
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
            ]);

                const [gtMpdelC,setModelC] = useState<modelC[]>([
                { id: 1,
                  click:false
                },
            ]);
 
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshB, setRefreshB] = useState<boolean>(false);
   const [activeBtn, setActiveBtn] = useState<boolean>(false);
  const [chsLst, setChsLst] = useState([
    { str: '' }
     ]);


  const { activeTab, setActiveTab } = useTab()
  

//   const list: { str: string }[] = [
//     { str: 'loveutilld*** withdrawn 3.55 USDT' },
//     { str: 'Mr_TA*** withdrawn 2.55 USDT' },
//     { str: 'ali_dr*** withdrawn 1.84 USDT' },
//     { str: 'A_HS*** withdrawn 3.00 USDT' },
//     { str: 'Shl*** withdrawn 2.67 USDT' },
//     { str: 'Elna*** withdrawn 2.65 USDT' },  
//     { str: 'ramsaini*** withdrawn 2.73 USDT' },
//     { str: 'Arifsikder*** withdrawn 2.03 USDT' },
// ]

// const listB: { str: string }[] = [
//   { str: 'MasterSyp*** withdrawn 1.90 USDT' },
//   { str: 'DanielN_*** withdrawn 2.16 USDT' },
//   { str: 'Bestfuri*** withdrawn 1.70 USDT' },
//   { str: 'Ma_joo*** withdrawn 1.81 USDT' },
//   { str: 'xlT*** withdrawn 1.53 USDT' },
//   { str: 'Mokkach*** withdrawn 2.51 USDT' },
//   { str: 'iamsappry*** withdrawn 1.94 USDT' },
//   { str: 'Sajidali*** withdrawn 3.79 USDT' },
  
// ]

// const listC: { str: string }[] = [
//   { str: 'sheikh_arabi*** withdrawn 2.89 USDT' },
//   { str: 'Hola*** withdrawn 1.71 USDT' },
//   { str: 'Mejza*** withdrawn 2.22 USDT' },
//   { str: 'itshemantsa*** withdrawn 1.88 USDT' },

// ]

// const listD: { str: string }[] = [
//   { str: 'zbornik*** withdrawn 1.63 USDT' },
//   { str: 'Titanwta*** withdrawn 3.57 USDT' },
//   { str: 'Asnaza*** withdrawn 2.94 USDT' },
//   { str: 'Zzeuus_*** withdrawn 1.68 USDT' },
//   { str: 'pan_d*** withdrawn 1.79 USDT' },

// ]


  const [refreshC, setRefreshC] = useState<boolean>(false);
// useEffect(() => {
//   setTimeout(() => {
//     setRefreshC(!refreshC)
//     if(blnlvl == true){
//       setActiveBtn(true)
//     }
//    }, 4000);
// },[refreshC]) 

// useEffect(() => {
//   // const rndNmb = Math.floor(Math.random() * 5) + 1

//   // const lst = rndNmb ==1? list: rndNmb ==2? listB:rndNmb ==3 ? listC:listD
//   // setChsLst(lst)
//   const model = {id: 1, clickb:false,start:false}
//      gtClaimType?.push(model)
// },[])  


  const handleStart = async (id:number,clickb:boolean,start:boolean) => {
     
    if(isClaim && clickb== false){
      setIsActive(false);
      var newData = gtClaimType.map(el => {
        if(el.id == id)
           return Object.assign({}, el, {clickb:true})
        return el
    });
     setClaimType(newData)
     var pluspoint = Number(miningPoint) + Number(extraWalkCoin) + Number(vipwalkcoinplus)
      try {
        fetch('/api/claim', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String(UserDt?.idd),miningPoint: pluspoint }),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
          const plus = Number(UserDt?.gtpoint) + pluspoint
          const counticket = (Number(pluspoint)/3600).toFixed()
          const plusticket = Number(UserDt?.ticket) + Number(counticket) + Number(extraTicket) + Number(vipticketplus)
          var plusticketextra = Number(counticket) + Number(extraTicket)
          try {
            fetch('/api/update-ticket', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String(UserDt?.idd),ticket: String(plusticket) }),
           })
           .then((res) => res.json())
           .then((data) => {
             if (data.success) {
              const lcl = pluspoint.toLocaleString()
                      new Toast({
                        position: "top-center",
                        toastMsg: `You're received ${lcl} WalkCoin and ${plusticketextra} Tickets`,
                        autoCloseTime: 4500,
                        canClose: true,
                        showProgress: true,
                        pauseOnHover: true,
                        pauseOnFocusLoss: true,
                        type: "default",
                        theme: "light"
                      });
          setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(plus),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(plusticket),firstname:String(UserDt?.firstname)})
          setClaim(false)
          setReady(true)
          setMiningPoint(0)
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
            }
           })
         } catch (err) {
         }
          
           
         } else {
         }
       })
     } catch (err) {
        var newData = gtClaimType.map(el => {
        if(el.id == id)
           return Object.assign({}, el, {clickb:false})
        return el
    });
     setClaimType(newData)
     }
    }else if (isready && start == false){
      var newData = gtClaimType.map(el => {
        if(el.id == id)
           return Object.assign({}, el, {start:true})
        return el
    });
     setClaimType(newData)
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
        var newData = gtClaimType.map(el => {
        if(el.id == id)
           return Object.assign({}, el, {start:false})
        return el
    });
     setClaimType(newData)
     }
    }
    
  }

 const handleupdateprice = async () => {
   var newData = gtMpdelC.map(el => {
      if(el.id == 1)
         return Object.assign({}, el, {click:true})
      return el
  });
  setModelC(newData)
  setTimeout(() => {
    var newData = gtMpdelC.map(el => {
      if(el.id == 1)
         return Object.assign({}, el, {click:false})
      return el
  });
  setModelC(newData)
  }, 5000);
    const updatevalue = (Number(UserDt?.value)+price).toFixed(8)
    const lvlup = Number(lvl)+1
    try {
                                fetch('/api/updatelvl', {
                                 method: 'POST',
                                 headers: {
                                   'Content-Type': 'application/json',
                                 },
                                 body: JSON.stringify({ idd: String(UserDt?.idd),tokenvalue:String(updatevalue),lvl:String(lvlup)}),
                               })
                               .then((res) => res.json())
                               .then((data) => {
                                if(data.success){
                                   setLvl(lvlup)
                                const gtPrice = lvlup == 1 ? 0.00000015 : lvlup == 2 ? 0.00000020 : lvlup == 3 ? 0.00000025 : lvlup ==4 ? 0.00000030 : lvlup ==5? 0.00000035: 0
                            setPrice(gtPrice)
                         const gtEndPoint = lvlup == 1 ? 100000 : lvlup == 2 ? 200000 : lvlup == 3 ? 300000 : lvlup ==4 ? 400000 : lvlup ==5? 500000: 0
                           setEndPoint(gtEndPoint)
                           if(lvlup >= 6){
                            setBlnLvl(false)
                           }
                                   setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(UserDt?.gtpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(updatevalue),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})
                                   new Toast({
                                    position: "top-center",
                                    toastMsg: "Done.",
                                    autoCloseTime: 8500,
                                    canClose: true,
                                    showProgress: true,
                                    pauseOnHover: true,
                                    pauseOnFocusLoss: true,
                                    type: "default",
                                    theme: "light"
                                  });
                                }
                               })
                             } catch (err) {
                              
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

      //  if(UserDt?.selectcharacter == "1" && UserDt?.speedlvl == "1"){
      //     setMg(a11)
      //   }else if(UserDt?.selectcharacter == "1" && UserDt?.speedlvl == "2"){
      //     setMg(a12)
      //   } else if(UserDt?.selectcharacter == "1" && UserDt?.speedlvl == "3"){
      //     setMg(a13)
      //   } else if(UserDt?.selectcharacter == "1" && UserDt?.speedlvl == "4"){
      //     setMg(a14)
      //   } else if(UserDt?.selectcharacter == "1" && UserDt?.speedlvl == "5"){
      //     setMg(a15)
      //   } else if(UserDt?.selectcharacter == "1" && UserDt?.speedlvl == "6"){
      //     setMg(a16)
      //   } else if(UserDt?.selectcharacter == "1" && UserDt?.speedlvl == "7"){
      //     setMg(a17)
      //   } else if(UserDt?.selectcharacter == "2" && UserDt?.speedlvl == "1"){
      //     setMg(a21)
      //   }else if(UserDt?.selectcharacter == "2" && UserDt?.speedlvl == "2"){
      //     setMg(a22)
      //   } else if(UserDt?.selectcharacter == "2" && UserDt?.speedlvl == "3"){
      //     setMg(a23)
      //   } else if(UserDt?.selectcharacter == "2" && UserDt?.speedlvl == "4"){
      //     setMg(a24)
      //   } else if(UserDt?.selectcharacter == "2" && UserDt?.speedlvl == "5"){
      //     setMg(a25)
      //   } else if(UserDt?.selectcharacter == "2" && UserDt?.speedlvl == "6"){
      //     setMg(a26)
      //   } else if(UserDt?.selectcharacter == "2" && UserDt?.speedlvl == "7"){
      //     setMg(a27)
      //   } else if(UserDt?.selectcharacter == "3" && UserDt?.speedlvl == "1"){
      //     setMg(a31)
      //   }else if(UserDt?.selectcharacter == "3" && UserDt?.speedlvl == "2"){
      //     setMg(a32)
      //   } else if(UserDt?.selectcharacter == "3" && UserDt?.speedlvl == "3"){
      //     setMg(a33)
      //   } else if(UserDt?.selectcharacter == "3" && UserDt?.speedlvl == "4"){
      //     setMg(a34)
      //   } else if(UserDt?.selectcharacter == "3" && UserDt?.speedlvl == "5"){
      //     setMg(a35)
      //   } else if(UserDt?.selectcharacter == "3" && UserDt?.speedlvl == "6"){
      //     setMg(a36)
      //   } else if(UserDt?.selectcharacter == "3" && UserDt?.speedlvl == "7"){
      //     setMg(a37)
      //   } else if(UserDt?.selectcharacter == "4" && UserDt?.speedlvl == "1"){
      //     setMg(a41)
      //   }else if(UserDt?.selectcharacter == "4" && UserDt?.speedlvl == "2"){
      //     setMg(a42)
      //   } else if(UserDt?.selectcharacter == "4" && UserDt?.speedlvl == "3"){
      //     setMg(a43)
      //   } else if(UserDt?.selectcharacter == "4" && UserDt?.speedlvl == "4"){
      //     setMg(a44)
      //   } else if(UserDt?.selectcharacter == "4" && UserDt?.speedlvl == "5"){
      //     setMg(a45)
      //   } else if(UserDt?.selectcharacter == "4" && UserDt?.speedlvl == "6"){
      //     setMg(a46)
      //   } else if(UserDt?.selectcharacter == "4" && UserDt?.speedlvl == "7"){
      //     setMg(a47)
      //   } else if(UserDt?.selectcharacter == "5" && UserDt?.speedlvl == "1"){
      //     setMg(a51)
      //   }else if(UserDt?.selectcharacter == "5" && UserDt?.speedlvl == "2"){
      //     setMg(a52)
      //   } else if(UserDt?.selectcharacter == "5" && UserDt?.speedlvl == "3"){
      //     setMg(a53)
      //   } else if(UserDt?.selectcharacter == "5" && UserDt?.speedlvl == "4"){
      //     setMg(a54)
      //   } else if(UserDt?.selectcharacter == "5" && UserDt?.speedlvl == "5"){
      //     setMg(a55)
      //   } else if(UserDt?.selectcharacter == "5" && UserDt?.speedlvl == "6"){
      //     setMg(a56)
      //   } else if(UserDt?.selectcharacter == "5" && UserDt?.speedlvl == "7"){
      //     setMg(a57)
      //   }  else if(UserDt?.selectcharacter == "6" && UserDt?.speedlvl == "1"){
      //     setMg(a61)
      //   }else if(UserDt?.selectcharacter == "6" && UserDt?.speedlvl == "2"){
      //     setMg(a62)
      //   } else if(UserDt?.selectcharacter == "6" && UserDt?.speedlvl == "3"){
      //     setMg(a63)
      //   } else if(UserDt?.selectcharacter == "6" && UserDt?.speedlvl == "4"){
      //     setMg(a64)
      //   } else if(UserDt?.selectcharacter == "6" && UserDt?.speedlvl == "5"){
      //     setMg(a65)
      //   } else if(UserDt?.selectcharacter == "6" && UserDt?.speedlvl == "6"){
      //     setMg(a66)
      //   } else if(UserDt?.selectcharacter == "6" && UserDt?.speedlvl == "7"){
      //     setMg(a67)
      //   }
        
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


   try {
    fetch('/api/get-lvl', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ idd: String(UserDt?.idd) }),
   })
   .then((res) => res.json())
   .then((data) => {
     if (data.success) {
      try {
        fetch('/api/get-extra', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String(UserDt?.idd)}),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
         
          const items = String(data.items)
      const mapstr = items.split(',').map(Number);
      var plusextra = 0
      var plusextraticket = 0
      gtModelExtra.forEach((t: any)=> {
        const found = mapstr?.find(item => item === t.id);
        const contain = found !== undefined
                   if(t.id == 1 && contain == true){
                    setExtra1(true)
                    plusextra += 10000 
                  }else if (t.id == 2 && contain == true){
                    setExtra2(true)
                    plusextra += 15000                    
                  }else if (t.id == 3 && contain == true){
                    setExtra3(true)
                    plusextra += 20000
                  }else if(t.id == 4 && contain == true){
                    setExtra4(true)
                    plusextraticket += 5
                  }else if(t.id == 5 && contain == true){
                    setExtra5(true)
                    plusextraticket += 10
                  }else if(t.id == 6 && contain == true){
                    setExtra6(true)
                    plusextraticket += 15
                  }
              })
              setExtraWalkCoin(plusextra)
              setExtraTicket(plusextraticket)
             const gtlvl = String(data.lvl)
        const nmbrlvl = Number(gtlvl)
        setLvl(nmbrlvl)
      const gtPrice = nmbrlvl == 1 ? 0.00000015 : nmbrlvl == 2 ? 0.00000020 : nmbrlvl == 3 ? 0.00000025 : nmbrlvl ==4 ? 0.00000030 : nmbrlvl ==5? 0.00000035: 0
        setPrice(gtPrice)
        const gtEndPoint = nmbrlvl == 1 ? 100000 : nmbrlvl == 2 ? 200000 : nmbrlvl == 3 ? 300000 : nmbrlvl ==4 ? 400000 : nmbrlvl ==5? 500000: 0
        setEndPoint(gtEndPoint)
        
        if(nmbrlvl >= 6){
          setBlnLvl(false)
        }else if(nmbrlvl <= 5){
          setBlnLvl(true)
        }

        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp
          tg.ready()
          const initDataUnsafe = tg.initDataUnsafe || {}
         
        let index = String(initDataUnsafe.user?.first_name).indexOf("WalkCoin");
      if(index < 0){
      
      let indexB = String(initDataUnsafe.user?.last_name).indexOf("WalkCoin");
      
      if(indexB < 0){
      setActiveVip(false)
      }else{
        setActiveVip(true)
        try {
          fetch('/api/get-vip', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String(UserDt?.idd) }),
         })
         .then((res) => res.json())
         .then((data) => {
           if (data.success) {
          
            var gtticket = Number(data.ticket)
            if(gtticket <= Number(30)){
              setvipwalkcoinplus(10000)
              setvipticketplus(5)
            }else if(gtticket <= 60){
             setvipwalkcoinplus(15000)
              setvipticketplus(7)
            }else {
             setvipwalkcoinplus(20000)
              setvipticketplus(10)
            }
    
            const target = new Date(data.dtMining);
            const now = new Date(data.dt);
            const difference = target.getTime() - now.getTime();
             setvipTicket(Number(data.ticket))
              setStart(true)
             if (timerRefC.current) {
        clearInterval(timerRefC.current);
      }
            if(difference < 0){
                
              try {
                fetch('/api/update-vip', {
                 method: 'POST',
                 headers: {
                   'Content-Type':'application/json',
                 },
                 body: JSON.stringify({idd:String(UserDt?.idd)}),
               })
               .then((res) => res.json())
               .then((data) => {
                 if (data.success) {
                  var gtticket = Number(data.ticket)
                  if(gtticket <= Number(30)){
                    setvipwalkcoinplus(10000)
                    setvipticketplus(5)
                  }else if(gtticket <= 60){
                   setvipwalkcoinplus(15000)
                    setvipticketplus(7)
                  }else {
                   setvipwalkcoinplus(20000)
                    setvipticketplus(10)
                  }
                  setMinutesvip("00")
                  setSecondsvip("00")
                  setHoursvip("00")
                  const target = new Date(data.dtMining);
            const now = new Date(data.dt);
             setvipTicket(Number(data.ticket))
             
             setStart(true)
             var q = 0    
             timerRefC.current = setInterval(() =>{
               q += 1000
               const difference = target.getTime() - now.getTime() - q;
    
               if(difference > 1000 ){
    
                  
               const h = Math.floor(difference % (1000*60*60*24)) / (1000*60*60);
               var hstr = Math.trunc(h).toString();
               setHoursvip(String(hstr).padStart(2, "0")); 
               const m = Math.floor((difference % (1000*60*60)) / (1000*60))
               if(Math.sign(m) === -1){
                setMinutesvip("00")
               }else{
                 var mstr = m.toString();
                 setMinutesvip(String(mstr).padStart(2, "0"));
               }
               const s = Math.floor((difference % (1000*60)) / 1000)
               if(Math.sign(s) === -1){
                 setSecondsvip("00")
               }else{
                 var sstr = s.toString();
                 setSecondsvip(String(sstr).padStart(2, "0"));
               }
                
               }else{
                 setMinutesvip("00")
                 setSecondsvip("00")
                 setHoursvip("00")
               }
      
    
             },1000);
    
                 } else {
                 }
               })
             } catch (err) {
             }
    
            }else {
             
              var q = 0    
              timerRefC.current = setInterval(() =>{
                q += 1000
                const difference = target.getTime() - now.getTime() - q;
    
                if(difference > 1000 ){
    
                   
                const h = Math.floor(difference % (1000*60*60*24)) / (1000*60*60);
                var hstr = Math.trunc(h).toString();
                setHoursvip(String(hstr).padStart(2, "0")); 
                const m = Math.floor((difference % (1000*60*60)) / (1000*60))
                if(Math.sign(m) === -1){
                 setMinutesvip("00")
                }else{
                  var mstr = m.toString();
                  setMinutesvip(String(mstr).padStart(2, "0"));
                }
                const s = Math.floor((difference % (1000*60)) / 1000)
                if(Math.sign(s) === -1){
                  setSecondsvip("00")
                }else{
                  var sstr = s.toString();
                  setSecondsvip(String(sstr).padStart(2, "0"));
                }
                 
                }else if(end == false){
                       setStart(false)
                   if (timerRefC.current) {
        clearInterval(timerRefC.current);
      }       
                  try {
                    fetch('/api/update-vip', {
                     method: 'POST',
                     headers: {
                       'Content-Type':'application/json',
                     },
                     body: JSON.stringify({idd:String(UserDt?.idd)}),
                   })
                   .then((res) => res.json())
                   .then((data) => {
                     if (data.success) {
                      var gtticket = Number(data.ticket)
                      if(gtticket <= Number(30)){
                        setvipwalkcoinplus(10000)
                        setvipticketplus(5)
                      }else if(gtticket <= 60){
                       setvipwalkcoinplus(15000)
                        setvipticketplus(7)
                      }else {
                       setvipwalkcoinplus(20000)
                        setvipticketplus(10)
                      }
                        setEnd(true)
                            setStart(true)
                      setMinutesvip("00")
                      setSecondsvip("00")
                      setHoursvip("00")
                      const target = new Date(data.dtMining);
                const now = new Date(data.dt);
                 setvipTicket(Number(data.ticket))
    
                 var q = 0    
                 timerRefC.current = setInterval(() =>{
                   q += 1000
                   const difference = target.getTime() - now.getTime() - q;
    
                   if(difference > 1000 ){
    
                      
                   const h = Math.floor(difference % (1000*60*60*24)) / (1000*60*60);
                   var hstr = Math.trunc(h).toString();
                   setHoursvip(String(hstr).padStart(2, "0")); 
                   const m = Math.floor((difference % (1000*60*60)) / (1000*60))
                   if(Math.sign(m) === -1){
                    setMinutesvip("00")
                   }else{
                     var mstr = m.toString();
                     setMinutesvip(String(mstr).padStart(2, "0"));
                   }
                   const s = Math.floor((difference % (1000*60)) / 1000)
                   if(Math.sign(s) === -1){
                     setSecondsvip("00")
                   }else{
                     var sstr = s.toString();
                     setSecondsvip(String(sstr).padStart(2, "0"));
                   }
                    
                   }else{
                     setMinutesvip("00")
                     setSecondsvip("00")
                     setHoursvip("00")
                   }
          
    
                 },1000);
    
                     } else {
                     }
                   })
                 } catch (err) {
                 }
    
                }
       
    
              },1000);
    
            }          
           } else {
           
           }
         })
       } catch (err) {
        
       } 
      }
      }else{
        setActiveVip(true)
        try {
          fetch('/api/get-vip', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String(UserDt?.idd) }),
         })
         .then((res) => res.json())
         .then((data) => {
           if (data.success) {
          
            var gtticket = Number(data.ticket)
            if(gtticket <= Number(30)){
              setvipwalkcoinplus(10000)
              setvipticketplus(5)
            }else if(gtticket <= 60){
             setvipwalkcoinplus(15000)
              setvipticketplus(7)
            }else {
             setvipwalkcoinplus(20000)
              setvipticketplus(10)
            }
    
            const target = new Date(data.dtMining);
            const now = new Date(data.dt);
            const difference = target.getTime() - now.getTime();
             setvipTicket(Number(data.ticket))
              setStart(true)
             if (timerRefC.current) {
        clearInterval(timerRefC.current);
      }
            if(difference < 0){
                
              try {
                fetch('/api/update-vip', {
                 method: 'POST',
                 headers: {
                   'Content-Type':'application/json',
                 },
                 body: JSON.stringify({idd:String(UserDt?.idd)}),
               })
               .then((res) => res.json())
               .then((data) => {
                 if (data.success) {
                  var gtticket = Number(data.ticket)
                  if(gtticket <= Number(30)){
                    setvipwalkcoinplus(10000)
                    setvipticketplus(5)
                  }else if(gtticket <= 60){
                   setvipwalkcoinplus(15000)
                    setvipticketplus(7)
                  }else {
                   setvipwalkcoinplus(20000)
                    setvipticketplus(10)
                  }
                  setMinutesvip("00")
                  setSecondsvip("00")
                  setHoursvip("00")
                  const target = new Date(data.dtMining);
            const now = new Date(data.dt);
             setvipTicket(Number(data.ticket))
             
             setStart(true)
             var q = 0    
             timerRefC.current = setInterval(() =>{
               q += 1000
               const difference = target.getTime() - now.getTime() - q;
    
               if(difference > 1000 ){
    
                  
               const h = Math.floor(difference % (1000*60*60*24)) / (1000*60*60);
               var hstr = Math.trunc(h).toString();
               setHoursvip(String(hstr).padStart(2, "0")); 
               const m = Math.floor((difference % (1000*60*60)) / (1000*60))
               if(Math.sign(m) === -1){
                setMinutesvip("00")
               }else{
                 var mstr = m.toString();
                 setMinutesvip(String(mstr).padStart(2, "0"));
               }
               const s = Math.floor((difference % (1000*60)) / 1000)
               if(Math.sign(s) === -1){
                 setSecondsvip("00")
               }else{
                 var sstr = s.toString();
                 setSecondsvip(String(sstr).padStart(2, "0"));
               }
                
               }else{
                 setMinutesvip("00")
                 setSecondsvip("00")
                 setHoursvip("00")
               }
      
    
             },1000);
    
                 } else {
                 }
               })
             } catch (err) {
             }
    
            }else {
             
              var q = 0    
              timerRefC.current = setInterval(() =>{
                q += 1000
                const difference = target.getTime() - now.getTime() - q;
    
                if(difference > 1000 ){
    
                   
                const h = Math.floor(difference % (1000*60*60*24)) / (1000*60*60);
                var hstr = Math.trunc(h).toString();
                setHoursvip(String(hstr).padStart(2, "0")); 
                const m = Math.floor((difference % (1000*60*60)) / (1000*60))
                if(Math.sign(m) === -1){
                 setMinutesvip("00")
                }else{
                  var mstr = m.toString();
                  setMinutesvip(String(mstr).padStart(2, "0"));
                }
                const s = Math.floor((difference % (1000*60)) / 1000)
                if(Math.sign(s) === -1){
                  setSecondsvip("00")
                }else{
                  var sstr = s.toString();
                  setSecondsvip(String(sstr).padStart(2, "0"));
                }
                 
                }else if(end == false){
                       setStart(false)
                   if (timerRefC.current) {
        clearInterval(timerRefC.current);
      }       
                  try {
                    fetch('/api/update-vip', {
                     method: 'POST',
                     headers: {
                       'Content-Type':'application/json',
                     },
                     body: JSON.stringify({idd:String(UserDt?.idd)}),
                   })
                   .then((res) => res.json())
                   .then((data) => {
                     if (data.success) {
                      var gtticket = Number(data.ticket)
                      if(gtticket <= Number(30)){
                        setvipwalkcoinplus(10000)
                        setvipticketplus(5)
                      }else if(gtticket <= 60){
                       setvipwalkcoinplus(15000)
                        setvipticketplus(7)
                      }else {
                       setvipwalkcoinplus(20000)
                        setvipticketplus(10)
                      }
                        setEnd(true)
                            setStart(true)
                      setMinutesvip("00")
                      setSecondsvip("00")
                      setHoursvip("00")
                      const target = new Date(data.dtMining);
                const now = new Date(data.dt);
                 setvipTicket(Number(data.ticket))
    
                 var q = 0    
                 timerRefC.current = setInterval(() =>{
                   q += 1000
                   const difference = target.getTime() - now.getTime() - q;
    
                   if(difference > 1000 ){
    
                      
                   const h = Math.floor(difference % (1000*60*60*24)) / (1000*60*60);
                   var hstr = Math.trunc(h).toString();
                   setHoursvip(String(hstr).padStart(2, "0")); 
                   const m = Math.floor((difference % (1000*60*60)) / (1000*60))
                   if(Math.sign(m) === -1){
                    setMinutesvip("00")
                   }else{
                     var mstr = m.toString();
                     setMinutesvip(String(mstr).padStart(2, "0"));
                   }
                   const s = Math.floor((difference % (1000*60)) / 1000)
                   if(Math.sign(s) === -1){
                     setSecondsvip("00")
                   }else{
                     var sstr = s.toString();
                     setSecondsvip(String(sstr).padStart(2, "0"));
                   }
                    
                   }else{
                     setMinutesvip("00")
                     setSecondsvip("00")
                     setHoursvip("00")
                   }
          
    
                 },1000);
    
                     } else {
                     }
                   })
                 } catch (err) {
                 }
    
                }
       
    
              },1000);
    
            }          
           } else {
           
           }
         })
       } catch (err) {
        
       } 
        }
      }

        }
       })
     } catch (err) {
     
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
  
  return (

      
              
            
    

     <div className="w-full bg-white overflow-y-auto text-white h-screen text-wrap font-bold flex flex-col max-w-xl">
      
      {open == true ? 
      
      <center>

      <div className="fixed max-w-xl mx-auto inset-0 bg-[#808080] overflow-x-auto bg-opacity-50 h-screen   items-center z-40 justify-center p-2 ">
          <center>
          <div className="bg-white max-w-xl mx-auto   border-4 border-double  border-[#ffae19]/[0.9] glowbox transform  rounded-3xl bg-white shadow-xl  data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                                     
                                     <div className="h-2" />
                               
                                     <div className="flex flex-col  items-center justify-center  mt-1 ">
                                                                         
                                                                         <button onClick={() => {setOpen(false)}}>
                                                                         <Image 
                                                                        src={Close as StaticImageData} 
                                                                      className="w-9 h-9 aspect-square object-cover"
                                                                      alt=""
                                                                    />
                                                                         </button>
                                                                         
                                                                              </div>
                                                            <div className="sm:flex mt-2 sm:items-center">
                                                             
                                                              <div className=" w-full text-center  ">
                                                                
                                                                <center>
                                                                <p  className="text-base font-semibold text-gray-900">
                                                                Need Extra WalkCoin ?
                                                                </p>
                                                                <div className="">
                                                                  <p className="text-sm text-gray-500">
                                                                  You can get additional WalkCoin tokens and raffle tickets every 2 hours 
                                                                  </p>
                                                                </div>
                                                             </center>
                                                                
                                                              </div>
                                                            </div>
                                                          
                                                          <div className="h-3" />
                               
                                                           <div  className="flex flex-col justify-center   items-center ">
                                                                            
                                                                              <div className="flex items-center justify-center space-x-3">
                                                                              <button onClick={() => {extra1 == true ? '':setItm(1)}} className={`${Itm == 1 || extra1 == true? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                              <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                              <Image 
                                                                        src={FootPrint as StaticImageData} 
                                                                      className="w-6 h-6 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              <p className="text-white   font-bold glow text-sm ">+{Number(10000).toLocaleString()}</p>
                                                                              <Image 
                                                                        src={Extra as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                              <p className=" text-black font-bold glow text-[13px] text-wrap">15 Stars</p>
                                                                              <Image 
                                                                        src={Star as StaticImageData} 
                                                                      className="w-5 h-5 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              </button>
                                                                
                                                                              <button onClick={() => {extra2 == true ? '':setItm(2)}} className={`${Itm == 2 || extra2 == true? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                              <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                              <Image 
                                                                        src={FootPrint as StaticImageData} 
                                                                      className="w-6 h-6 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              <p className="text-white   font-bold glow text-sm ">+{Number(15000).toLocaleString()}</p>
                                                                              <Image 
                                                                        src={Extra as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                              <p className=" text-black font-bold glow text-[13px] text-wrap">30 Stars</p>
                                                                              <Image 
                                                                        src={Star as StaticImageData} 
                                                                      className="w-5 h-5 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              </button>
                                                                              </div>
                                                                              <div className="h-3" />
                                                                              <div className="flex items-center justify-center  space-x-3">
                                                                              <button onClick={() => {extra3 == true ? '':setItm(3)}} className={`${Itm == 3 || extra3 == true? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                              <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                              <Image 
                                                                        src={FootPrint as StaticImageData} 
                                                                      className="w-6 h-6 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              <p className="text-white   font-bold glow text-sm ">+{Number(20000).toLocaleString()}</p>
                                                                              <Image 
                                                                        src={Extra as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                              <p className=" text-black font-bold glow text-[13px] text-wrap">55 Stars</p>
                                                                              <Image 
                                                                        src={Star as StaticImageData} 
                                                                      className="w-5 h-5 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              </button>
      
                                                                              <button onClick={() => {extra4 == true ? '':setItm(4)}} className={`${Itm == 4 || extra4 == true ? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                                                  <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                                                  <Image 
                                                                                            src={TicketCircle as StaticImageData} 
                                                                                          className="w-6 h-6 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  <p className="text-white   font-bold glow text-sm px-5 ">+5</p>
                                                                                                  <Image 
                                                                                            src={Extra as StaticImageData} 
                                                                                          className="w-7 h-7 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  </div>
                                                                                                  <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">15 Stars</p>
                                                                                                  <Image 
                                                                                            src={Star as StaticImageData} 
                                                                                          className="w-5 h-5 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  </div>
                                                                                                  </button>
                                                                              </div>
                                                                             
                                                                              </div>
                               
                                                                               <div className="h-3" />
                                                                                    
                                                                                                  <div className="flex ml-1 justify-center space-x-3  items-center  rounded-full ">
                                                                                                  
                                                                                                  
                                                                                                 
                                  
                                                                                                  <button onClick={() => {extra5 == true ? '':setItm(5)}} className={`${Itm == 5 || extra5 == true? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                                                  <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                                                  <Image 
                                                                                            src={TicketCircle as StaticImageData} 
                                                                                          className="w-6 h-6 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  <p className="text-white   font-bold glow text-sm px-4 ">+10</p>
                                                                                                  <Image 
                                                                                            src={Extra as StaticImageData} 
                                                                                          className="w-7 h-7 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  </div>
                                                                                                  <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">30 Stars</p>
                                                                                                  <Image 
                                                                                            src={Star as StaticImageData} 
                                                                                          className="w-5 h-5 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  </div>
                                                                                                  </button>
                                                                                                  
                                                                                    
                                                                                                  <button onClick={() => {extra6 == true ? '':setItm(6)}} className={`${Itm == 6 || extra6 == true? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                                                  <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                                                  <Image 
                                                                                            src={FootPrint as StaticImageData} 
                                                                                          className="w-6 h-6 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  <p className="text-white   font-bold glow text-sm px-4  ">+15</p>
                                                                                                  <Image 
                                                                                            src={Extra as StaticImageData} 
                                                                                          className="w-7 h-7 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  </div>
                                                                                                  <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">55 Stars</p>
                                                                                                  <Image 
                                                                                            src={Star as StaticImageData} 
                                                                                          className="w-5 h-5 aspect-square object-cover"
                                                                                          alt="Shiba Inu"
                                                                                        />
                                                                                                  </div>
                                                                                                  </button>
                                                                                    
                                                                                                  
                                                                                                 
                                                                                                  </div>
                                                                                                  <div className="h-3" />
                                                                                                  <div className="flex flex-col  justify-center space-x-2  items-center ">
                                                                                                  <p className="text-sm  text-[#ffae19]/[0.8]">
                                                                                                  *Purchase each item only once
                                                                  </p>
                                                                  <div className="h-2" />
                                                                                    <button onClick={() => {Itm == 0 ? '' : handleOpenLink()}} className={`${Itm ==0?'opacity-70':''} bg-[#ffae19]/[0.9] glowbox  flex px-3 rounded-xl border-white border-4  border-double  py-[8px] items-center justify-center text-center`}>
                                                                                     
                                                                                     <p className="text-base text-white  font-bold">{Itm == 0 ? '' : 'Buy' } {Itm == 1 ? '+10,000 Extra WalkCoin' :Itm == 2 ? '+15,000 Extra WalkCoin' : Itm == 3 ? '+20,000 Extra WalkCoin' : Itm == 4 ? '+5 Extra Tickets': Itm == 5 ? '+10 Extra Tickets' : Itm == 6 ? '+15 Extra Tickets' : 'No Item Selected'}</p>
                                                                                    
                                                                                    
                                                                                      </button>
                                                                                       <div className="w-full flex items-center justify-center">
                                                                                       <button onClick={() => {isCopy == false ? handleCopyLink() : ''}} className="flex ml-0.5 mt-2 bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-2xl px-2 py-[4px] ">
                                                                                                                 <Image 
                                                                                                                 src={copy as StaticImageData} 
                                                                                                               className="w-6 h-6 aspect-square object-cover"
                                                                                                               alt="Shiba Inu"
                                                                                                             />
                                                                                                                     <p className="text-white font-normal text-[15px]  mr-1 ml-1">{isCopy == false ? 'Copy command' : 'The command is copied'}</p>
                                                                                                                       </button>
                                                                                       </div>
                                                                                     
                                                                                    </div>
                               
                                                       <div className="flex flex-col text-center mt-2 space-x-1 items-center justify-start">
                                                                
                                                                 <p className="text-black/[0.7] font-normal w-[calc(100%-2rem)] text-sm">You can purchase the above items with Telegram stars in the WalkCoin bot by running the /extra command</p>
                                                       
                                                                 </div>
                                                                 <div className="h-20" /> 
          
                               
                                     </div>
          </center>
            
          </div>
      
          </center>

      :''}

{vip == true ? 
      
      <center>

      <div className="fixed max-w-xl mx-auto inset-0 bg-[#808080] overflow-x-auto bg-opacity-50 h-screen   items-center z-40 justify-center p-2 ">
          <center>
          <div className="bg-white max-w-xl mx-auto   border-4 border-double  border-[#ffae19]/[0.9] glowbox transform  rounded-3xl bg-white shadow-xl  data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                                     
                                     <div className="h-2" />
                               
                                     <div className="flex flex-col  items-center justify-center  mt-1 ">
                                                                         
                                                                         <button onClick={() => {setVip(false)}}>
                                                                         <Image 
                                                                        src={CloseB as StaticImageData} 
                                                                      className="w-12 h-10 aspect-square object-cover"
                                                                      alt=""
                                                                    />
                                                                         </button>
                                                                       
                                                                              </div>
                                                           
                                                             
                                                              <div className=" w-full text-center justify-center ">
                                                                
                                                                <center>
                                                                  <div className="flex mt-2 flex-col items-center justify-center">
                                                                  <Image 
                                                                        src={VipIcon as StaticImageData} 
                                                                      className="w-16 h-12 aspect-square object-cover"
                                                                      alt=""
                                                                    />
                                                                  <p  className="text-[18px] font-black mt-0.5 text-[#ffae19]/[0.9]">
                                                                VIP Club
                                                                </p>
                                                                 
                                                                  </div>
                                                               
                                                                <div className="flex flex-col mr-3 ml-3">
                                                                  <p className="text-sm text-[#ffae19]/[0.8]">
                                                                  Join the VIP club and earn more WalkCoin tokens and Raffle tickets every 2 hours
                                                                  </p>
                                                                  
                                                                </div>
                                                                <div className="flex w-full   items-center  justify-center items-center">
               <div className="flex w-[calc(100%-2rem)] mt-2  bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-1 py-[3px] ">
                <Image 
                src={Vipticket as StaticImageData} 
              className="w-10 h-10   aspect-square object-cover"
              alt=""
            />
                      <div className="flex-grow text-center ">
                      <div className="flex flex-col items-center justify-center">
                      <p className=" text-white font-black text-[15px] mr-6 truncate">Number of VIP Tickets</p>
                      <h1 className="text-[16px] font-black bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] mr-6 from-blue-900 via-purple-500  to-indigo-500 inline-block text-transparent bg-clip-text">{vipTicket}</h1>
                      <p className="text-white font-Normal text-sm mr-6 glow">{hoursvip}h {minutesvip}m {secondsvip}s</p>

                      </div>
                      </div>
                      </div>
               </div>
                      
               <div className="flex    items-center  justify-center items-center">
               <div className="flex  mt-1  bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-3 py-[5px] ">
              
                      <div className="flex-grow text-center ">
                      <div className="flex items-center space-x-1 justify-center">
                      <p className=" text-white font-bold text-base truncate">VIP club status:</p>
                      <h1 className="text-sm font-black bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900 via-purple-500  to-indigo-500 inline-block text-transparent bg-clip-text">{activevip == true ? 'Active' : 'Inactive'}</h1>

                      </div>
                      </div>
                      </div>
               </div>
               <div className="flex flex-col mr-3 ml-3 mt-1 items-center space-x-1 justify-center">
               <p className="text-[13px] text-gray-500">
               When you join the VIP Club, you will receive a VIP ticket every 24 hours. 
                                                                  </p>
                                                                  
                                                                  <p className="text-[13px] text-gray-500">
                                                                  Please note that you must log in every 24 hours to receive your VIP ticket.
                                                                  </p>
                      </div>
                                                             </center>
                                                                
                                                              </div>
                                                       
                                                          
                                                          <div className="h-2" />
                               
                                                           <div  className="flex  justify-center   items-center ">
                                                                            
                                                                              <div className="flex flex-col items-center justify-center space-y-3">
                                                                              
                                                                              <div className="flex w-full space-x-3">

                                                                              <div className={` flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                              <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                             
                                                                              <p className="text-white   font-bold glow text-sm ">1-30 Tickets</p>
                                                                           
                                                                              </div>
                                                                              <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                                                  <div className="flex items-center">
                                                                                  <Image 
                                                                        src={FootPrint as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">+{Number(10000).toLocaleString()}</p>
                                                                                  </div>
                                                                                 
                                                                                  <div className="flex items-center">
                                                                                  <div className="w-1"/>

                                                                                  <Image 
                                                                        src={circleticket as StaticImageData} 
                                                                      className="w-5 h-5 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                                                                                                      <div className="w-1"/>

                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">+{5}</p>
                                                                                  </div>
                                                                                </div>
                                                                              <Image 
                                                                        src={giftvip as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              </div>

                                                                              <div className={` flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                              <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                             
                                                                              <p className="text-white   font-bold glow text-sm ">31-60 Tickets</p>
                                                                           
                                                                              </div>
                                                                              <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                                                  <div className="flex items-center">
                                                                                  <Image 
                                                                        src={FootPrint as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">+{Number(15000).toLocaleString()}</p>
                                                                                  </div>
                                                                                 
                                                                                  <div className="flex items-center">
                                                                                  <div className="w-1"/>

                                                                                  <Image 
                                                                        src={circleticket as StaticImageData} 
                                                                      className="w-5 h-5 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                                                                                                      <div className="w-1"/>

                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">+{7}</p>
                                                                                  </div>
                                                                                </div>
                                                                              <Image 
                                                                        src={giftvip as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              </div>

                                                                              </div>
                                                                              

                                                                              <div className={` flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                              <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                             
                                                                              <p className="text-white   font-bold glow text-sm ">*61 Tickets</p>
                                                                           
                                                                              </div>
                                                                              <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                                                  <div className="flex items-center">
                                                                                  <Image 
                                                                        src={FootPrint as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">+{Number(20000).toLocaleString()}</p>
                                                                                  </div>
                                                                                 
                                                                                  <div className="flex items-center">
                                                                                  <div className="w-1"/>

                                                                                  <Image 
                                                                        src={circleticket as StaticImageData} 
                                                                      className="w-5 h-5 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                                                                                                      <div className="w-1"/>

                                                                                  <p className=" text-black font-bold glow text-[13px] text-wrap">+{10}</p>
                                                                                  </div>
                                                                                </div>
                                                                              <Image 
                                                                        src={giftvip as StaticImageData} 
                                                                      className="w-7 h-7 aspect-square object-cover"
                                                                      alt="Shiba Inu"
                                                                    />
                                                                              </div>
                                                                              </div>
                                                                
                                                                             
                                                                              </div>
                                                                              
                                                                              
                                                                             
                                                                              </div>
                                                                              <div className="flex mr-3 ml-3 mt-4 items-center space-x-1 justify-center">
               <p className="text-[13px] font-bold bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900 via-purple-500 to-indigo-500 inline-block text-transparent bg-clip-text">{activevip == true ? `You currently receive ${vipwalkcoinplus.toLocaleString()} extra WalkCoin tokens and ${vipticketplus} extra Raffle tickets from the vip club every two hours.` : "You aren't currently receiving anything from the VIP club"}</p>
               
                      </div>
                      <div className="flex mr-3 ml-3 items-center space-x-1 mt-4 justify-center">
               <p className="text-[13px] text-[#ffae19]/[0.8]">
               Add the following VIP code to your name in Telegram:
                                                                  </p>
                      </div>
                                                                              <div className="flex w-full mt-1  items-center justify-center items-center space-x-1">
                
     
     
                <div className="flex bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-4 py-[10px] ">
                 

                       <div className="flex-1 text-center">
                       <div className="flex items-center space-x-1 justify-center">
                       
                  <p className=" text-white font-bold text-base truncate">{isCopyVip == true? 'The code is copied' : 'WalkCoin👣'}</p>
                       </div>
                       </div>
                       </div>
               
                       <button onClick={() => {isCopyVip == true ? '' : handleCopyLinkVIP()}} className="flex bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-2xl px-1 py-[4px] ">
                 <Image 
                 src={copy as StaticImageData} 
               className="w-7 h-7 aspect-square object-cover"
               alt="Shiba Inu"
             />
                     
                       </button>
                       
                       
                </div>
                
                <div className="flex mr-3 ml-3 mt-1 items-center space-x-1 justify-center">
                
               <p className="text-[13px] text-[#ffae19]/[0.9]">
               Once you have updated your name you will need to reload the app for the changes to take effect.
                                                                  </p>
                      </div>
                               
                                                     
                                                                 <div className="h-20" /> 
          
                               
                                     </div>
          </center>
            
          </div>
      
          </center>

      :''}
      

       <div className="flex w-full items-center justify-center items-center">
       <div className="flex w-[calc(100%-2rem)] bg-[#ffae19]/[0.9] border-white border-4 border-double mt-4 items-center  text-wrap  rounded-full px-1 py-[3px] ">
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

      <div className={`${blnlvl == true ? 'mt-4 w-full' : 'w-0 h-0'} flex flex-col justify-center items-center`}>

<ol className="flex items-center justify-center w-full">
{gtMpdel.map((nmb,index) => {
  if(blnlvl == true){

    if(nmb.id < 5 ){
    return(
      <li key={index} className={`${nmb.id == lvl ? 'dark:after:border-[#ffae19]/[0.9]' : nmb.id < lvl ? 'dark:after:border-[#ffae19]/[0.9]' : 'dark:after:border-[#ffae19]/[0.5]'}  flex  items-center  after:content-[''] after:w-5 after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block `}>
              <span className={`${nmb.id == lvl ? '' : nmb.id < lvl ? 'bg-[#ffae19]/[0.9] dark:bg-[#ffae19]/[0.9] w-5 h-5 lg:h-7 lg:w-7' : ''}  flex items-center justify-center  rounded-full   shrink-0`}>
                  <svg className={`${nmb.id == lvl ? '' : nmb.id < lvl ? 'w-3.5 h-3.5 text-white lg:w-4 lg:h-4 dark:text-white' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width={`${nmb.id == lvl ? '0' : nmb.id < lvl ? '2' : '0'}`} d="M1 5.917 5.724 10.5 15 1.5"/>
                  </svg>
                  
              </span>
              <span className={`${nmb.id == lvl ? 'w-5 h-5 lg:h-7 lg:w-7 dark:border-[#ffae19]/[0.9] border-2' : nmb.id < lvl ? '' : 'w-5 h-5 lg:h-7 lg:w-7 dark:border-[#ffae19]/[0.9] border-2'}  flex items-center justify-center  rounded-full   shrink-0`}>
              <GoDotFill className={`${nmb.id == lvl ? '' : nmb.id < lvl ? 'w-0 h-0' : 'opacity-50'}`} size={25} color="#ffae19" />
               </span>
          </li>
        )
  }else if(lvl == 5){
    
    return(
      <li key={index} className="flex items-center  ">
        <span className={`${nmb.id == lvl ? '' : nmb.id < lvl ? '' : 'bg-[#ffae19]/[0.9] dark:bg-[#ffae19]/[0.9] w-5 h-5 lg:h-7 lg:w-7'} flex items-center justify-center  rounded-full shrink-0`}>
        <svg className={`${nmb.id == lvl ? '' : nmb.id < lvl ? '' : 'w-3.5 h-3.5 text-white lg:w-4 lg:h-4 dark:text-white'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width={`${nmb.id == lvl ? '0' : nmb.id < lvl ? '0' : '2'}`} d="M1 5.917 5.724 10.5 15 1.5"/>
          </svg>
        </span>
        <span className={`${nmb.id == lvl ? 'w-5 h-5 lg:h-7 lg:w-7 dark:border-[#ffae19]/[0.9] border-2' : nmb.id < lvl ? 'w-5 h-5 lg:h-7 lg:w-7 dark:border-[#ffae19]/[0.9] border-2' : ''}  flex items-center justify-center  rounded-full   shrink-0`}>
             <GoDotFill className={`${nmb.id == lvl ? '' : nmb.id < lvl ? 'w-0 h-0' : 'w-0 h-0'}`} size={25} color="#ffae19" />
              </span>
    </li>
    )
  }else if (lvl ==6){
    return(
      <li key={index} className="flex items-center  ">
        <span className={`bg-[#ffae19]/[0.9] dark:bg-[#ffae19]/[0.9] w-5 h-5 lg:h-7 lg:w-7 flex items-center justify-center  rounded-full shrink-0`}>
        <svg className={`w-3.5 h-3.5 text-white lg:w-4 lg:h-4 dark:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width={`2`} d="M1 5.917 5.724 10.5 15 1.5"/>
          </svg>
        </span>
        
    </li>
    )
  }else{
    return(
      <li key={index} className={`${nmb.id == lvl ? 'dark:after:border-[#ffae19]/[0.9]' : nmb.id < lvl ? 'dark:after:border-[#ffae19]/[0.9]' : 'dark:after:border-[#ffae19]/[0.5]'}  flex  items-center  after:content-['']  after:inline-block `}>
              <span className={`${nmb.id == lvl ? '' : nmb.id < lvl ? 'bg-[#ffae19]/[0.9] dark:bg-[#ffae19]/[0.9] w-5 h-5 lg:h-7 lg:w-7' : ''}  flex items-center justify-center  rounded-full   shrink-0`}>
                  <svg className={`${nmb.id == lvl ? '' : nmb.id < lvl ? 'w-3.5 h-3.5 text-white lg:w-4 lg:h-4 dark:text-white' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width={`${nmb.id == lvl ? '0' : nmb.id < lvl ? '2' : '0'}`} d="M1 5.917 5.724 10.5 15 1.5"/>
                  </svg>
                  
              </span>
              <span className={`${nmb.id == lvl ? 'w-5 h-5 lg:h-7 lg:w-7 dark:border-[#ffae19]/[0.9] border-2' : nmb.id < lvl ? '' : 'w-5 h-5 lg:h-7 lg:w-7 dark:border-[#ffae19]/[0.9] border-2'}  flex items-center justify-center  rounded-full   shrink-0`}>
              <GoDotFill className={`${nmb.id == lvl ? '' : nmb.id < lvl ? 'w-0 h-0' : 'opacity-50'}`} size={25} color="#ffae19" />
               </span>
          </li>
        )
  }

  }
  
  }) }
    
</ol>

  {gtMpdelC.map((nmb,index) => {
    if(blnlvl == true){
      return(
        <ol className={`${blnlvl == true ? 'mt-4 w-full mr-2 ml-2' : 'w-0 h-0'} flex flex-col  items-center justify-center `}>

          <div className="flex w-full justify-center items-center  ">
           <div className="w-2"/>
          <div className="flex items-center justify-center">
                  <p className=" text-black font-Large glow text-base mr-1 truncate">{Number(UserDt?.gtpoint).toLocaleString()}</p>
                  </div>

<div className="flex grow ml-1 mr-1">
<ProgressBar
  completed={Number(UserDt?.gtpoint)}
  maxCompleted={Number(endpoint)}
  className="grow  rounded-full "
  customLabel=" "
    barContainerClassName=" bg-[#6b4d11d1]/[0.2] rounded-full"
  completedClassName=""
    bgColor="#ffae19"
/>
</div>
    
<div className="flex items-center  justify-center">
                  </div>

                  <div className="flex items-center justify-center">
                  <p className=" text-black font-Large glow text-base ml-1 truncate">{Number(endpoint).toLocaleString()}</p>
                  </div>
                  <div className="w-2"/>
          </div>
          
      
        
     
        
        <div className="flex mt-2 space-x-2  items-center  justify-center items-center">
        <div className="flex">
      <Image 
            src={Dollar as StaticImageData} 
          className="w-8 h-8 aspect-square object-cover"
          alt=""
        />
        <div className="flex text-center ">
        <div className="flex items-center justify-center">
        <p className=" text-black font-medium  text-[15px]   truncate">+{Number(price).toFixed(8)}</p>
        </div>
        </div>
      </div>
          <div className={`${activeBtn == false ? 'opacity-75' : Number(UserDt?.gtpoint) >= Number(endpoint) ? '' : 'opacity-75'} flex bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-1 py-[7px]`}>
          
        
        <button onClick={() => {nmb.click == true ? '' : activeBtn == false ? '' : Number(UserDt?.gtpoint) >= Number(endpoint) ? handleupdateprice() : '' } } className={`  flex w-16 h-5 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
                    <p className={` text-white glow text-[15px] font-medium `}>Claim</p>
        
                    </button> 
                  </div>
      
              
          </div>
          
    </ol>
      )
    }
  }) }

</div>

       <div className="flex-grow mt-4 bg-[#f3ba2f]  glowbox rounded-t-[48px] relative z-0">
        <div className="absolute top-[2px] left-0 right-0 bottom-0  bg-white rounded-t-[46px]">        

        <div className="flex  mr-4 ml-4 mt-4 justify-center items-center">
 
 <button onClick={() => setVip(true)} className={` flex space-x-1 bg-[#ffae19]/[0.9] glowbox border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-full px-3 py-[6px]`}>
                    
   
                    <div className="flex-1 text-center">
                    <div className="flex items-center space-x-1 justify-center">
                  
               <p className=" text-white font-black text-sm truncate">VIP Club</p>
                    </div>
                    </div>
                    <Image 
     src={Vipticket as StaticImageData} 
   className="w-7 h-7 aspect-square object-cover"
   alt=""
 />
                    </button>

</div>

        <div className="flex justify-center items-center mt-1 ">
          <div className="flex w-80 h-80 p-3"> 
            <div className="flex grow w-full h-full relative  rounded-full border-[#ffae19]/[0.9] glowbox border-4 border-double">
          <Image
       src={UserDt?.selectcharacter == "1"?  toypic:UserDt?.selectcharacter == "2" ? Mousey:UserDt?.selectcharacter == "3"?jackie:UserDt?.selectcharacter == "4"? swatguy:UserDt?.selectcharacter == "5"? ev:UserDt?.selectcharacter == "6"? AlienSoldier :Loading}
       className={`h-full w-full rounded-full absolute object-fill`}
       alt=""
         /> 
          <Image
          unoptimized={true}
       src={isMg as StaticImageData}
       className={`${isActive ?'' : 'collapse'} w-full h-full absolute rounded-full object-fill`}
       alt=""
         /> 
         
         
    
            </div> 
   
          </div>
          
        </div>

        <div className="flex grow mr-4 ml-4 justify-between items-between">
 
        <button onClick={() => setActiveTab('character')} className="flex  space-x-1 items-center text-wrap bg-[#ffae19]/[0.9]  border-white border-4  border-double rounded-full px-3 py-[6px] ">
         <p className="text-[15px] text-white font-black">Characters</p>
        </button>

        <button onClick={ () => setActiveTab('speed')
          } className="flex grow-0 bg-[#ffae19]/[0.9] space-x-1 items-center text-wrap border-white border-4  border-double rounded-full px-3 py-[7px] ">
        <Image
        src={UpgradeIcon as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt=""
       />
         <p className="text-[15px] text-white font-black">Speed Up</p>
        </button>

        
  </div>
  
        

        <div className="flex flex-col grow mb-2 mt-3 items-center justify-center">
        <button onClick={() => setOpen(true)} className={` flex  bg-white glowbox border-[#ffae19]/[0.9] border-4  border-double items-center justify-center text-center text-wrap  rounded-full px-3 py-[8px]`}>
                           
                           <p className=" text-[#ffae19]/[0.9] font-black text-[13px] truncate">Need Extra WalkCoin ?</p>

                        
                           </button>
        <div className="flex grow px-50 mt-1 justify-center items-center space-x-1">
        <Image
        src={FootPrint as StaticImageData} 
      className="w-10 h-10"
      alt=""
       />
          <div className="flex space-x-1 items-center text-wrap">
            
          <p className="text-xl text-[#ffae19] font-Large text-wrap">{miningPoint.toLocaleString()}</p>
          <h1 className="text-sm font-black bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]  from-blue-900 via-purple-500  to-indigo-500 inline-block text-transparent bg-clip-text">+{(Number(extraWalkCoin) + Number(vipwalkcoinplus)).toLocaleString()}</h1>
          <p className="text-base text-white bg-[#ffae19]/[0.9] font-Large rounded-full px-2 py-[3px]">×{UserDt?.speedlvl}</p>
          </div>
          
        
        </div>

        <div className="flex grow mt-1  justify-center items-center space-x-1">
        <Image
        src={circleticket as StaticImageData} 
      className="w-8 h-8"
      alt=""
       />
          <div className="flex items-center text-wrap bg-[#ffae19]/[0.9] space-x-1 font-Large rounded-full px-3 py-[3px]">
          <p className="text-base text-white font-Large text-wrap">{(Number(miningPoint)/3600).toFixed()} / {Number(UserDt?.speedlvl)*2}</p>
          <h1 className="text-sm font-black bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]  from-blue-900 via-purple-500  to-indigo-500 inline-block text-transparent bg-clip-text">+{Number(extraTicket) + Number(vipticketplus) }</h1>

          </div>
        </div>
        
          
        
        </div>

        <div className="flex px-10 justify-center">
          {gtClaimType.map((nmb,index) => {
          return(
            <button onClick={handlePurchase} className="flex mt-3 items-center w-80 rounded-full px-4 py-[12px] bg-[#ffae19]/[0.9] ">
        
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
            )
        }) }
        
        </div>
        <div className="h-20 mt-5" />
       </div> 
       </div>
     </div>

    )
}

export default HomeTab
