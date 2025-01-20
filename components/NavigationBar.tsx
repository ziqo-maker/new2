'use client'
import Image, {StaticImageData} from "next/image"
import { useTab } from '@/contexts/TabContext'
import Earn from '@/icons/Earn'
import Invite from '@/icons/inviteicon'
import Wallet from '@/icons/walleticon'
import { TabType } from '@/utils/types'
import ShibaMining from '@/imgs/logonav.png'


const NavigationBar = () => {
    const { activeTab, setActiveTab } = useTab()
    const chsHome = activeTab === 'home'
    const tabs: { id: TabType; label: string; Icon: React.FC<{ className?: string }> }[] = [
        { id: 'tasks', label: 'Tasks', Icon: Earn },
        { id: 'invite', label: 'Invite', Icon: Invite },
        { id: 'wallet', label: 'Wallet', Icon: Wallet },
    ]
   
    return (
        <div className="fixed bottom-0  left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-[#272a2f] grow flex justify-around items-center z-50 text-xs ">
             <button
                onClick={() => setActiveTab('home')}
                   className={`flex flex-col items-center m-1 p-2 rounded-2xl ${chsHome ? 'w-1/6 bg-[#1c1f24]' : 'w-1/6'}`}
               >
              <Image
        src={ShibaMining as StaticImageData}
      className="w-12 h-12 rounded-full mx-auto "
      alt="Home"
    />
      

                            </button>
           {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center m-1 p-2 rounded-2xl ${isActive ? 'w-1/6 bg-[#1c1f24]' : 'w-1/6'}`}
                            >
                                <tab.Icon
                                    className={`w-8 h-8 ${isActive ? 'text-[#ffffff]' : 'text-[#727272]'
                                        }`}
                                />
                                <span
                                    className={`text-xs font-medium ${isActive ? 'text-[#ffffff]' : 'text-[#727272]'
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
