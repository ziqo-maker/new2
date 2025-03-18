'use client'

import Image, {StaticImageData} from "next/image";
import { useState,useEffect } from 'react'
import Toast from 'typescript-toastify';
import FootPrint from '@/icons/footprint.svg';
import Youtube from '@/icons/youtube.svg';
import GooglePlay from '@/icons/googleplay.svg';
import AppleStore from '@/icons/applestore.svg';
import Telegram from '@/icons/telegram.svg';
import Instagram from '@/icons/instagram.svg';
import Etc from '@/icons/etc.svg';
import { NewUserContext } from '@/contexts/UserContextB';
import React,{useRef} from 'react';
import Touch from '@/icons/touch.svg';
import { useTab } from '@/contexts/TabContext'
import Info from '@/icons/info.svg';
import NoTask from '@/icons/no-task.svg';


//15000

type Task = {
    id:string
    icon: StaticImageData;
    title:string;
    isDoing?:boolean;
    donetasks?: number[],
    click?:false,
    url:string,
    cost:number
}

type TaskCreated = {
  id:string
  icon: StaticImageData;
  describe:string;
  keyword:string;
  url:string;
  click?:false;
  donetasks?: number[];
  isDoing?:boolean;
  havekeyword?:boolean,
  keyworddescribe?:string,
  text:string
}

type Visit = {
  id:string
  click?:false,
}

const TasksTab = () => {

     const [gtVisit,setVisit] = useState<Visit[]>([]);
   
    const [gtTasks,setTask] = useState<Task[]>([]);
    const [pendingtasks,setPendingTasks] = useState<string> ();
    const [gtdonetasks,setDoneTasks] = useState<string> ();
    const { UserDt,setUserData } = React.useContext(NewUserContext);
    const [Loading,setLoading] = useState<boolean> (true);
    const { activeTab, setActiveTab } = useTab()
    const [gtTasksCreated,setTaskCreated] = useState<TaskCreated[]>([]);
    const [pendingCreatedtasks,setPendingCreatedTasks] = useState<string> ();
    const [gtdoneCreatedtasks,setDoneCreatedTasks] = useState<string> ();
    const [NoteKeyword,setNoteKeyword] = useState<boolean> (false);
    const [refresh, setRefresh] = useState<boolean>(false);
   const timerRef = useRef<NodeJS.Timeout | null>(null);
      const [refreshB, setRefreshB] = useState<boolean>(false);
      const [hideVisit, setHideVisit] = useState<boolean>(false);


      const handleVisit = async(click:boolean | undefined) => {
        if(!click){
          var newData = gtVisit.map(el => {
            if(el.id == "1")
               return Object.assign({}, el, {click:true})
            return el
        });
        setVisit(newData)
        window.open("https://reyeshehadtwobri.com?r5sdp=1162038"); 
       setTimeout(() => {
          
        try {
          fetch('/api/claim', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String(UserDt?.idd),miningPoint: 2000 }),
         })
         .then((res) => res.json())
         .then((data) => {
           if (data.success) {
            const plus = Number(UserDt?.gtpoint) + 2000
            setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(plus),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username)})
            const lcl = 2000
            new Toast({
              position: "top-center",
              toastMsg: `You're received ${lcl} WalkCoin`,
              autoCloseTime: 4500,
              canClose: true,
              showProgress: true,
              pauseOnHover: true,
              pauseOnFocusLoss: true,
              type: "default",
              theme: "light"
            });
            
          }
          setHideVisit(true)
         })
       } catch (err) {
       }
    
      }, 9000);

      }
     }
    const handlePendingB = async(id:string,pendingcreatedtasks:string | undefined,click:boolean | undefined,isDoing:boolean | undefined,url:string) => {
     
      if(!click && !isDoing){
        var newData = gtTasksCreated.map(el => {
          if(el.id == id)
             return Object.assign({}, el, {click:true})
          return el
      });
      
       setTaskCreated(newData)
        const str = `${pendingcreatedtasks},${id}`
        setPendingCreatedTasks(str)
        try {
          fetch('/api/pending-taskcreated', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String(UserDt?.idd),pendingcreatedtasks:str}),
         })
         .then((res) => res.json())
         .then((data) => {
          if(data.success){
            window.open(url); 
          }
         })
       } catch (err) {
        
       }
      }
     
    }

    
    const handlePending = async(id:string,pendingtasks:string | undefined,click:boolean | undefined,isDoing:boolean | undefined,url:string) => {
     
      if(!click && !isDoing){
        var newData = gtTasks.map(el => {
          if(el.id == id)
             return Object.assign({}, el, {click:true})
          return el
      });
      
       setTask(newData)
       const rndNmb = Math.floor(Math.random() * 3) + 1
       const str = `${pendingtasks},${id}`
        setPendingTasks(str)
       if(rndNmb == 2){
        try {
          fetch('/api/pendingtask', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String(UserDt?.idd),pendingtasks:str}),
         })
         .then((res) => res.json())
         .then((data) => {
          if(data.success){
            window.open(url); 
          }
         })
       } catch (err) {
        
       }
       }
        
     }
     
    }

    const handleClaimB = async(id:string,isDoing:boolean | undefined,donecreatedtasks:string | undefined,pendingCreatedtasks:string | undefined,cost:number) => {
      if(isDoing){
        var array = pendingCreatedtasks?.split(",");
         array?.forEach( (item, index) => {
          if(parseInt(item) === Number(id)) array?.splice(index,1);
        });
        const str = `${donecreatedtasks},${id}`
        try {
          fetch('/api/claim-createdtask', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String(UserDt?.idd),pendingcreatedtasks:String(array),donecreatedtasks:str,points : {increment : cost}}),
         })
         .then((res) => res.json())
         .then((data) => {
          if(data.success){
            setDoneCreatedTasks(str)
            setPendingCreatedTasks(String(array))
            gtTasksCreated.forEach( (item, index) => {
              if(item.id === id) gtTasksCreated.splice(index,1);
            });
             const lcl = cost.toLocaleString()
            new Toast({
              position: "top-center",
              toastMsg: `You're received ${lcl} WalkCoin`,
              autoCloseTime: 4500,
              canClose: true,
              showProgress: true,
              pauseOnHover: true,
              pauseOnFocusLoss: true,
              type: "default",
              theme: "light"
            });
            const getpoint = Number(UserDt?.gtpoint) + cost
            setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(getpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username)})

          }
         })
       } catch (err) {
        
       }
      }
    }

    const handleClaimKeyword = async(id:string,donecreatedtasks:string | undefined,pendingCreatedtasks:string | undefined,cost:number,keyword:string,text:string) => {
        
        if(text == keyword){
    
          var array = pendingCreatedtasks?.split(",");
         array?.forEach( (item, index) => {
          if(parseInt(item) === Number(id)) array?.splice(index,1);
        });
        const str = `${donecreatedtasks},${id}`
        try {
          fetch('/api/claim-createdtask', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ idd: String(UserDt?.idd),pendingcreatedtasks:String(array),donecreatedtasks:str,points : {increment : cost}}),
         })
         .then((res) => res.json())
         .then((data) => {
          if(data.success){
            setDoneCreatedTasks(str)
            setPendingCreatedTasks(String(array))
            gtTasksCreated.forEach( (item, index) => {
              if(item.id === id) gtTasksCreated.splice(index,1);
            });
             const lcl = cost.toLocaleString()
            new Toast({
              position: "top-center",
              toastMsg: `You're received ${lcl} WalkCoin`,
              autoCloseTime: 4500,
              canClose: true,
              showProgress: true,
              pauseOnHover: true,
              pauseOnFocusLoss: true,
              type: "default",
              theme: "light"
            });
            const getpoint = Number(UserDt?.gtpoint) + cost
            setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(getpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username)})

          }
         })
       } catch (err) {
        
       }

        }else{

          new Toast({
            position: "top-center",
            toastMsg: `The keyword is incorrect.`,
            autoCloseTime: 4500,
            canClose: true,
            showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "default",
            theme: "light"
          });

        }
      
    }

    const handleClaim = async(id:string,isDoing:boolean | undefined,doneTasks:string | undefined,pendingtasks:string | undefined,cost:number) => {
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
           body: JSON.stringify({ idd:String(UserDt?.idd),pendingtasks:String(array),donetasks:str,points : {increment : cost}}),
         })
         .then((res) => res.json())
         .then((data) => {
          if(data.success){
            setDoneTasks(str)
            setPendingTasks(String(array))
            gtTasks.forEach( (item, index) => {
              if(item.id === id) gtTasks.splice(index,1);
            });
             const lcl = cost.toLocaleString()
            new Toast({
              position: "top-center",
              toastMsg: `You're received ${lcl} WalkCoin`,
              autoCloseTime: 4500,
              canClose: true,
              showProgress: true,
              pauseOnHover: true,
              pauseOnFocusLoss: true,
              type: "default",
              theme: "light"
            });
            const getpoint = Number(UserDt?.gtpoint) + cost
            setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(getpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username)})

          }
         })
       } catch (err) {
        
       }
      }
    }

    useEffect(() => {
      
      if(gtTasks.length == 0){
        try {
          fetch('/api/get-tasks', {
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
            const findpending: number[] = data.pendingtasks
            data.all.forEach((t: any)=> {
              const found = findpending.find(item => item === t.id);
              const contain = found !== undefined
              const gticon = t.icon == "Telegram" ? Telegram : t.icon == 'Youtube' ? Youtube :  t.icon == 'Instagram' ? Instagram :  t.icon == 'Google Play Store' ? GooglePlay :  t.icon == 'Apple App Store' ? AppleStore : Etc
              
              let model = {
                id:t.id,
                icon:gticon,
                title :t.title,
                isDoing:contain,
                url:t.url,
                cost:t.cost
             }
             setPendingTasks(findpending.toString())
             const doneTasks: number[] = data.donetasks
             setDoneTasks(doneTasks.toString())
             gtTasks.push(model)
             setLoading(false)
            })
          
          }
         })
       } catch (err) {
        
       }
      }

      if(gtTasksCreated.length == 0){
        try {
          fetch('/api/get-createtask', {
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
            const findpending: number[] = data.pendingtasks
            data.all.forEach((t: any)=> {
              const found = findpending.find(item => item === t.id);
              const contain = found !== undefined
              const strkeyword = String(t.keyword)
              const iskeyword = strkeyword.length != 0
              const gticon = t.icon == "Telegram" ? Telegram : t.icon == 'Youtube' ? Youtube :  t.icon == 'Instagram' ? Instagram :  t.icon == 'Google Play Store' ? GooglePlay :  t.icon == 'Apple App Store' ? AppleStore : Etc
              let model = {
                id:t.id,
                icon:gticon,
                describe :t.describe,
                isDoing:contain,
                url:t.url,
                keyword:strkeyword,
                havekeyword:iskeyword,
                keyworddescribe:t.keyworddescribe,
                text:''
             }
             setPendingCreatedTasks(findpending.toString())
             const doneTasks: number[] = data.donetasks
             setDoneCreatedTasks(doneTasks.toString())
             gtTasksCreated.push(model)
             if(NoteKeyword == false && iskeyword){
              setNoteKeyword(true)
             }
            })
          
          }
         })
       } catch (err) {
        
       }
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

    useEffect(() => {
      let model = {
        id:"1",
     }
     gtVisit.push(model)
    },[])
  
    
    return (
        <div className=" flex justify-center overflow-auto">
         <div className="w-full h-screen bg-white flex-col ">
         <div className="flex-1 items-center">
      <center>
        <div className="w-20 h-20 py-[13px] glowNormal rounded-full mt-5 " >
            <center>
            <Image
        src={FootPrint as StaticImageData}
      className="w-2/3 h-2/3  aspect-square object-cover   "
      alt="Shiba Inu"
    />
            </center>           
        </div>
        
      </center>
              <div className="flex-1 mt-1 text-center font-bold ">
              <p className="mr-3 ml-3 text-[#ffae19]/[0.9] font-Large text-2xl glow">Earn More WalkCoin</p>
              <p className="mr-2 ml-2 text-[#ffae19]/[0.9] font-normal glow text-lg text-wrap">Receive rewards by completing any task</p>
              </div>
              </div>
              <div className="flex w-full  items-center justify-center items-center">
       <button onClick={() => setActiveTab('createtask')} className="flex border-[#ffae19]/[0.9] bg-[#6b4d11]/[0.8] border-4 mt-4 items-center  text-wrap  rounded-full px-3 py-[5px] ">
              <div className="flex-1 text-center">
              <div className="flex items-center justify-center">
              <p className=" text-white font-Large glow text-base truncate">Create your own task</p>
              </div>
              </div>
              <Image 
        src={Touch as StaticImageData} 
      className="w-8 h-8 aspect-square object-cover"
      alt="Shiba Inu"
    />
              </button>
              
              
              
       </div>
       <div className={`${NoteKeyword == false ? 'w-0 h-0' : 'mt-2'} flex items-center justify-center text-center`}>
              <p className={`${NoteKeyword == false ? 'text-[0px] w-0 h-0' : 'text-base mr-5 ml-5'} text-black font-normal`}>Note: You can find the keyword in the task with prefix KW-</p>
              </div>
              <div className="h-2" />
              <div className={`${Loading == true? 'w-full mt-3' : 'w-0 h-0'} flex grow justify-center items-center`}>
                <svg aria-hidden="true" className={`w-6 h-6 flex text-gray-200 animate-spin dark:text-[#6b4d11]/[0.8] fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
                </div>
                {gtVisit.map((task,index) => {
                  if(Loading == false && hideVisit == false){
                    return(
                      <center key={index}>
                              <div className="h-3"/>
                               <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                               <div className="grow flex items-center">
                               <Image
          src={Etc}
        className="w-11 h-11  aspect-square object-cover  "
        alt="Shiba Inu"
      />
                             
                <div className="px-2"/>
                <div className="grow space-y-1">
                <p className="text-white font-Large text-[17px] text-wrap text-left">Visit a website and earn</p>
                <div className="grow flex items-center space-x-1">
                              <Image
          src={FootPrint as StaticImageData}
        className="w-7 h-7 "
        alt=""
      />     
                <p className="text-white font-normal  text-base">+{Number(2000).toLocaleString()}</p> 
                              </div>
                </div>
                {/* <div className="px-1"/> */}
                <div className="flex items-center">
               
                {/* <div className=" px-1"/> */}
                <button onClick={() => {handleVisit(task.click)}} className={`${task.click? 'glowwhite bg-white' : 'bg-black' } flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
                <p className={`text-white font-Large ${task.click? 'text-[0px]' : ''}`}>Start</p>
                  <div className="flex">
                  <svg aria-hidden="true" className={`${task.click? 'w-6 h-6' : 'w-0 h-0'} flex text-gray-200 animate-spin dark:text-gray-600 fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  }
                  
                  }) }
                {gtTasksCreated.map((task,index) => {
                  if(task.havekeyword){

                    return(
                      <center key={index}>
                        <div className="h-3"/>
                         <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-3xl py-[5px] ">
                         <div className="grow flex items-center">
                         <Image
    src={task.icon}
  className="w-11 h-11  aspect-square object-cover  "
  alt="Shiba Inu"
/>
                       
          <div className="px-2"/>
          <div className="grow space-y-1 ">
           <div className="flex grow items-center">
             
            <div className="flex flex-col grow space-y-1 ">
            <p className="text-white font-Large text-[17px] text-wrap text-left ">{task.describe}</p>
           <div className="grow flex items-center space-x-1   ">
                        <Image
    src={FootPrint as StaticImageData}
  className="w-7 h-7 "
  alt=""
/>     
          <p className="text-white font-normal  text-base">+{Number(20000).toLocaleString()}</p> 
                        </div>
            </div>
              
            <button onClick={() => {window.open(task.url)}} className={`bg-black flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
          <p className={`text-white  font-Large`}>Start</p>

          </button> 

           </div>
          

          <div className="flex space-x-2 items-center">
            
          <div className="relative grow mt-1">
    <input type="text" id="floating_filled" value={task.text} onChange={(e) => {
      var newData = gtTasksCreated.map(el => {
        if(el.id == task.id)
           return Object.assign({}, el, {text:e.target.value})
        return el
    });
    
     setTaskCreated(newData)
    }} className="block rounded-xl px-2.5 pb-2 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] appearance-none dark:text-white  focus:outline-none focus:ring-0  peer" placeholder=" " />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter the keyword</label>
    </div>
         
    <button onClick={() => {handleClaimKeyword(task.id,gtdoneCreatedtasks,pendingCreatedtasks,20000,task.keyword,task.text)}} className={`glowwhite bg-white flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
          <p className={`text-black  font-Large ${task.click? 'text-[0px]' : ''}`}>Claim</p>
          </button> 
         
          </div>            
          <div className={`${task.keyworddescribe?.length == 0 ? 'w-0 h-0' : 'mt-1'} flex justify-start items-center`}>
          <Image 
        src={Info as StaticImageData} 
      className={`${task.keyworddescribe?.length == 0 ? 'w-0 h-0' : 'w-5 h-5'} aspect-square object-cover`}
      alt=""
    />
    <p className={`${task.keyworddescribe?.length == 0 ? 'text-[0px]' : 'text-sm'} font-normal  text-black text-wrap`}>{task.keyworddescribe}</p>    
    </div>        
          </div>
          
          <div className="flex bg-black">
         
          <div className=" px-1"/>          
          
          </div>
          

                         </div>    
                                               
                    
            
                        </div>
                      </center>
                      
                    )

                  }else{
                    return(
                      <center key={index}>
                        <div className="h-3"/>
                         <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                         <div className="grow flex items-center">
                         <Image
    src={task.icon}
  className="w-11 h-11  aspect-square object-cover  "
  alt="Shiba Inu"
/>
                       
          <div className="px-2"/>
          <div className="grow space-y-1">
          <p className="text-white font-Large text-[17px] text-wrap text-left">{task.describe} </p>
          <div className="grow flex items-center space-x-1">
                        <Image
    src={FootPrint as StaticImageData}
  className="w-7 h-7 "
  alt=""
/>     
          <p className="text-white font-normal  text-base">+{Number(20000).toLocaleString()}</p> 
                        </div>
          </div>
          {/* <div className="px-1"/> */}
          <div className="flex items-center">
         
          {/* <div className=" px-1"/> */}
          <button onClick={() => {handleClaimB(task.id,task.isDoing,gtdoneCreatedtasks,pendingCreatedtasks,20000),handlePendingB(task.id,pendingCreatedtasks,task.click,task.isDoing,task.url)}} className={`${task.isDoing || task.click? 'glowwhite bg-white' : 'bg-black' } flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
          <p className={`${task.isDoing? 'text-black' : 'text-white'}  font-Large ${task.click? 'text-[0px]' : ''}`}>{task.isDoing? 'Claim' : 'Start'}</p>
            <div className="flex">
            <svg aria-hidden="true" className={`${task.click? 'w-6 h-6' : 'w-0 h-0'} flex text-gray-200 animate-spin dark:text-gray-600 fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  }
                        
                    }) }

              
              {gtTasks.map((task,index) => {
                        return(
                          <center key={index}>
                            <div className="h-3"/>
                             <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                             <div className="grow flex items-center">
                             <Image
        src={task.icon}
      className="w-11 h-11  aspect-square object-cover  "
      alt="Shiba Inu"
    />
                           
              <div className="px-2"/>
              <div className="grow space-y-1">
              <p className="text-white font-Large text-[17px] text-wrap text-start">{task.title} </p>
              <div className="grow flex items-center space-x-1">
                            <Image
        src={FootPrint as StaticImageData}
      className="w-7 h-7 "
      alt=""
    />     
              <p className="text-white font-normal  text-base">+{Number(task.cost).toLocaleString()}</p> 
                            </div>
              </div>
              {/* <div className="px-1"/>  */}
              <div className="flex items-center">
             
              {/* <div className=" px-1"/> */}
              <button onClick={() => {handleClaim(task.id,task.isDoing,gtdonetasks,pendingtasks,task.cost),handlePending(task.id,pendingtasks,task.click,task.isDoing,task.url)}} className={`${task.isDoing || task.click? 'glowwhite bg-white' : 'bg-black' } flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
              <p className={`${task.isDoing? 'text-black' : 'text-white'}  font-Large ${task.click? 'text-[0px]' : ''}`}>{task.isDoing? 'Claim' : 'Start'}</p>
                <div className="flex">
                <svg aria-hidden="true" className={`${task.click? 'w-6 h-6' : 'w-0 h-0'} flex text-gray-200 animate-spin dark:text-gray-600 fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    
                    <div className={`${gtTasks.length == 0 && gtTasksCreated.length ==0 && Loading == false? 'mt-10' : 'w-0 h-0'} grow flex flex-col items-center justify-center text-center`}>
                            <Image
        src={NoTask as StaticImageData}
      className={`${gtTasks.length == 0 && gtTasksCreated.length ==0 && Loading == false? 'w-20 h-20' : ''} object-fill`}
      alt=""
    />     
              <p className={`${gtTasks.length == 0 && gtTasksCreated.length ==0 && Loading == false? 'text-base' : 'w-0 h-0 text-[0px]'} text-[#00000093] font-bold `}>No Task</p> 
                            </div>

                     <div className="h-20 mt-5" />

        </div>
        
          </div>
    
        
    )
}

export default TasksTab
