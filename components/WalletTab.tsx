'use client'

import Image, {StaticImageData} from "next/image"
import FootPrint from '@/icons/footprint.svg';
import DollarB from '@/icons/DollarWhite.svg';  
import { useEffect,useState,useRef } from "react"
import React, { useContext } from 'react';
import Tether from '@/icons/tether.svg'
import { useTab } from '@/contexts/TabContext'
import { NewUserContext } from '@/contexts/UserContextB';
import Multiply from '@/icons/multiply.svg';
import Support from '@/icons/support.svg';
import TetherB from '@/icons/tetherb.svg';
import Equal from '@/icons/equal.svg';
import alien from '@/welcomeimg/alien.png';
import eve from '@/welcomeimg/eve.png';
import jacky from '@/welcomeimg/jacky.png';
import mousey from '@/welcomeimg/mousey.png';
import swatguy from '@/welcomeimg/swatguy.png';
import toy from '@/welcomeimg/toy.png';
import unlock from '@/icons/unlock.svg';
import lock from '@/icons/lockb.svg';

type Task = {
  id:string
  date: Date;
  amount:string;
  status:string
}

 type modelB = {
      id: number
  }

const WalletTab = () => {

      const [gtTasks,setTask] = useState<Task[]>([]);
      const { activeTab, setActiveTab } = useTab()
      const { UserDt,setUserData } = React.useContext(NewUserContext);
    const [Loading,setLoading] = useState<boolean> (true);
       const [refresh, setRefresh] = useState<boolean>(false);


  const [gtMpdel,setModelB] = useState<modelB[]>([
                { id: 1},
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5},
                { id: 6 },
            ]);
                const timerRef = useRef<NodeJS.Timeout | null>(null);
                 const [refreshB, setRefreshB] = useState<boolean>(false);
                 const [refreshC, setRefreshC] = useState<boolean>(false);

                 const [A2, setA2] = useState<boolean>(false);
                 const [A3, setA3] = useState<boolean>(false);
                 const [A4, setA4] = useState<boolean>(false);
                 const [A5, setA5] = useState<boolean>(false);
                 const [A6, setA6] = useState<boolean>(false);

                   useEffect(() => {

                   try {
              fetch('/api/get-withdraw', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({ idd: String(UserDt?.idd) }),
             })
             .then((res) => res.json())
             .then((data) => {
              if(data.success){
              
                setRefreshC(true)
                    // if (timerRef.current) {
                    //   clearInterval(timerRef.current);
                    // };
                    const mapstr = UserDt?.upgrade.split(',').map(Number);
                    gtMpdel.forEach((t: any)=> {
                    
                        const found = mapstr?.find(item => item === t.id);
                        const contain = found !== undefined
                        
                         if(t.id == 1){
                          
                        }else if (t.id == 2){
                          setA2(contain)
                        }else if (t.id == 3){
                          setA3(contain)
                        }else if(t.id == 4){
                          setA4(contain)
                        }else if(t.id == 5){
                          setA5(contain)
                        }else if(t.id == 6){
                          setA6(contain)
                        }
                        
                    })
               
                var nmb = 1
                const gtdata: Task[] = []
                data.all.forEach((t: any)=> {
                  
                  let model = {
                    id:String(nmb),
                    date:t.date,
                    amount:t.amount,
                    status:t.status
                 }
                 nmb++
                 gtdata.push(model)
                })
                setTask(gtdata)
                setLoading(false)
              
              }
             })
           } catch (err) {
            
           }
                
                  if(refreshC == false) {
                    timerRef.current = setInterval(() =>{
                     
                    setRefreshB(!refreshB)
                    },3000);
                   }
            
                  return () => {  if (timerRef.current) {
                    clearInterval(timerRef.current);
                  };
                };
            
                },[refreshB])
    
    return (
        <div className=" flex justify-center  overflow-auto">
         <div className="w-full h-screen bg-white flex-col ">

         <div className="flex-col w-full mt-4   items-center justify-start items-center">
            <div className="flex w-full items-center justify-center ">

            <div className="flex  items-center  rounded-full ">
              <div className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
              <div className="flex-col ro items-center justify-center px-2 mt-1 ">
              <p className="text-white   font-bold  text-sm ">WalkCoin Balance</p>
              </div>
              <div className="flex items-center rounded-lg bg-white mt-1 px-1 py-1 justify-center">
              <p className=" text-black font-bold glow text-[13px] text-wrap">{Number(UserDt?.gtpoint).toLocaleString()}</p>
              </div>
              </div>
              </div>
              <div className="flex items-center justify-center px-2">
              <Image 
        src={Multiply as StaticImageData} 
      className="w-5 h-5 aspect-square object-cover"
      alt=""
    />
              </div>
              <div className="flex  items-center  rounded-full ">
              <div className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
              <div className="flex-col ro items-center justify-center px-2 mt-1 ">
              <p className="text-white   font-bold  text-sm ">WalkCoin Price</p>
              </div>
              <div className="flex items-center rounded-lg bg-white mt-1 px-1 py-1 justify-center">
              <p className=" text-black font-bold glow text-[13px] text-wrap">{(Number(UserDt?.value)).toFixed(8)}</p>
              </div>
              </div>
              </div>            
          
            </div>

            <div className="flex w-full justify-center items-center  mt-2">
            <div className="flex items-center justify-start px-2 space-x-1">
            <Image 
        src={Equal as StaticImageData} 
      className="w-6 h-6 aspect-square object-cover"
      alt="Shiba Inu"
    />
    <div className="flex  items-center   rounded-full ">
              <div className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
              <div className="flex-col ro items-center justify-center px-2 mt-1 ">
              <p className="text-white   font-bold  text-sm ">WalkCoin Burning Reward</p>
              </div>
              <div className="flex items-center rounded-lg space-x-1 bg-white mt-1 px-1 py-1 justify-center">
              <p className=" text-black font-bold glow text-[13px] text-wrap">{(Number(UserDt?.gtpoint)*Number(UserDt?.value)).toFixed(8)}</p>
              <Image 
        src={Tether as StaticImageData} 
      className="w-5 h-5 aspect-square object-cover"
      alt=""
    />
              </div>
              </div>
              </div>
          
              </div>
              <div className="w-4" />
            </div>
           
           <div className="flex flex-col mt-3 ml-4 mr-4 space-y-1">

           <div className="flex w-full  items-center justify-center items-center space-x-2">
                
     
                <button onClick={() => {setActiveTab('withdraw')}} className="flex flex-grow bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px] ">
                 

                       <div className="flex-1 text-center">
                       <div className="flex items-center space-x-1 justify-center">
                       <Image 
                 src={TetherB as StaticImageData} 
               className="w-9 h-7 aspect-square object-cover"
               alt=""
             />
                  <p className=" text-white font-bold glow text-[16px] truncate">Burn WalkCoin</p>
                       </div>
                       </div>
                       </button>
              
                       <button onClick={() => {window.open("https://t.me/WalkCoinSupportbot")}} className="flex border-white border-double border-4 bg-[#ffae19]/[0.9] items-center text-wrap  rounded-full p-3 justify-center ">
                 <Image 
                 src={Support as StaticImageData} 
               className="w-5 h-5 aspect-square object-cover"
               alt=""
             />
                     
                       </button>
                       
                </div>
                <p className="text-black/[0.8] ml-1 text-sm text-wrap font-bold text-start">Unlock characters to become eligible to burn WalkCoin tokens and prepare for the airdrop</p>

                <div className="w-full py-4">
  <div className="relative flex items-center justify-between w-full">
    <div className="absolute left-0 top-2/4 h-0 w-full -translate-y-2/4 bg-[#ffae19]/[0.7]">
    </div>
    <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4  bg-[#ffae19]/[0.7] transition-all duration-500">
    </div>
    
    <div
      className="relative z-10 grid w-24 h-24 font-bold text-white transition-all duration-300 bg-white rounded-full place-items-center">
         <Image 
        src={toy as StaticImageData} 
      className="w-24 h-24 aspect-square object-cover"
      alt=""
    />
    
      <div className="absolute flex flex-col -bottom-[5.5rem] w-max text-center">
      <center>
      <h6
          className="block font-sans text-sm antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]">
          Ty
        </h6>
        <Image 
           src={unlock as StaticImageData} 
         className="w-10 h-10 aspect-square   object-cover"
         alt=""
       /> 
       
     <h6
          className="block font-sans text-sm antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]">
          Unlocked
        </h6>
        </center>
      
      </div>
     
    
       
    </div>
    <div
      className="relative z-10 grid w-24 h-24 font-bold text-white transition-all duration-300 bg-white rounded-full place-items-center">
         <Image 
        src={mousey as StaticImageData} 
      className="w-24 h-24 aspect-square object-cover"
      alt=""
    />
      
      <div className="absolute flex flex-col -bottom-[5.5rem] w-max text-center">
      <center>
      <h6
          className="block font-sans text-sm antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]">
          Mousey
        </h6>
        {A2 == true ?
          <Image 
        src={unlock as StaticImageData} 
      className="w-10 h-10 aspect-square object-cover"
      alt=""
    /> 
    :
    <Image 
        src={lock as StaticImageData} 
      className="w-8 h-8 aspect-square mt-1 object-cover"
      alt=""
    /> 
    }
        
     <h6
          className={`${A2 == false ? 'mt-1' : ''} block font-sans text-sm  antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]`}>
          {A2 == true ? 'Unlocked' : 'Locked'}
        </h6>
        </center>
      
      </div>

    </div>
    <div
      className="relative z-10 grid w-24 h-24 font-bold text-white transition-all duration-300 bg-white rounded-full place-items-center">
        <Image 
        src={jacky as StaticImageData} 
      className="w-24 h-24 aspect-square object-cover"
      alt=""
    />
      <div className="absolute flex flex-col -bottom-[5.5rem] w-max text-center">
      <center>
      <h6
          className="block font-sans text-sm antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]">
          Jackie
        </h6>
        {A3 == true ?
          <Image 
        src={unlock as StaticImageData} 
      className="w-10 h-10 aspect-square object-cover"
      alt=""
    /> 
    :
    <Image 
        src={lock as StaticImageData} 
      className="w-8 h-8 aspect-square mt-1 object-cover"
      alt=""
    /> 
    }
     <h6
          className={`${A3 == false ? 'mt-1' : ''} block font-sans text-sm  antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]`}>
          {A3 == true ? 'Unlocked' : 'Locked'}
        </h6>
        </center>
      
      </div>
    </div>
    
  </div>
 
</div>
<div className="flex justify-between h-16" />
<div className="flex justify-between h-1" />

<div className="w-full">
  <div className="relative flex items-center justify-between w-full">
    <div className="absolute left-0 top-2/4 h-0 w-full -translate-y-2/4 bg-[#ffae19]/[0.7]">
    </div>
    <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4  bg-[#ffae19]/[0.7] transition-all duration-500">
    </div>
 
    <div
      className="relative z-10 grid w-24 h-24 font-bold text-gray-900 transition-all duration-300 bg-white rounded-full place-items-center">
        <Image 
        src={swatguy as StaticImageData} 
      className="w-24 h-24 aspect-square object-cover"
      alt=""
    />
     
     <div className="absolute flex flex-col -bottom-[5.5rem] w-max text-center">
      <center>
      <h6
          className="block font-sans text-sm antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]">
          Swat Guy
        </h6>
        {A4 == true ?
          <Image 
        src={unlock as StaticImageData} 
      className="w-10 h-10 aspect-square object-cover"
      alt=""
    /> 
    :
    <Image 
        src={lock as StaticImageData} 
      className="w-8 h-8 aspect-square mt-1 object-cover"
      alt=""
    /> 
    } 
     <h6
          className={`${A4 == false ? 'mt-1' : ''} block font-sans text-sm  antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]`}>
          {A4 == true ? 'Unlocked' : 'Locked'}
        </h6>
        </center>
      
      </div>
    
    </div>
    <div
      className="relative z-10 grid w-24 h-24 font-bold text-gray-900 transition-all duration-300 bg-white rounded-full place-items-center">
        <Image 
        src={eve as StaticImageData} 
      className="w-24 h-24 aspect-square object-cover"
      alt=""
    />
     <div className="absolute flex flex-col -bottom-[5.5rem] w-max text-center">
      <center>
      <h6
          className="block font-sans text-sm antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]">
          Eve
        </h6>
        {A5 == true ?
          <Image 
        src={unlock as StaticImageData} 
      className="w-10 h-10 aspect-square object-cover"
      alt=""
    /> 
    :
    <Image 
        src={lock as StaticImageData} 
      className="w-8 h-8 aspect-square mt-1 object-cover"
      alt=""
    /> 
    }
     <h6
          className={`${A5 == false ? 'mt-1' : ''} block font-sans text-sm  antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]`}>
          {A5 == true ? 'Unlocked' : 'Locked'}
        </h6>
        </center>
      
      </div>

    </div>
  
    <div
      className="relative z-10 grid w-24 h-24 font-bold text-gray-900 transition-all duration-300 bg-white rounded-full place-items-center">
        <Image 
        src={alien as StaticImageData} 
      className="w-24 h-24 aspect-square object-cover"
      alt=""
    />
      
      <div className="absolute flex flex-col -bottom-[5.5rem] w-max text-center">
      <center>
      <h6
          className="block font-sans text-sm antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]">
          Alien Soldier
        </h6>
        {A6 == true ?
          <Image 
        src={unlock as StaticImageData} 
      className="w-10 h-10 aspect-square object-cover"
      alt=""
    /> 
    :
    <Image 
        src={lock as StaticImageData} 
      className="w-8 h-8 aspect-square mt-1 object-cover"
      alt=""
    /> 
    }
     <h6
          className={`${A6 == false ? 'mt-1' : ''} block font-sans text-sm  antialiased font-bold leading-relaxed tracking-normal text-[#ffae19]/[0.9]`}>
          {A6 == true ? 'Unlocked' : 'Locked'}
        </h6>
        </center>
      
      </div>

    </div>
  </div>
 
</div>
<div className="h-12 " />
<div className="h-12 " />

 

<div className="flex w-full  items-center justify-center text-center">
                
               
     
                <button onClick={() => {}} className="flex w-[calc(95%-2rem)]  opacity-60 bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px] ">
                 

                       <div className="flex-1 text-center">
                       <div className="flex items-center space-x-1 justify-center">
                       <Image 
                 src={FootPrint as StaticImageData} 
               className="w-7 h-7 aspect-square object-cover"
               alt="Shiba Inu"
             />
                  <p className=" text-white font-semibold text-lg truncate">Airdrop</p>
                       </div>
                       </div>
                       </button>
              
                    
                       
                </div>  

                   <div className="h-2 mt-2" />

<div className="w-full text-start justify-start">
  <p className=" text-[#ffae19]/[0.9] font-black text-[13px] truncate">WHO IS ELIGIBLE FOR AIRDROP ?</p>
</div>
 <div className="h-1" />
<ol className="relative ml-4">                  
    <li className="mb-5 ms-0 ">        
    
         <span className="absolute flex items-center justify-center mt-0.5 w-3 h-3 rounded-full -start-4 bg-[#ffae19]/[0.9]">
    
        </span>
        <h3 className="text-black/[0.7] font-bold text-[12px] text-wrap">Unlock all characters</h3>
    
    </li>
    <li className="mb-5 ms-0">            
         <span className="absolute flex items-center justify-center mt-0.5 w-3 h-3 rounded-full -start-4 bg-[#ffae19]/[0.9]">
    
        </span>
        <h3 className="text-black/[0.7] font-bold text-[12px] text-wrap">Have at least 10,000,000 WalkCoin tokens</h3>
    </li>
    <li className="mb-5 ms-0">            
         <span className="absolute flex items-center justify-center mt-0.5 w-3 h-3 rounded-full -start-4 bg-[#ffae19]/[0.9]">
    
        </span>
        <h3 className="text-black/[0.7] font-bold text-[12px] text-wrap">Invite 1 friend</h3>
    </li>
</ol>
             
               <p className="text-black/[0.7] ml-1 font-bold text-[12px] text-wrap">We decided to appreciate user activity and help the project grow. From now on, you can burn your WalkCoin before listing.</p>
               <center>
            <p className={`font-bold text-sm mt-3 mr-3 ml-3  text-gray-700 text-wrap`}>WalkCoin Burning Reward Details</p> 
            
               </center>
             

           </div>
    
    <div className="relative overflow-x-auto mt-4 mr-4 ml-4  ">
    <table className="w-full text-sm   text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase   bg-[#6b4d11]/[0.2] ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    #
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount(USDT)
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        
        {gtTasks.map((task,index) => {
          return(
           <tbody key={index}>
            <tr className="bg-white border-b text-black dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                    #{task.id}
                </th>
                <td className="px-6 py-4">
                    {new Date(task.date).toDateString()}
                </td>
                <td className="px-6 py-4">
                  {task.amount}
                </td>
                <td className="px-6 py-4">
                    {task.status}
                </td>
            </tr>
            
        </tbody>
          )
          }) }
        
    </table>
</div>


       </div>
       <div className="h-30 mt-5" />
         </div>
        </div>
    )
}

export default WalletTab










