'use client'

import Image, {StaticImageData} from "next/image";
import Shiba from '@/imgs/shibalogo.png';
import earn from '@/icons/Earn';
import { useState,useEffect } from 'react'
import Toast from 'typescript-toastify';

type Task = {
    id:string
    icon: string | React.FC<{ className?: string }>;
    title:string;
    isDoing?:boolean;
    donetasks?: number[],
    click?:false,
    show?:boolean
}


const TasksTab = () => {

  const getFromLocalStorage = (key:string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.getItem(key)
} 

    const [gtTasks,setTask] = useState<Task[]>([]);
    const [pendingtasks,setPendingTasks] = useState<string> ();
    const [gtdonetasks,setDoneTasks] = useState<string> ();


    const handlePending = async(id:string,pendingtasks:string | undefined,click:boolean | undefined,isDoing:boolean | undefined) => {
     
      if(!click && !isDoing){
        var newData = gtTasks.map(el => {
          if(el.id == id)
             return Object.assign({}, el, {click:true})
          return el
      });
      
       setTask(newData)
        const str = `${pendingtasks},${id}`
        setPendingTasks(str)
        try {
          fetch('/api/pendingtask', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String("6124587322"),pendingtasks:str}),
         })
         .then((res) => res.json())
         .then((data) => {
          if(data.success){
          
          }
         })
       } catch (err) {
        
       }
      }
     
    }

    const handleClaim = async(id:string,isDoing:boolean | undefined,doneTasks:string | undefined,pendingtasks:string | undefined) => {
      if(isDoing){
        var array = pendingtasks?.split(",");
         array?.forEach( (item, index) => {
          if(parseInt(item) === Number(id)) array?.splice(index,1);
        });
        const str = `${doneTasks},${id}`
        try {
          fetch('/api/claim-task', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String("6124587322"),pendingtasks:String(array),donetasks:str}),
         })
         .then((res) => res.json())
         .then((data) => {
          if(data.success){
            setDoneTasks(str)
            setPendingTasks(String(array))
            gtTasks.forEach( (item, index) => {
              if(item.id === id) gtTasks.splice(index,1);
            });
            new Toast({
              position: "top-center",
              toastMsg: "You're received 10 SHIB",
              autoCloseTime: 4500,
              canClose: true,
              showProgress: true,
              pauseOnHover: true,
              pauseOnFocusLoss: true,
              type: "default",
              theme: "light"
            });
            const getpoint = localStorage.getItem("point")
            const plus = Number(getpoint)+10
            localStorage.setItem("point", String(plus));
            
          }
         })
       } catch (err) {
        
       }
      }
    }

    useEffect(() => {
        
        try {
            fetch('/api/get-tasks', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String("6124587322") }),
           })
           .then((res) => res.json())
           .then((data) => {
            if(data.success){
              const findpending: number[] = data.pendingtasks
              data.all.forEach((t: any)=> {
                const found = findpending.find(item => item === t.id);
                const contain = found !== undefined
                let model = {
                  id:t.id,
                  icon:earn,
                  title :t.title,
                  isDoing:contain,
                  show:true
               }
               setPendingTasks(findpending.toString())
               const doneTasks: number[] = data.donetasks
               setDoneTasks(doneTasks.toString())
               gtTasks.push(model)
              })
            
            }
           })
         } catch (err) {
          
         }

    },[])
    
    return (
        <div className=" flex justify-center">
         <div className="w-full h-screen bg-[#1d2025] flex-col ">
         <div className="flex-1 items-center">
      <center>
        <div className="w-20 h-20 py-[13px] glowNormal rounded-full mt-5 " >
            <center>
            <Image
        src={Shiba as StaticImageData}
      className="w-2/3 h-2/3  aspect-square object-cover   "
      alt="Shiba Inu"
    />
            </center>           
        </div>
        
      </center>
              <div className="flex-1 mt-1 text-center font-bold ">
              <p className="text-white font-Large text-2xl glow">Earn More SHIB</p>
              <div className="flex  items-center justify-center">
              <p className="w-2/3 text-white font-Large glow text-lg">Complete any task and receive instant rewards!</p>
              </div>
              </div>
              </div>
              
              {gtTasks.map((task,index) => {
                        return(
                          <center key={index}>
                            <div className="h-3"/>
                             <div className="flex-1 mt-3 px-3  items-center bg-[#2f3036]  rounded-full py-[5px] max-w-sm ">
                             <div className="grow flex items-center">
                             <task.icon
                                    className="w-10 h-10"
                                />
                           
              <div className="px-2"/>
              <div className="grow">
              <p className="text-white font-Large text-wrap text-left">{task.title} </p>
              <div className="grow flex items-center space-x-1">
                            <Image
        src={Shiba as StaticImageData}
      className="w-5 h-5 aspect-square object-cover"
      alt="Shiba Inu"
    />     
              <p className="text font-Large glow text-lg">+10</p> 
                            </div>
              </div>
              <div className="px-1"/>
              <div className="flex items-center">
             
              <div className=" px-1"/>
              <button onClick={() => {handleClaim(task.id,task.isDoing,gtdonetasks,pendingtasks),handlePending(task.id,pendingtasks,task.click,task.isDoing)}} className={`${task.isDoing || task.click? 'glowwhite bg-[#ffffff] animate-pulse' : 'bg-[#ffae19] glowstart' } flex-wrap z-0 rounded-full px-3 py-[3px]`}>
              <p className={`${task.isDoing? 'text-black' : 'text-white'}  font-Large ${task.click? 'text-[0px] w-0 h-0' : ''}`}>{task.isDoing? 'Claim' : 'Start'}</p>
                <div>
                <svg aria-hidden="true" className={`${task.click? 'w-6 h-6' : 'w-0 h-0'} text-gray-200 animate-spin dark:text-gray-600 fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
                </div>
   
              </button> 
              
              </div>

                             </div>                          
                            
                
                            </div>
                          </center>
                          
                        )
                    }) }
        </div>
          </div>
    
        
    )
}

export default TasksTab