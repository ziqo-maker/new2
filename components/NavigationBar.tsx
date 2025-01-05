'use client'

import { useTab } from '@/contexts/TabContext'
import Earn from '@/icons/Earn'
import Home from '@/icons/Home'
import { TabType } from '@/utils/types'

const NavigationBar = () => {
    const { activeTab, setActiveTab } = useTab()

    const tabs: { id: TabType; label: string; Icon: React.FC<{ className?: string }> }[] = [
        { id: 'home', label: 'Home', Icon: Home },
        { id: 'earn', label: 'Earn', Icon: Earn },
    ]

    return (
        <div className="flex justify-center w-full">
            <div className="fixed bottom-0 bg-black border-t border-gray-800 w-full max-w-md">
                <div className="flex justify-between px-4 py-2">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center`}
                            >
                                <tab.Icon
                                    className={`w-10 h-10 ${isActive ? 'text-[#4c9ce2]' : 'text-[#727272]'
                                        }`}
                                />
                                <span
                                    className={`text-xs font-medium ${isActive ? 'text-[#4c9ce2]' : 'text-[#727272]'
                                        }`}
                                >
                                    {tab.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NavigationBar