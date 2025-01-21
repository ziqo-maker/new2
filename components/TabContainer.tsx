'use client'

import { useTab } from '@/contexts/TabContext'
import HomeTab from './HomeTab'
import TasksTab from './TasksTab'
import InviteTab from './InviteTab'
import WalletTab from './WalletTab'
import { useEffect,useState } from "react"

const TabContainer = () => {
    const { activeTab } = useTab()
    const [points,setPoint] = useState(0);

    try {
        fetch('/api/getpoint', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String("6124587322") }),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
          setPoint(data.gtpoint)
         } else {
          
         }
       })
     } catch (err) {
     }

      useEffect(() => {

      },[activeTab === 'home'])

    return (
        <div className="flex-1 overflow-hidden max-w-xl mx-auto  pb-[50px]">
            <div className={`${activeTab === 'home' ? 'is-show' : 'is-hide'}`}>
                <HomeTab  point={points} />
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
        </div>
    )
}

export default TabContainer



