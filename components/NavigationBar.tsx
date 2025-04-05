'use client'
import { useTab } from '@/contexts/TabContext'
import Earn from '@/icons/Earn'
import Invite from '@/icons/inviteicon'
import Wallet from '@/icons/walleticon'
import Home from '@/icons/Home'
import Rank from '@/icons/Rank'
import raffle from '@/icons/raffle.png'
import Image, {StaticImageData} from "next/image"

import { TabType } from '@/utils/types'


const NavigationBar = () => {
    
    const { activeTab, setActiveTab } = useTab()
    const tabs: { id: TabType; label: string; Icon: React.FC<{ className?: string }> }[] = [
        { id: 'home', label: 'Home', Icon: Home },
        { id: 'raffle', label: 'Raffle', Icon: Home },
        { id: 'tasks', label: 'Tasks', Icon: Earn },
        { id: 'invite', label: 'Invite', Icon: Invite },
        { id: 'wallet', label: 'Wallet', Icon: Wallet },
        { id: 'rank', label: 'Rating', Icon: Rank },
    ]
      
    return (
        <div className="fixed bottom-0 rounded-t-3xl left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-[#ffae19] grow flex justify-around items-center z-50 text-xs ">
        
           {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center m-1 p-2 rounded-2xl ${isActive ? 'w-1/6' : 'w-1/6'}`}
                            >
                             {String(tab.label) != "Raffle"? (
 <tab.Icon
 className={`w-7 h-7 ${isActive ? 'text-[#ffffff]' : 'text-[#6b4d11]/[0.8]'
     }`}
/>
                                ):(
                                     <Image 
                                    src={raffle as StaticImageData} 
                                  className={`w-8 h-8   object-cover ${isActive ? 'w-1/6' : 'w-1/6'}`}
                                  alt="Shiba Inu"
                                />
                                    
                                
                                )}
                                
                                <span
                                    className={`text-xs font-medium ${isActive ? 'text-[#ffffff]' : 'text-[#6b4d11]/[0.8]'
                                        }`}
                                >
                                    {tab.label}
                                </span>
                            </button>
                        )
                    })}
        </div>
    )
}

export default NavigationBar
