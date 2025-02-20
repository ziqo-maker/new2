'use client'

import Image, {StaticImageData} from "next/image"
import FootPrint from '@/icons/footprint.svg';
import { useEffect,useState } from "react"
import React from 'react';


type Task = {
    id:string
    username: string;
    point:string;
  }

const RatingTab = () => {
    const [gtTasks,setTask] = useState<Task[]>([]);
        const [Loading,setLoading] = useState<boolean> (true);
  const [refresh, setRefresh] = useState<boolean>(false);
  
        useEffect(() => {
          setTimeout(() => {
            setRefresh(true)
          }, 1000);
                    try {
                      fetch('/api/get-user', {
                       method: 'POST',
                       headers: {
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({}),
                     })
                     .then((res) => res.json())
                     .then((data) => {
                      if(data.success){
                       
                        var nmb = 1
                        data.all.forEach((t: any)=> {
                          
                          let model = {
                            id:String(nmb),
                            username:t.firstName,
                            point:t.points,
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
        <div className="flex-1 mt-5 text-start font-bold text-wrap">
              <p className="mr-20 ml-5 text-[#ffae19]/[0.9] font-Large text-xl glow">Leaderboard</p>
              </div>

              <div className="relative overflow-x-auto mt-5 mr-4 ml-4  ">
    <table className="w-full text-sm   text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase  bg-[#ffae19]/[0.9] border-white border-4  border-double ">
            <tr>
                <th scope="col" className="text-start px-6 py-3">
                Nº
                </th>
                <th scope="col" className="">
                    Name
                </th>
                
                <th scope="col" className="px-6 py-3">
                <div className="flex grow">
    
    <div className="flex-1 text-center ">
    <div className="flex items-center justify-center">
    
    <p className="">WalkCoin</p>
    </div>
    </div>
    </div>
                </th>
            </tr>
        </thead>
        
        {gtTasks.map((task,index) => {
          return(
           <tbody key={index}>
            <tr className=" text-black text-wrap">
            <th scope="row" className="pl-5 px-2 text-wrap text-start font-medium  whitespace-nowrap ">
                {task.id}
            </th>
            <td className="text-wrap text-start">
                {task.username}
            </td>
            <td className="px-6 py-4 text-[#ffae19]/[0.9] text-end text-wrap">
            <div className="flex grow">
    
          <div className="flex-1 text-center ">
          <div className="flex items-center text-start justify-center space-x-2">
          <Image 
    src={FootPrint as StaticImageData} 
  className="w-6 h-6  glowbox rounded-full object-fit"
  alt="Shiba Inu"
/>
          <p className=" text-[#ffae19]/[0.9] font-bold glow text-base text-wrap">{Number(task.point).toLocaleString()} </p>
          </div>
          </div>
          </div>
          
            </td>
            
        </tr>
            
        </tbody>
          )
          }) }
        
    </table>
</div>
<div className={`${Loading == true? 'w-full mt-3' : 'w-0 h-0'} flex grow justify-center items-center`}>
                <svg aria-hidden="true" className={`w-6 h-6 flex text-gray-200 animate-spin dark:text-[#6b4d11]/[0.8] fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
                </div>
    <div className="h-20 mt-5" />
           </div>
           </div>
    )

}

export default RatingTab
