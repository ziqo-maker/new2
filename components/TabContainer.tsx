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
import Rating from './RatingTab'
import { NewUserContext } from '@/contexts/UserContextB';
import React,{useEffect,useState} from 'react';

import { WebApp } from '@twa-dev/types'

 declare global {
    interface Window {
      Telegram?: {
        WebApp: WebApp
      }
    }
  }

const TabContainer = () => {
    const { activeTab } = useTab()

      const { UserDt,setUserData,loadUserData } = React.useContext(NewUserContext);
     const [hours,setHours] = useState("");
      const [user, setUser] = useState<any>(null)
         const [error, setError] = useState<string | null>(null)
         const [gtid, setid] = useState<string | null>("")
       
       
    useEffect(() => {
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
                        setError(data.error)
                      } else {
                        setUserData({idd:String(data.idd),gtpoint:String(data.points),selectcharacter:String(data.selectcharacter),speedlvl:String(data.speedlvl),
                          upgrade:String(data.upgrade),username:String(data.username),value:String(data.tokenvalue)
                        })
                        setHours(String(data.idd))
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
                              
                            } else {
                              
                            }
                          })
                        } catch (err) {
                        }
                        }
                      
                        
                      }
                    })
                    .catch((err) => {
                      setError('Failed to fetch user data')
                    })
                } else {
                  setError('No user data available')
                }
              } else {
                setError('This app should be opened in Telegram')
              } 
    },[])
    return (
        <div className="flex-1 overflow-hidden max-w-xl mx-auto">
            <div className={`${activeTab === 'home' ? 'is-show' : 'is-hide'}`}>
                <HomeTab parameter={hours} />
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
                <Rating />
            </div>
        </div>
    )
}

export default TabContainer



