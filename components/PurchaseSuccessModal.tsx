'use client';

import Image, {StaticImageData} from "next/image"
import Extra from '@/imgs/extra.png';
import TicketCircle from '@/icons/whiteticket.svg';
import Star from '@/icons/star.svg';
import copy from '@/icons/copy.svg'
import FootPrint from '@/icons/footprint.svg';

interface CurrentPurchaseWithSecret {
  transactionId: string;
  timestamp: number;
  secret?: string;
}

interface PurchaseSuccessModalProps {
  currentPurchase: CurrentPurchaseWithSecret;
  onClose: () => void;
}

export default function PurchaseSuccessModal() {

  return (
    <center>

<div className="fixed inset-0 bg-[#808080] overflow-x-auto bg-opacity-50 h-screen  items-center z-40 justify-center p-2 ">
      <div className="bg-white  border-4 border-double border-[#ffae19]/[0.9] glowbox transform  rounded-3xl bg-white shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                               
      <div className="h-2" />

                             <div className="sm:flex sm:items-start">
                              
                               <div className=" w-full text-center  sm:ml-4 sm:text-left">
                                 
                                 <center>
                                 <p  className="text-base font-semibold text-gray-900">
                                 Need Extra WalkCoin ?
                                 </p>
                                 <div className="">
                                   <p className="text-sm text-gray-500">
                                   You can get additional WalkCoin tokens and raffle tickets every 2 hours 
                                   </p>
                                 </div>
                              </center>
                                 
                               </div>
                             </div>
                           
                           <div className="h-2" />

                            <div  className="flex flex-col justify-center space-x-2  items-center  rounded-full ">
                                             
                                               <div className="flex">
                                               <button onClick={() => {}} className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
                                               <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                               <Image 
                                         src={FootPrint as StaticImageData} 
                                       className="w-6 h-6 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               <p className="text-white   font-bold glow text-sm ">+{Number(10000).toLocaleString()}</p>
                                               <Image 
                                         src={Extra as StaticImageData} 
                                       className="w-7 h-7 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               </div>
                                               <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                               <p className=" text-black font-bold glow text-[13px] text-wrap">10 Stars</p>
                                               <Image 
                                         src={Star as StaticImageData} 
                                       className="w-5 h-5 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               </div>
                                               </button>
                                 
                                               <button onClick={() => {}} className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
                                               <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                               <Image 
                                         src={FootPrint as StaticImageData} 
                                       className="w-6 h-6 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               <p className="text-white   font-bold glow text-sm ">+{Number(20000).toLocaleString()}</p>
                                               <Image 
                                         src={Extra as StaticImageData} 
                                       className="w-7 h-7 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               </div>
                                               <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                               <p className=" text-black font-bold glow text-[13px] text-wrap">30 Stars</p>
                                               <Image 
                                         src={Star as StaticImageData} 
                                       className="w-5 h-5 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               </div>
                                               </button>
                                               </div>
                                               <div className="h-3" />
                                               <div className="flex space-x-2">
                                               <button onClick={() => {}} className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
                                               <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                               <Image 
                                         src={FootPrint as StaticImageData} 
                                       className="w-6 h-6 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               <p className="text-white   font-bold glow text-sm ">+{Number(30000).toLocaleString()}</p>
                                               <Image 
                                         src={Extra as StaticImageData} 
                                       className="w-7 h-7 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               </div>
                                               <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                               <p className=" text-black font-bold glow text-[13px] text-wrap">50 Stars</p>
                                               <Image 
                                         src={Star as StaticImageData} 
                                       className="w-5 h-5 aspect-square object-cover"
                                       alt="Shiba Inu"
                                     />
                                               </div>
                                               </button>

                                               <button onClick={() => {}} className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
                                                                   <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                   <Image 
                                                             src={TicketCircle as StaticImageData} 
                                                           className="w-6 h-6 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   <p className="text-white   font-bold glow text-sm ">+7</p>
                                                                   <Image 
                                                             src={Extra as StaticImageData} 
                                                           className="w-7 h-7 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   </div>
                                                                   <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                   <p className=" text-black font-bold glow text-[13px] text-wrap">10 Stars</p>
                                                                   <Image 
                                                             src={Star as StaticImageData} 
                                                           className="w-5 h-5 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   </div>
                                                                   </button>
                                               </div>
                                              
                                               </div>

                                                <div className="h-3" />
                                                     
                                                                   <div className="flex  justify-center space-x-2  items-center  rounded-full ">
                                                                   
                                                                   <div className="flex">
                                                                  
                                                     
                                                                   <button onClick={() => {}} className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
                                                                   <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                   <Image 
                                                             src={TicketCircle as StaticImageData} 
                                                           className="w-6 h-6 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   <p className="text-white   font-bold glow text-sm ">+15</p>
                                                                   <Image 
                                                             src={Extra as StaticImageData} 
                                                           className="w-7 h-7 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   </div>
                                                                   <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                   <p className=" text-black font-bold glow text-[13px] text-wrap">30 Stars</p>
                                                                   <Image 
                                                             src={Star as StaticImageData} 
                                                           className="w-5 h-5 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   </div>
                                                                   </button>
                                                                   </div>
                                                     
                                                                   <button onClick={() => {}} className="flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double  ">
                                                                   <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                   <Image 
                                                             src={FootPrint as StaticImageData} 
                                                           className="w-6 h-6 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   <p className="text-white   font-bold glow text-sm ">+25</p>
                                                                   <Image 
                                                             src={Extra as StaticImageData} 
                                                           className="w-7 h-7 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   </div>
                                                                   <div className="flex items-center space-x-1.5 rounded-lg bg-white mt-1 px-1 py-1 justify-center">
                                                                   <p className=" text-black font-bold glow text-[13px] text-wrap">50 Stars</p>
                                                                   <Image 
                                                             src={Star as StaticImageData} 
                                                           className="w-5 h-5 aspect-square object-cover"
                                                           alt="Shiba Inu"
                                                         />
                                                                   </div>
                                                                   </button>
                                                     
                                                                   
                                                                  
                                                                   </div>
                                                                   <div className="h-3" />
                                                                   <div className="flex  justify-center space-x-2  items-center ">
                                                     
                                                     <button onClick={() => {}} className={`bg-[#ffae19]/[0.9]  flex px-4 rounded-xl border-white border-4  border-double  py-[10px] items-center justify-center text-center`}>
                                                      
                                                      <p className="text-base text-white font-bold">Unlock |  Stars</p>
                                                     <div className="w-1" />
                                                      <Image
                                                     src={Star as StaticImageData} 
                                                     className={`w-5 h-5`}
                                                     alt="Shiba Inu"
                                                     />
                                                       </button>
                                                     
                                                       <button onClick={() => {}} className="flex mt-1 bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-3 py-[8px] ">
                                                                                <Image 
                                                                                src={copy as StaticImageData} 
                                                                              className="w-6 h-6 aspect-square object-cover"
                                                                              alt="Shiba Inu"
                                                                            />
                                                                                      </button>
                                                     </div>

                        <div className="flex flex-col text-center mt-2 space-x-1 items-center justify-start">
                                 
                                  <p className="text-black/[0.7] font-normal w-[calc(100%-2rem)] text-sm">You can unlock characters with Telegram stars in the WalkCoin bot by running the command /characters</p>
                        
                                  </div>
                                  <div className="h-20" />
                                  <div className="h-20" />
                                  <div className="h-20" />
                                  <div className="h-20" />
                                  <div className="h-20" />
                                  <div className="h-20" />

      </div>
    </div>

    </center>
    
  );
} 
