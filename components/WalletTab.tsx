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


type Task = {
  id:string
  date: Date;
  amount:string;
  status:string
}

const WalletTab = () => {

      const [gtTasks,setTask] = useState<Task[]>([]);
      const { activeTab, setActiveTab } = useTab()
      const { UserDt,setUserData } = React.useContext(NewUserContext);
    const [Loading,setLoading] = useState<boolean> (true);
       const [refresh, setRefresh] = useState<boolean>(false);

          useEffect(() => {
            setTimeout(() => {
              setRefresh(true)
            }, 1000);  
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
               
                var nmb = 1
                data.all.forEach((t: any)=> {
                  
                  let model = {
                    id:String(nmb),
                    date:t.date,
                    amount:t.amount,
                    status:t.status
                 }
                 nmb++
                 gtTasks.push(model)
                 setLoading(false)
                })
              
              }
             })
           } catch (err) {
            
           }
           
          },[refresh])
    
    return (
        <div className=" flex justify-center  overflow-auto">
         <div className="w-full h-screen bg-white flex-col ">

         <div className="flex-col w-full mt-4   items-center justify-start items-center">
            <div className="flex grow ml-4 mr-4">
            <div className="flex  bg-[#ffae19]/[0.9]  items-center  text-wrap  rounded-full px-1 py-[3px] ">
        <Image 
        src={FootPrint as StaticImageData} 
      className="w-8 h-8 aspect-square object-cover"
      alt="Shiba Inu"
    />
              <div className="flex flex-col text-center  mr-5 ml-3">
                <div className="flex items-center justify-center px-2">
              <p className=" text-white font-normal  text-base text-wrap">Balance</p>
              </div>
              <div className="flex items-center justify-center px-2">
              <p className=" text-white font-bold glow text-base text-wrap">{Number(UserDt?.gtpoint).toLocaleString()}</p>
              </div>
              </div>
              </div>
              <div className="flex items-center justify-center px-2">
              <Image 
        src={Multiply as StaticImageData} 
      className="w-5 h-6 aspect-square object-cover"
      alt="Shiba Inu"
    />
              </div>
              
              <div className="flex  bg-[#ffae19]/[0.9]  items-center  text-wrap  rounded-full px-1 py-[3px] ">
        <Image 
        src={DollarB as StaticImageData} 
      className="w-8 h-8 aspect-square object-cover"
      alt="Shiba Inu"
    />
              <div className="flex flex-col text-center  mr-1 ">
                <div className="flex items-center justify-center px-2">
              <p className=" text-white font-normal  text-base text-wrap">WalkCoin Price</p>
              </div>
              <div className="flex items-center justify-center px-2">
              <p className=" text-white font-bold glow text-base text-wrap">{(Number(UserDt?.value)).toFixed(8)}</p>
              </div>
              </div>
              </div>
            </div>

            <div className="flex grow  mt-1 mr-1 ">
            <div className="flex items-center justify-start px-2 space-x-1">
              <p className=" text-black font-semibold font-serif glow text-sm text-wrap">= {(Number(UserDt?.gtpoint)*Number(UserDt?.value)).toFixed(8)}</p>
              <Image 
        src={Tether as StaticImageData} 
      className="w-6 h-6 aspect-square object-cover"
      alt="Shiba Inu"
    />
              </div>
            </div>
           
           <div className="flex mt-5 ml-4 mr-4">
           <div className="flex w-full  items-center justify-center items-center space-x-2">
                
     
                <button onClick={() => {setActiveTab('withdraw')}} className="flex flex-grow bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px] ">
                 

                       <div className="flex-1 text-center">
                       <div className="flex items-center space-x-1 justify-center">
                       <Image 
                 src={TetherB as StaticImageData} 
               className="w-7 h-7 aspect-square object-cover"
               alt="Shiba Inu"
             />
                  <p className=" text-white font-semibold text-lg truncate">request a withdrawal</p>
                       </div>
                       </div>
                       </button>
              
                       <button onClick={() => {window.open("https://t.me/WalkCoinSupportbot")}} className="flex bg-[#ffae19]/[0.9] items-center text-wrap  rounded-full px-3   py-[10px] ">
                 <Image 
                 src={Support as StaticImageData} 
               className="w-8 h-8 aspect-square object-cover"
               alt="Shiba Inu"
             />
                     
                       </button>
                       
                </div>
           </div>
           
           
           <div className='flex flex-col mt-2  justify-start items-start  mr-4 ml-4'>
      <p className={`font-bold text-base  text-black text-wrap`}>Details</p> 
      </div>
<div className="relative overflow-x-auto mt-2 mr-4 ml-4  ">
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
       <div className="h-20 mt-5" />
         </div>
        </div>
    )
}

export default WalletTab
