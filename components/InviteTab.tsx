'use client'

import Image, {StaticImageData} from "next/image";
import FootPrint from '@/icons/footprint.svg';
import addperson from '@/icons/addperson.svg';  
import { useEffect,useState,useRef } from "react"
import React from 'react';
import copy from '@/icons/copy.svg'
import Gift from '@/icons/gift.svg';
import { NewUserContext } from '@/contexts/UserContextB';
import Person from '@/icons/person.svg';
import Toast from 'typescript-toastify';
import Dollar from '@/icons/DollarWhite.svg';
import Etc from '@/icons/etc.svg';

type Task = {
  username:string
}

type Show = {
  id:number
  done:boolean,
  count:number,
  price:number,
  clickb:boolean
}

type modelB = {
  id: number
}

const InviteTab = () => {
 const [gtShow,setShow] = useState<Show[]>([]);
   const [gtMpdel,setModelB] = useState<modelB[]>([
                 { id: 1},
                 { id: 2 },
                 { id: 3 },
             ]);
      const [gtTasks,setTask] = useState<Task[]>([]);
     const [Loading,setLoading] = useState<boolean> (true);
     const { UserDt,setUserData } = React.useContext(NewUserContext);
      const [refresh, setRefresh] = useState<boolean>(false);
        const timerRef = useRef<NodeJS.Timeout | null>(null);
           const [refreshB, setRefreshB] = useState<boolean>(false);
 
     
     const inviteurl = "https://t.me/TheWalkCoinBot/WalkCoin"

     const handleinvite = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp
      tg.ready()
      const invitelink = `${inviteurl}?startapp=${UserDt?.idd}`
      const sharetext = `Play WalkCoin and earn cash for free!🤑 i've already withdrawn-don't miss out!💸`;
       const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(invitelink)}&text=${encodeURIComponent(sharetext)}`
         tg.openTelegramLink(fullUrl)     
      }
     }

     const handleCopyLink = () => {
      const inviteLink = `${inviteurl}?startapp=${UserDt?.idd}`
      navigator.clipboard.writeText(inviteLink)
        new Toast({
                    position: "top-center",
                    toastMsg: 'Referral link is copied',
                    autoCloseTime: 4500,
                    canClose: true,
                    showProgress: true,
                    pauseOnHover: true,
                    pauseOnFocusLoss: true,
                    type: "default",
                    theme: "light"
                  });
    }

  const handle = async(id:number,price:number,clickb:boolean) => {
      if(clickb == false){
        var newData = gtShow.map(el => {
          if(el.id == id)
             return Object.assign({}, el, {clickb:true})
          return el
      });
       setShow(newData)
        const updatevalue = (Number(UserDt?.value)+price).toFixed(8)

      try {
                            fetch('/api/updateprice', {
                             method: 'POST',
                             headers: {
                               'Content-Type': 'application/json',
                             },
                             body: JSON.stringify({ idd: String(UserDt?.idd),tokenvalue:String(updatevalue),task:String(id)}),
                           })
                           .then((res) => res.json())
                           .then((data) => {
                            if(data.success){
                              var newData = gtShow.map(el => {
                                  if(el.id == id)
                                     return Object.assign({}, el, {done:true})
                                  return el
                              });
                               setShow(newData)
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
    }
  
      useEffect(() => {

           
       try {
          fetch('/api/get-friends', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String(UserDt?.idd) }),
         })
         .then((res) => res.json())
         .then((data) => {
          if(data.success){
            setRefresh(true)
            if (timerRef.current) {
              clearInterval(timerRef.current);
            };
            try {
              fetch('/api/get-invitetask', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({ idd: String(UserDt?.idd) }),
             })
             .then((res) => res.json())
             .then((data) => {
              if(data.success){
                
                if(data.all.length == 0){
                  const model = {id: 1, done:false,count:2,price:0.00000005,clickb:false}
                  gtShow?.push(model)
                  const modelB = {id: 2, done:false,count:5,price:0.00000010,clickb:false}
                  gtShow?.push(modelB)
                  const modelC = {id: 3, done:false,count:15,price:0.00000015,clickb:false}
                  gtShow?.push(modelC)
                }else{
                   var blnA = false
                   var blnB = false
                   var blnC = false
        
                  data.all.forEach((t: any)=> {
                    const gttask = String(t.task)
                    if(gttask == "1"){
                      blnA = true
                      const model = {id: 1, done:true,count:2,price:0.00000005,clickb:false}
                       gtShow?.push(model)
                    }else if(gttask == "2"){
                      blnB = true
                      const model = {id: 2, done:true,count:5,price:0.00000010,clickb:false}
                      gtShow?.push(model)
                    }else if(gttask == "3"){
                      blnC = true
                      const model = {id: 3, done:true,count:15,price:0.00000015,clickb:false}
                      gtShow?.push(model)
                    }
        
                  })
        
                  if(!blnA){
                    const model = {id: 1, done:false,count:2,price:0.00000005,clickb:false}
                    gtShow?.push(model)
                  }
                  if(!blnB){
                    const model = {id: 2, done:false,count:5,price:0.00000010,clickb:false}
                    gtShow?.push(model)
                  } 
                  if(!blnC){
                    const model = {id: 3, done:false,count:15,price:0.00000015,clickb:false}
                    gtShow?.push(model)
                  }  
        
                }
                
              }
             })
           } catch (err) {
            
           }

            data.all.forEach((t: any)=> {
             
              let model = {
                username:t.username,
               
             }

             gtTasks.push(model)

            })

            setLoading(false)
          }
         })
       } catch (err) {
        
       }

       if(refresh == false) {
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
           
         <div className="flex-1 items-center   mt-5">
         
              <div className="flex-1 mt-1 text-center font-bold ">
              <p className="mr-2 ml-2 text-[#ffae19]/[0.9] font-Large text-2xl glow">Invite Friends!</p>
              <p className="mr-2 ml-2 text-[#ffae19]/[0.9] font-normal glow text-lg text-wrap">You and your friend will receive WalkCoin</p>
              </div>
              </div>
      
              <div className="flex-col  items-center justify-center items-center mr-4 ml-4  mt-4">
                
              <div className="flex w-full  items-center justify-center items-center space-x-2">
                
     
                <button onClick={() => handleinvite()} className="flex flex-grow bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px] ">
                 

                       <div className="flex-1 text-center">
                       <div className="flex items-center space-x-1 justify-center">
                       <Image 
                 src={addperson as StaticImageData} 
               className="w-7 h-7 aspect-square object-cover"
               alt="Shiba Inu"
             />
                  <p className=" text-white font-Large text-lg truncate">Invite a Friend</p>
                       </div>
                       </div>
                       </button>
               
                       <button onClick={() => handleCopyLink()} className="flex bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-2xl px-2 py-[4px] ">
                 <Image 
                 src={copy as StaticImageData} 
               className="w-8 h-8 aspect-square object-cover"
               alt="Shiba Inu"
             />
                     
                       </button>
                       
                </div>

                <div className="w-full flex-col mt-5 px-3 justify-center  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                         <div className="grow flex items-center">
                         <Image
    src={FootPrint}
  className="w-12 h-12  aspect-square object-cover  "
  alt="Shiba Inu"
/>
                       
          <div className="px-2"/>
          <div className="grow space-y-2">
          <p className="text-white font-bold text-lg text-wrap">Invite a Friend</p>
          <div className="grow flex items-center space-x-1 ">
                        <Image
    src={Gift as StaticImageData}
  className="w-6 h-6 "
  alt=""
/>     
          <p className="text-white font-normal  text-base">{Number(100000).toLocaleString()} WalkCoin And 7 Tickets for you</p> 
                        </div>
                        <div className="grow flex items-center space-x-1">
                        <Image
    src={Gift as StaticImageData}
  className="w-6 h-6 "
  alt=""
/>     
          <p className="text-white font-normal  text-base">{Number(50000).toLocaleString()} Walkcoin for your friend</p> 
                        </div>
          </div>
          

                         </div>                          
                        
                        <div className="h-1" />
                
                        </div>

                </div>
                <div className="h-1" />
                <div className="flex-1 mt-1 text-center font-bold ">
              <p className="mr-4 ml-4 text-black font-bold text-sm  ">Increase the price of your Walkcoin tokens by inviting friends</p>
              </div>
              <div className="h-1" />
                {gtShow.map((task,index) => {
                  if(Loading == false){
                    return(
                      <center key={index}>
                              
                               <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                               <div className="grow flex items-center">
                               <Image
          src={Etc}
        className="w-11 h-11  aspect-square object-cover  "
        alt="Shiba Inu"
      />
                             
                <div className="px-2"/>
                <div className="grow space-y-1">
                <p className="text-white font-Large text-[17px] text-wrap text-start">{gtTasks.length}/{task.count} friends</p>
                <div className="grow flex items-center space-x-1">
                              <Image
          src={Dollar as StaticImageData}
        className="w-7 h-7 "
        alt=""
      />     
                <p className="text-white font-normal  text-base">+{task.price.toFixed(8)}</p> 
                              </div>
                </div>
                {/* <div className="px-1"/> */}
                <div className="flex items-center">
               
                {/* <div className=" px-1"/> */}
                <button onClick={() => {task.done == false && gtTasks.length >= task.count ? handle(task.id,task.price,task.clickb) : ''} } className={`${gtTasks.length >= task.count? '' : 'opacity-70'} glowwhite bg-white flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
                <p className={` text-black font-Large`}>{task.done == true ? 'Done' : 'Claim'}</p>
    
     
                </button> 
                
                </div>
  
                               </div>                          
                              

                              </div>
                              <div className="h-3"/>
                            </center>
                    )
                  }
                  
                  }) }
                 
                <div className="flex-1 text-center font-bold ">
              <p className="mr-4 ml-4 text-black font-normal text-sm  ">Note: The reward for the invitation is limited, you will only be rewarded for 10 invitations, but your friends get their reward the same as before.</p>
                           <p className="mr-4 ml-4 text-black font-normal text-sm mt-1 ">*There is no limit to receiving tickets as a reward, You can receive tickets for each successful invitation. </p>

                </div>
               
             
              <div className="flex-1 mt-3 text-start font-bold ">
              <p className="mr-4 ml-4 text-black font-bold text-lg  ">Friends List ({gtTasks.length})</p>
              </div>
              {gtTasks.map((task,index) => {
                return(
                  <div key={index} className="flex flex-grow bg-[#6b4d11]/[0.3] border-white border-4 mt-1 border-double items-start justify-start text-start text-wrap  rounded-3xl px-2 py-[8px] ">
                 

                  <div className="flex-1 text-start">
                  <div className="flex items-center space-x-1 justify-start">
                  <Image 
            src={Person as StaticImageData} 
          className="w-12 h-12 aspect-square object-cover"
          alt=""
        />
             <p className=" text-black font-Large text-lg truncate">{task.username}</p>
                  </div>
                  </div>
                  </div>
                )

                })}

<div className={`${Loading == true? 'w-full mt-3' : 'w-0 h-0'} flex grow justify-center items-center`}>
                <svg aria-hidden="true" className={`w-6 h-6 flex text-gray-200 animate-spin dark:text-black fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
                </div>
                <div className="h-20 mt-5" />
       </div>

       
         </div>
    )
}

export default InviteTab
