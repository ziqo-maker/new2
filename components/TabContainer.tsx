'use client'

import { useTab } from '@/contexts/TabContext'
import HomeTab from './HomeTab'
import TasksTab from './TasksTab'
import InviteTab from './InviteTab'
import WalletTab from './WalletTab'
import { useEffect,useState } from "react"
import SpeedTab from './SpeedTab'

const TabContainer = () => {
    const { activeTab } = useTab()

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
        </div>
    )
}

export default TabContainer



