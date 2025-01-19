'use client'

import Image, {StaticImageData} from "next/image";
import Friends from '@/imgs/Invitefriends.png';
import Copy from '@/imgs/copy.png';


const InviteTab = () => {
    return (
        <div className=" flex justify-center">
        <div className="w-full h-screen bg-[#1d2025] flex-col ">
            <center>
            <Image
        src={Friends as StaticImageData}
      className="w-40 h-40 mt-5  aspect-square object-cover   "
      alt="Shiba Inu"
    />
    
            </center>
       
        <div className="flex-1 items-center">
          
        <div className="flex-1 mt-1 text-center font-bold ">
              <p className="text-white font-Large text-2xl glow">Invite Friends!</p>
              <div className="flex  items-center justify-center">
              <p className="w-2/3 text-[#ffae19] font-Large glowstart m-2 text-lg">You will receive 25 SHIB</p>
              </div>
              <center>
              <button className="flex space-x-1 px-10 m-5 items-center justify-center items-center bg-[#2f3036] rounded-full py-[10px] max-w-sm">
              <Image
        src={Copy as StaticImageData}
      className="w-7 h-7  aspect-square object-cover   "
      alt="Shiba Inu"
    />
               <p className="text-white font-Large text-wrap text-left">Invite a Friend</p>
               </button>
              </center>
              
              </div>
               
             </div>
             
       </div>
         </div>
    )
}

export default InviteTab