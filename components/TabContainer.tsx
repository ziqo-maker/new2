'use client'

import { useTab } from '@/contexts/TabContext'
import HomeTab from './HomeTab'
import TasksTab from './TasksTab'
import InviteTab from './InviteTab'
import WalletTab from './WalletTab'
import SpeedTab from './SpeedTab'
import CharactersTab from './CharactersTab'
import CreateTask from './CreateTask'
import Withdraw from './requestwithdraw'
import Toast from 'typescript-toastify';
import { NewUserContext } from '@/contexts/UserContextB';
import React,{useEffect,useState,useRef} from 'react';
import RaffleTab from './RaffleTab'

import { WebApp } from '@twa-dev/types'
import RatingTab from './RatingTab'

 declare global {
    interface Window {
      Telegram?: {
        WebApp: WebApp
      }
    }
  }

const TabContainer = () => {
    const { activeTab } = useTab()
     const { setUserData,UserDt } = React.useContext(NewUserContext);
 const [refresh, setRefresh] = useState<boolean>(false);
 const [chck, setChck] = useState<boolean>(false);
 var chckB = 0
      const timerRef = useRef<NodeJS.Timeout | null>(null);
       const [refreshB, setRefreshB] = useState<boolean>(false);
     useEffect(() => {
      var chckC = 0
           const initWebApp = async () => {

           
           if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
             const tg = window.Telegram.WebApp
             tg.ready()
     
             const initDataUnsafe = tg.initDataUnsafe || {}
             const prm = tg.initDataUnsafe.start_param|| ''
            
             if (initDataUnsafe.user) {
               fetch('/api/user', {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(initDataUnsafe.user),
               })
                 .then((res) => res.json())
                 .then((data) => {
                   if (data.error) {
                    
                   } else {
                    setRefresh(true)
        if (timerRef.current) {
          clearInterval(timerRef.current);
        };
                    const gtticket = Number(data.ticket)
       
     setUserData({idd:String(data.idd),gtpoint:String(data.gtpoint),selectcharacter:String(data.selectcharacter),speedlvl:String(data.speedlvl),
                       upgrade:String(data.upgrade),username:String(data.username),value:String(data.value),firstname:String(data.firstname),ticket:String(gtticket)
                     })       
                     
                     
                     if(chck == false && chckB ==0 && chckC ==0){
                      chckC++
                      chckB++
                      setChck(true)
                      if(prm.length > 0){
                        try {
                          fetch('/api/invitereferal', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ idd:String(prm),idb: String(data.idd),referal:String(prm) }),
                        })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.success) {
                            const gt = String(data.first)
                            if(gt == "1"){
                             
                             new Toast({
                               position: "top-center",
                                                         toastMsg: `Hello, welcome to WalkCoin! The next time you open the app, you will receive your ${Number(50000).toLocaleString()} WalkCoin tokens.`,
                                                         autoCloseTime: 15500,
                                                         canClose: true,
                                                         showProgress: true,
                                                         pauseOnHover: true,
                                                         pauseOnFocusLoss: true,
                                                         type: "default",
                                                         theme: "light"
                                                       });
                            }
                          } else {
                            
                          }
                        })
                      } catch (err) {
                      }
                      }
                     }
                     

                     try {
                      fetch('/api/updatedt', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ idd: String(data.idd) }),
                    })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.success) {
                        
                      } else {
                        
                      }
                    })
                  } catch (err) {
                  }

           //          try {
           //            fetch('/api/get-ticketbalance', {
           //            method: 'POST',
           //            headers: {
           //              'Content-Type': 'application/json',
           //            },
           //            body: JSON.stringify({ idd: String(data.idd) }),
           //          })
           //          .then((res) => res.json())
           //          .then((data) => {
           //            if (data.success) {
           //              const gtticket = Number(data.ticket)
                        
           // setUserData({idd:String(gtidd),speedlvl:String(gtspeedlvl),gtpoint:String(gtpnt),selectcharacter:String(selectchrctr),upgrade:String(gtupgrade),value:String(gtvalue),username:String(gtusername),ticket:String(gtticket),firstname:String(gtfirstname)})
           //            } else {
                        
           //            }
           //          })
           //        } catch (err) {
           //        }

                   }
                 })
                 .catch((err) => {
                   
                 })
             }
           } 
          };
     
           initWebApp();

           if(refresh == false) {
            timerRef.current = setInterval(() =>{
             
            setRefreshB(!refreshB)
            },3000);
           }
    
          return () => {  if (timerRef.current) {
            clearInterval(timerRef.current);
          };
        };
           
         }, [])
       
   
    return (
        <div className="flex-1 overflow-hidden max-w-xl mx-auto">
            <div className={`${activeTab === 'home' ? 'is-show' : 'is-hide'}`}>
                <HomeTab />
            </div>
            <div className={`${activeTab === 'tasks' ? 'is-show' : 'is-hide'}`}>
                <TasksTab />
            </div>
            <div className={`${activeTab === 'invite' ? 'is-show' : 'is-hide'}`}>
                <InviteTab />
            </div>
            <div className={`${activeTab === 'wallet' ? 'is-show' : 'is-hide'}`}>
                <WalletTab />
            </div>
            <div className={`${activeTab === 'speed' ? 'is-show' : 'is-hide'}`}>
                <SpeedTab />
            </div>
            <div className={`${activeTab === 'character' ? 'is-show' : 'is-hide'}`}>
                <CharactersTab />
            </div>
            <div className={`${activeTab === 'createtask' ? 'is-show' : 'is-hide'}`}>
                <CreateTask />
            </div>
            <div className={`${activeTab === 'withdraw' ? 'is-show' : 'is-hide'}`}>
                <Withdraw />
            </div>
            <div className={`${activeTab === 'rank' ? 'is-show' : 'is-hide'}`}>
                <RatingTab />
            </div>
         <div className={`${activeTab === 'raffle' ? 'is-show' : 'is-hide'}`}>
                <RaffleTab />
            </div>
           
        </div>
    )
}

export default TabContainer



