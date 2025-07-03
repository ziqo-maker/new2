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
import { useCallback, ReactElement } from 'react'
import { useAdsgram } from "./useAdsgram";
import { ShowPromiseResult } from "@/types/adsgram";
import colony from '@/imgs/colony.png';
import boori from '@/imgs/boori.png';
import ProgressBar from "@ramonak/react-progress-bar";
import Dollar from '@/icons/DollarWhite.svg';
import { useAdsgramB } from "./useAdsgramB";
import { useAdsgramC } from "./useAdsgramC";
import playy from '@/imgs/play.png';
import chnl from '@/imgs/chnl.png';
import bees from '@/imgs/bees.png';
import handbugs from '@/imgs/handbugs.png';
import TicketCircle from '@/icons/whiteticket.svg';
import pathlogo from '@/imgs/pathlogo.png';
import br from '@/imgs/br.png';
import sticker from '@/imgs/sticker.png';
import snow from '@/imgs/snow.png';
import whitedogs from '@/imgs/whitedogs.png';
import layer from '@/imgs/layer.png';
import net from '@/imgs/net.png';
import hub from '@/imgs/hub.png';
import adswatchicon from '@/icons/adswatchicon.svg';
import memes from '@/imgs/memes.png';
import evobots from '@/imgs/evobots.png';
import robus from '@/imgs/robus.png';
import addup from '@/imgs/addup.png';
import kombat from '@/imgs/kombat.png';
import usdt from '@/imgs/usdt.png';
import outmine from '@/imgs/kombat.png';
import bawan from '@/imgs/bawan.png';
import dino from '@/imgs/dino.png';
import trump from '@/imgs/trump.png';
import portal from '@/imgs/portal.png';


type Task = {
    id:string
    icon: StaticImageData;
    title:string;
    isDoing?:boolean;
    donetasks?: number[],
    click?:false,
    url:string,
    cost:number,
    clickb:boolean,
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
  text:string,
 clickb:boolean
}

type Visit = {
  id:string
  click?:false,
}

const TasksTab = () => {
      const [gtVisit,setVisit] = useState<Visit[]>([]);
     const [gtVisitB,setVisitB] = useState<Visit[]>([]);
     const [gtVisitC,setVisitC] = useState<Visit[]>([]);

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
      const [ad, setAd] = useState<boolean>(false);
       const [adB, setAdB] = useState<boolean>(false);
      const [adC, setAdC] = useState<boolean>(false);
      const [adRefresh, setAdRefresh] = useState<boolean>(false);
      const [countAd,setCountAd] = useState<number> (0);
      const [wait,setWait] = useState<boolean> (false);

      const [hideVisitB, setHideVisitB] = useState<boolean>(false);
      const [countAdB,setCountAdB] = useState<number> (0);

      const [hideVisitC, setHideVisitC] = useState<boolean>(false);
      const [countAdC,setCountAdC] = useState<number> (0);

       const [chsAd,setChsAd] = useState<number> (0);

    const timerRefB = useRef<NodeJS.Timeout | null>(null);
const [watchAd,setWatchad] = useState<number> (0);
       const [hours,setHours] = useState("00");
          const [minutes,setMinutes] = useState("00");
        const [seconds,setSeconds] = useState("00");
        const [days,setDays] = useState("00");
   const [refreshAds,setRefreshAds] = useState<boolean> (true);

         const [end,setEnd] = useState<boolean> (false);
        const [start,setStart] = useState<boolean> (false);
      
    const handlePendingB = async(id:string,pendingcreatedtasks:string | undefined,click:boolean | undefined,isDoing:boolean | undefined,url:string) => {
      const rndNmb = Math.floor(Math.random() * 2) + 1
      if(!click && !isDoing){
        window.open(url);
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
               
            }
           })
         } catch (err) {
          
         }
        
        
      }
     
    }

    
    const handlePending = async(id:string,pendingtasks:string | undefined,click:boolean | undefined,isDoing:boolean | undefined,url:string) => {
     const rndNmb = Math.floor(Math.random() * 2) + 1
      if(!click && !isDoing){
          window.open(url);
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
           body: JSON.stringify({ idd: String(UserDt?.idd),pendingtasks:str}),
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

    const handleClaimB = async(id:string,isDoing:boolean | undefined,donecreatedtasks:string | undefined,pendingCreatedtasks:string | undefined,cost:number) => {
      if(isDoing){
       setWait(true)
       var newData = gtTasksCreated.map(el => {
            if(el.id == id)
               return Object.assign({}, el, {clickb:true})
            return el
        });
         setTaskCreated(newData)
       
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
            setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(getpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})

          }
         })
       } catch (err) {
        new Toast({
          position: "top-center",
          toastMsg: `An error occurred. Please try again later`,
          autoCloseTime: 4500,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "default",
          theme: "light"
        });
        var newData = gtTasksCreated.map(el => {
          if(el.id == id)
             return Object.assign({}, el, {clickb:false})
          return el
      });
       setTaskCreated(newData)
       }
       setTimeout(() => {
        setWait(false)
       }, 4500);
      }
    }

    const handleClaimKeyword = async(id:string,donecreatedtasks:string | undefined,pendingCreatedtasks:string | undefined,cost:number,keyword:string,text:string) => {
        
        if(text == keyword){
         setWait(true)
        var newData = gtTasksCreated.map(el => {
            if(el.id == id)
               return Object.assign({}, el, {clickb:true})
            return el
        });
         setTaskCreated(newData)
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
            setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(getpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})

          }
         })
       } catch (err) {
        new Toast({
          position: "top-center",
          toastMsg: `An error occurred. Please try again later`,
          autoCloseTime: 4500,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "default",
          theme: "light"
        });
        var newData = gtTasksCreated.map(el => {
          if(el.id == id)
             return Object.assign({}, el, {clickb:false})
          return el
      });
       setTaskCreated(newData)
       }
        setTimeout(() => {
        setWait(false)
       }, 4500);
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

    const handleClaim = async(id:string,isDoing:boolean | undefined,doneTasks:string | undefined,pendingtasks:string | undefined,cost:number,clickb:boolean | undefined) => {
      if(isDoing && clickb == false){
       setWait(true)
        var newData = gtTasks.map(el => {
          if(el.id == id)
             return Object.assign({}, el, {clickb:true})
          return el
      });
       setTask(newData)
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
            setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(getpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})

          }
         })
       } catch (err) {
        new Toast({
          position: "top-center",
          toastMsg: `An error occurred. Please try again later`,
          autoCloseTime: 4500,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "default",
          theme: "light"
        });
        var newData = gtTasks.map(el => {
          if(el.id == id)
             return Object.assign({}, el, {clickb:false})
          return el
      });
       setTask(newData)
       }
       setTimeout(() => {
        setWait(false)
       }, 4500);
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
              if (timerRef.current) {
        clearInterval(timerRef.current);
      };
            setLoading(false)
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
                cost:t.cost,
                clickb:false
             }
             setPendingTasks(findpending.toString())
             const doneTasks: number[] = data.donetasks
             setDoneTasks(doneTasks.toString())
             gtTasks.push(model)
             
            })

             try {
              fetch('/api/get-adsdate', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({ idd: String(UserDt?.idd) }),
             })
             .then((res) => res.json())
             .then((data) => {
               if (data.success) {
              
              
                const target = new Date(data.dtMining);
                const now = new Date(data.dt);
                const difference = target.getTime() - now.getTime();
                 setWatchad(Number(data.cnt))
                  setStart(true)
                 if (timerRefB.current) {
            clearInterval(timerRefB.current);
          }
                if(difference < 0){
                    
                  try {
                    fetch('/api/update-dateads', {
                     method: 'POST',
                     headers: {
                       'Content-Type':'application/json',
                     },
                     body: JSON.stringify({idd:String(UserDt?.idd)}),
                   })
                   .then((res) => res.json())
                   .then((data) => {
                     if (data.success) {
                      setMinutes("00")
                      setSeconds("00")
                      setHours("00")
                      const target = new Date(data.dtMining);
                const now = new Date(data.dt);
                 setWatchad(Number(data.cnt))
                 setStart(true)
                 var q = 0    
                 timerRefB.current = setInterval(() =>{
                   q += 1000
                   const difference = target.getTime() - now.getTime() - q;
   
                   if(difference > 1000 ){
   
                      
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
                    
                   }else{
                     setMinutes("00")
                     setSeconds("00")
                     setHours("00")
                   }
          
   
                 },1000);

                     } else {
                     }
                   })
                 } catch (err) {
                 }
    
                }else {
                 
                  var q = 0    
                  timerRefB.current = setInterval(() =>{
                    q += 1000
                    const difference = target.getTime() - now.getTime() - q;
    
                    if(difference > 1000 ){
    
                       
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
                     
                    }else if(end == false){
                           setStart(false)
                       if (timerRefB.current) {
            clearInterval(timerRefB.current);
          }       
                      try {
                        fetch('/api/update-dateads', {
                         method: 'POST',
                         headers: {
                           'Content-Type':'application/json',
                         },
                         body: JSON.stringify({idd:String(UserDt?.idd)}),
                       })
                       .then((res) => res.json())
                       .then((data) => {
                         if (data.success) {
                                
                            setEnd(true)
                                setStart(true)
                          setMinutes("00")
                          setSeconds("00")
                          setHours("00")
                          const target = new Date(data.dtMining);
                    const now = new Date(data.dt);
                     setWatchad(Number(data.cnt))
    
                     var q = 0    
                     timerRefB.current = setInterval(() =>{
                       q += 1000
                       const difference = target.getTime() - now.getTime() - q;
       
                       if(difference > 1000 ){
       
                          
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
                        
                       }else{
                         setMinutes("00")
                         setSeconds("00")
                         setHours("00")
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
              if (timerRef.current) {
        clearInterval(timerRef.current);
      };
            const findpending: number[] = data.pendingtasks
            data.all.forEach((t: any)=> {
              const found = findpending.find(item => item === t.id);
              const contain = found !== undefined
              const strkeyword = String(t.keyword)
              const iskeyword = strkeyword.length != 0
              const gticon = t.platform == "Telegram" ? Telegram : t.platform == 'Youtube' ? Youtube :  t.platform == 'Instagram' ? Instagram :  t.platform == 'Google Play Store' ? GooglePlay :  t.platform == 'Apple App Store' ? AppleStore : Etc
              let model = {
                id:t.id,
                icon:gticon,
                describe :t.describe,
                isDoing:contain,
                url:t.url,
                keyword:strkeyword,
                havekeyword:iskeyword,
                keyworddescribe:t.keyworddescribe,
                text:'',
               clickb:false
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
   if (timerRefB.current) {
      clearInterval(timerRefB.current);
    }
    };

    },[refreshB,refreshAds])

    useEffect(() => {
      let model = {
        id:"1",
     }
     gtVisit.push(model)
     let modelB = {
      id:"1",
   }
   gtVisitB.push(modelB)
   let modelC = {
    id:"1",
 }
 gtVisitC.push(modelC)
    },[])


       useEffect(() => {
          if(ad == true){
                
          try {
            fetch('/api/update-countads', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String(UserDt?.idd) }),
           })
           .then((res) => res.json())
           .then((data) => {
             if (data.success) {
               
             setAdRefresh(false)
            }
            
           })
         } catch (err) {
         } 
       }
    },[ad])
     
      
  useEffect(() => {
      if(ad == true){
        const handleAd = async () => {
           setWatchad(watchAd+1)
          if(chsAd == 1){

            const pls = countAd+1
                  setCountAd(pls);
          const plus = Number(UserDt?.gtpoint) + Number(3000)
          setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(plus),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})
        
       if(pls == 3){
            var newData = gtVisit.map(el => {
              if(el.id == "1")
                 return Object.assign({}, el, {click:true})
              return el
          });
          setVisit(newData)
          }
            
      try {
        fetch('/api/claim', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String(UserDt?.idd),miningPoint: 3000 }),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
            
        }
          setAd(false)
       if(pls == 3){
          setHideVisit(true)
        }
        
       })
     } catch (err) {
         setAd(false)
     }
         

          }else if(chsAd ==2){

            const pls = countAdB+1
                  setCountAdB(pls);
       if(pls == 5){
        const plus = Number(UserDt?.gtpoint) + Number(25000)
        const ticketupdate = Number(UserDt?.ticket) + Number(2)

        setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(plus),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),firstname:String(UserDt?.firstname),ticket:String(ticketupdate)})
          const lcl = 25000
       new Toast({
        position: "top-center",
        toastMsg: `You're received ${Number(lcl).toLocaleString()} WalkCoin And 2 Tickets`,
        autoCloseTime: 4500,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "default",
        theme: "light"
      });
            var newData = gtVisitB.map(el => {
              if(el.id == "1")
                 return Object.assign({}, el, {click:true})
              return el
          });
          setVisitB(newData)

          try {
            fetch('/api/claim', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String(UserDt?.idd),miningPoint: 25000 }),
           })
           .then((res) => res.json())
           .then((data) => {
             if (data.success) {

               try {
            fetch('/api/update-ticket', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String(UserDt?.idd),ticket: String(ticketupdate) }),
           })
           .then((res) => res.json())
           .then((data) => {
             if (data.success) {
              setHideVisitB(true)
            setAd(false)
            }
           })
         } catch (err) {
               
         }
              
            }
            
           })
         } catch (err) {
             setAd(false)
         }

          }else{
            setAd(false)
          }

          }else if(chsAd == 3){

            const pls = countAdC+1
                  setCountAdC(pls);
       if(pls == 10){
        const plus = Number(UserDt?.gtpoint) + Number(45000)
        const ticketupdate = Number(UserDt?.ticket) + Number(5)
          const lcl = 45000
      new Toast({
        position: "top-center",
        toastMsg: `You're received ${Number(lcl).toLocaleString()} WalkCoin And 5 Tickets `,
        autoCloseTime: 4500,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "default",
        theme: "light"
      });
          setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(plus),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),firstname:String(UserDt?.firstname),ticket:String(ticketupdate)})
        
            var newData = gtVisitC.map(el => {
              if(el.id == "1")
                 return Object.assign({}, el, {click:true})
              return el
          });
          setVisitC(newData)

          try {
            fetch('/api/claim', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String(UserDt?.idd),miningPoint: 45000 }),
           })
           .then((res) => res.json())
           .then((data) => {
             if (data.success) {
              try {
            fetch('/api/update-ticket', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String(UserDt?.idd),ticket: String(ticketupdate) }),
           })
           .then((res) => res.json())
           .then((data) => {
             if (data.success) {
               setAd(false)
            setHideVisitC(true)
            }
           
           })
               
         } catch (err) {
         }
            }
             
           })
         } catch (err) {
         }

          }else{
            setAd(false)
          }

          }
     
        }

        handleAd();
      }
    },[ad])


    const onError = useCallback((result: ShowPromiseResult) => {
      if(start == true){
                new Toast({
        position: "top-center",
        toastMsg: "You can't watch the video right now.",
        autoCloseTime: 4500,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "default",
        theme: "light"
      });
       }
    }, []);
  
    /**
     * insert your-block-id
     */
   const onReward = useCallback(() => {
      setChsAd(1)
        const lcl = 3000
  new Toast({
    position: "top-center",
    toastMsg: `You're received ${Number(lcl).toLocaleString()} WalkCoin`,
    autoCloseTime: 4500,
    canClose: true,
    showProgress: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    type: "default",
    theme: "light"
  });

setAd(true)
setAdRefresh(true)
    }, []);

    const onRewardB = useCallback(() => {
      setChsAd(2)
    setAd(true)
   setAdRefresh(true)
    }, []);

    const onRewardC = useCallback(() => {
      setChsAd(3)
    setAd(true)
   setAdRefresh(true)
    }, []);
  
  const showAd = useAdsgram({ blockId: "int-8537", onReward, onError });
    const showAdB = useAdsgramB({ blockId: "int-9613", onRewardB, onError });
    const showAdC = useAdsgramC({ blockId: "int-8537", onRewardC, onError });

   const errorwatch = async() => {
      new Toast({
        position: "top-center",
        toastMsg: "You can't watch the video right now.",
        autoCloseTime: 4500,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "default",
        theme: "light"
      });
    }
    
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
              <p className="mr-2 ml-2 text-[#ffae19]/[0.9] font-normal glow text-base text-wrap">Receive rewards by completing any task</p>
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


            <div className="flex flex-col w-full   items-center text-center justify-center items-center">
               <div className="flex w-[calc(100%-3rem)] mt-4  bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-1 py-[3px] ">
               <div className="w-1"/>
                <Image 
                src={adswatchicon as StaticImageData} 
              className="w-11 h-11 aspect-square object-cover"
              alt=""
            />
                      <div className="flex-grow text-center ">
                      <div className="flex flex-col items-center justify-center">
                      
        <p className="text-white font-black mr-6 text-base">Number of videos played</p>

                      <p className=" text-white glow font-Large  text-sm mr-6 truncate">{watchAd > 54 ? '54' : watchAd} / 54 </p>
                      <p className="text-white font-Normal text-sm mr-6 glow">{hours}h {minutes}m {seconds}s</p>

                      </div>
                      </div>
                      </div>
                      <div className="flex-grow text-center ">
                      <p className={`text-base  mr-6 ml-6 text-black font-normal`}>You can only watch 54 videos every 24 hours</p>

                      </div>
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
                              
                               <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                               <div className="grow flex items-center">
                               <Image
          src={playy as StaticImageData }
        className="w-11 h-11  aspect-square object-cover  "
        alt="Shiba Inu"
      />
                             
                <div className="px-2"/>
                <div className="grow space-y-1">
                <p className="text-white font-Large text-[17px] text-wrap text-start">Watch video and earn</p>
                <div className="grow flex items-center space-x-1">
                              <Image
          src={FootPrint as StaticImageData}
        className="w-7 h-7 "
        alt=""
      />     
                <p className="text-white font-normal  text-base">+{Number(3000).toLocaleString()}</p> 
                              </div>
                </div>
                {/* <div className="px-1"/> */}
                <div className="flex items-center">
               
                {/* <div className=" px-1"/> */}
                <button onClick={() => {task.click ? '' : watchAd < 54 && start == true ? showAd() : errorwatch() } } className={`${task.click? 'glowwhite bg-white' : 'bg-black' } flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
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
                              <div className="flex w-[calc(100%-2rem)] justify-end">

                        <p className={`font-normal text-base glow text-white bg-[#ffae19]/[0.9] rounded-full py-[5px] px-2 mr-2 mt-1`}>{countAd}/3</p>

                        </div>
                            </center>
                    )
                  }
                  
                  }) }
                  {gtVisitB.map((task,index) => {
                  if(Loading == false && hideVisitB == false){
                    return(
                          <div className="w-full flex flex-col justify-center items-center" key={index}>
                              <div className="h-1"/>
                               <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                               <div className="grow flex items-center">
                               <Image
          src={playy as StaticImageData }
        className="w-11 h-11  aspect-square object-cover  "
        alt="Shiba Inu"
      />
                             
                <div className="px-2"/>
                <div className="grow space-y-1">
                <p className="text-white font-Large text-[17px] text-wrap text-start">Watch video and earn</p>
                <div className="grow flex items-center space-x-1">
                              <Image
          src={FootPrint as StaticImageData}
        className="w-7 h-7 "
        alt=""
      />     
                <p className="text-white font-normal  text-base">+{Number(25000).toLocaleString()}</p> 
                              </div>

                   <div className="grow flex items-center space-x-1">
                              <Image
          src={TicketCircle as StaticImageData}
        className="w-7 h-7 "
        alt=""
      />     
                <p className="text-white font-normal  text-base">+{2}</p> 
                              </div> 
                                     
                </div>
                {/* <div className="px-1"/> */}
                <div className="flex items-center">
               
                {/* <div className=" px-1"/> */}
                <button onClick={() => {task.click ? '' : watchAd < 54 && start == true ? showAdB() : errorwatch() }} className={`${task.click? 'glowwhite bg-white' : 'bg-black' } flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
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
                              <div className="flex w-[calc(100%-2rem)] justify-center items-center space-x-2 mt-1">
                              <div className="w-1"/>
                              <ProgressBar
  completed={countAdB}
  maxCompleted={5}
  className="grow  rounded-full "
  customLabel=" "
    barContainerClassName=" bg-[#6b4d11d1]/[0.2] rounded-full"
  completedClassName=""
    bgColor="#ffae19"
/>
                        <p className={`font-normal text-base glow text-white bg-[#ffae19]/[0.9] rounded-full py-[5px] px-2 `}>{countAdB}/5</p>
                         <div className="w-1"/>
                        </div>
                            </div>
                    )
                  }
                  
                  }) }
                
                  {gtVisitC.map((task,index) => {
                  if(Loading == false && hideVisitC == false){
                    return(
                     <div className="w-full flex flex-col justify-center items-center" key={index}>
                              <div className="h-1"/>
                               <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                               <div className="grow flex items-center">
                               <Image
          src={playy as StaticImageData }
        className="w-11 h-11  aspect-square object-cover  "
        alt="Shiba Inu"
      />
                             
                <div className="px-2"/>
                <div className="grow space-y-1">
                <p className="text-white font-Large text-[17px] text-wrap text-start">Watch video and earn</p>
                <div className="grow flex items-center space-x-1">
                              <Image
          src={FootPrint as StaticImageData}
        className="w-7 h-7 "
        alt=""
      />     
                <p className="text-white font-normal  text-base">+{Number(45000).toLocaleString()}</p> 
                              </div>
                                <div className="grow flex items-center space-x-1">
                              <Image
          src={TicketCircle as StaticImageData}
        className="w-7 h-7 "
        alt=""
      />     
                <p className="text-white font-normal  text-base">+{5}</p> 
                              </div>         
                </div>
                {/* <div className="px-1"/> */}
                <div className="flex items-center">
               
                {/* <div className=" px-1"/> */}
                <button onClick={() => {task.click ? '' : watchAd < 54 && start == true? showAdC() : errorwatch() }} className={`${task.click? 'glowwhite bg-white' : 'bg-black' } flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
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
                              <div className="flex w-[calc(100%-2rem)] justify-center items-center space-x-2 mt-1">
                              <div className="w-1"/>
                              <ProgressBar
  completed={countAdC}
  maxCompleted={10}
  className="grow  rounded-full "
  customLabel=" "
    barContainerClassName=" bg-[#6b4d11d1]/[0.2] rounded-full"
  completedClassName=""
    bgColor="#ffae19"
/>
                        <p className={`font-normal text-base glow text-white bg-[#ffae19]/[0.9] rounded-full py-[5px] px-2 `}>{countAdC}/10</p>
                         <div className="w-1"/>
                        </div>
                            </div>
                    )
                  }
                  
                  }) }
             
                {gtTasksCreated.map((task,index) => {
         if(task.clickb == false){

          if(task.havekeyword){

                    return(
                      <center key={index}>
                        <div className="h-3"/>
                         <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-3xl py-[5px] ">
                         <div className="grow flex items-center">
                         <Image
    src={task.id == "2" ? chnl as StaticImageData : task.icon}
  className={`w-11 h-11  aspect-square object-cover `}
  alt="Shiba Inu"
/>
                       
          <div className="px-2"/>
          <div className="grow space-y-1 ">
           <div className="flex grow items-center">
             
            <div className="flex flex-col grow space-y-1 ">
            <p className="text-white font-Large text-lg text-wrap text-left ">{task.describe}</p>
           <div className="grow flex items-center space-x-1   ">
                        <Image
    src={FootPrint as StaticImageData}
  className="w-7 h-7 "
  alt=""
/>     
          <p className="text-white font-normal  text-base">+{Number(45000).toLocaleString()}</p> 
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
         
    <button onClick={() => {wait == true ? '': handleClaimKeyword(task.id,gtdoneCreatedtasks,pendingCreatedtasks,45000,task.keyword,task.text)}} className={`${wait == true ? 'opacity-25' : ''} glowwhite bg-white flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
          <p className={`text-black  font-Large ${task.click? 'text-[0px]' : ''}`}>Claim</p>
          </button> 
         
          </div>            
          <div className={`${task.keyworddescribe?.length == 0 ? 'w-0 h-0' : 'mt-1'} flex justify-start text-start  items-start`}>
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
    src={task.id == "49" ? bees as StaticImageData : task.id == "31" ?  kombat as StaticImageData : task.id == "11" ? addup as StaticImageData : task.id == "41" ? dino as StaticImageData : task.id == "43" ? trump as StaticImageData : task.id == "25" ? robus as StaticImageData : task.id == "26" ? outmine as StaticImageData : task.id == "18" ? whitedogs as StaticImageData : task.id == "20" ? net as StaticImageData : task.icon}
  className="w-11 h-11  aspect-square object-cover  "
  alt="Shiba Inu"
/>
                       
          <div className="px-2"/>
          <div className="grow space-y-1">
          <p className="text-white font-Large text-lg text-wrap text-left">{task.describe} </p>
          <div className="grow flex items-center space-x-1">
                        <Image
    src={FootPrint as StaticImageData}
  className="w-7 h-7 "
  alt=""
/>     
          <p className="text-white font-normal  text-base">+{Number(35000).toLocaleString()}</p> 
                        </div>
          </div>
          <div className="px-1"/>
          <div className="flex items-center">
         
          <div className=" px-1"/>
          <button onClick={() => {wait == true? '':handleClaimB(task.id,task.isDoing,gtdoneCreatedtasks,pendingCreatedtasks,35000),handlePendingB(task.id,pendingCreatedtasks,task.click,task.isDoing,task.url)}} className={`${task.isDoing || task.click? 'glowwhite bg-white' : 'bg-black' } ${wait == true ? 'opacity-25' : ''} flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
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
         
         }
                        
                    }) }

              
              {gtTasks.map((task,index) => {
         if(task.clickb == false){
           return(
                          <center key={index}>
                            <div className="h-3"/>
                             <div className="w-[calc(100%-2rem)] flex-1 mt-1 px-3  items-center bg-[#ffae19]/[0.9] border-white border-4 border-double rounded-full py-[5px] ">
                             <div className="grow flex items-center">
                             <Image
        src={task.id == "5" ? portal as StaticImageData : task.icon}
      className="w-11 h-11  aspect-square object-cover  "
      alt="Shiba Inu"
    />
                           
              <div className="px-2"/>
              <div className="grow space-y-1">
              <p className="text-white font-Large text-lg text-wrap text-left">{task.title} </p>
              <div className="grow flex items-center space-x-1">
                            <Image
        src={FootPrint as StaticImageData}
      className="w-7 h-7 "
      alt=""
    />     
              <p className="text-white font-normal  text-base">+{Number(task.cost).toLocaleString()}</p> 
                            </div>
              </div>
              <div className="px-1"/>
              <div className="flex items-center">
             
              <div className=" px-1"/>
              <button onClick={() => {wait == true ? '':handleClaim(task.id,task.isDoing,gtdonetasks,pendingtasks,task.cost,task.clickb),handlePending(task.id,pendingtasks,task.click,task.isDoing,task.url)}} className={`${task.isDoing || task.click? 'glowwhite bg-white' : 'bg-black' } ${wait == true ? 'opacity-25' : ''} flex w-16 h-8 text-center items-center justify-center rounded-full px-3 py-[3px]`}>
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
                    
                    

                     <div className="h-20 mt-5" />

        </div>
        
          </div>
    
        
    )
}

export default TasksTab
