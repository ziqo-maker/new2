'use client'

import Image, {StaticImageData} from "next/image"
import FootPrint from '@/icons/footprint.svg';
import { useEffect,useState } from "react"
import React from 'react';
import { ShowPromiseResult } from "@/types/adsgram";

const Adsgram = () => {

  const [refresh, setRefresh] = useState<boolean>(false);
 
     useEffect(() => {
          
        const AdController = window.Adsgram?.init({
            blockId: "int-8537",
            debug: true,
            debugBannerType: "FullscreenMedia"
          });
             
        //  const showPromise: Promise<ShowPromiseResult> = AdController?.show();
        //  showPromise.then((result: ShowPromiseResult) => {
        //     // user watch ad till the end
        //     // your code to reward user
        //   }).catch((result: ShowPromiseResult) => {
        //     // user get error during playing ad or skip ad
        //     // do nothing or whatever you want
        //   })
         AdController?.show().then((result: ShowPromiseResult) => {
            // user watch ad till the end
            // your code to reward user
          }).catch((result: ShowPromiseResult) => {
            // user get error during playing ad or skip ad
            // do nothing or whatever you want
          })

     },[])

    return (
        <div className=" flex justify-center  overflow-auto">
        <div className="w-full h-screen bg-white flex-col ">
        <div className="flex-1 mt-5 text-start font-bold text-wrap">
              <p className="mr-20 ml-5 text-[#ffae19]/[0.9] font-Large text-xl glow">Leaderboard</p>
              </div>

              <div className="relative overflow-x-auto mt-5 mr-4 ml-4  ">
    <table className="w-full text-sm   text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase  bg-[#ffae19]/[0.9] border-white border-4  border-double ">
            <tr>
                <th scope="col" className="text-start px-6 py-3">
                Nº
                </th>
                <th scope="col" className="">
                    Name
                </th>
                
                <th scope="col" className="px-6 py-3">
                <div className="flex grow">
    
    <div className="flex-1 text-center ">
    <div className="flex items-center justify-center">
    
    <p className="">WalkCoin</p>
    </div>
    </div>
    </div>
                </th>
            </tr>
        </thead>
        
    </table>
</div>

    <div className="h-20 mt-5" />
           </div>
           </div>
    )

}

export default Adsgram