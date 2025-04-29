'use client'




import React, { useState, useEffect } from 'react';

type Ad = {
title: string;
[key: string]: any; // in case there are more properties
};

declare global {
interface Window {
manualTasks?: Ad[];
runTask?: (index: number) => void;
taskCompleted?: (index: number) => void;
postbackValue?: number;
}
}

const Rewarded: React.FC = () => {
const [adsArray, setAdsArray] = useState<Ad[]>([]);
window.postbackValue = 50;
useEffect(() => {
const taskCheckingInterval = setInterval(() => {
if (window.manualTasks && window.manualTasks.length > 0) {
clearInterval(taskCheckingInterval);
setAdsArray(window.manualTasks);
}
}, 2000);
return () => clearInterval(taskCheckingInterval);
}, []);
useEffect(() => {
window.taskCompleted = (index: number) => {
const adButton = document.getElementById('') as HTMLButtonElement | null;
if (adButton) {
adButton.disabled = true;
adButton.textContent = 'Completed';
}
};
return () => {
delete window.taskCompleted;
};
}, []);
return (
<div>
{adsArray.length > 0 ? (
adsArray.map((ad, index) => (
<div key={index}>
<button
id={''}
onClick={() => window.runTask && window.runTask(index)}
>
{ad.title}
</button>
</div>
))
) : (
<p>Loading..</p>
)}
</div>
);
};
export default Rewarded;

// import Image, {StaticImageData} from "next/image";
// import FootPrint from '@/icons/footprint.svg';
// import Speed1 from '@/speedmg/speed1.webp';
// import Speed2 from '@/speedmg/speed2.webp';
// import Speed3 from '@/speedmg/speed3.webp';
// import Speed4 from '@/speedmg/speed4.webp';
// import Speed5 from '@/speedmg/speed5.webp';
// import Speed6 from '@/speedmg/speed6.webp';
// import Speed7 from '@/speedmg/speed7.webp';
// import React,{useEffect} from 'react';
// import Toast from 'typescript-toastify';
// import { NewUserContext } from '@/contexts/UserContextB';


// const SpeedTab = () => {
  
//     const { UserDt,setUserData } = React.useContext(NewUserContext);
//     const tasks: { id: number; label: string; Icon: StaticImageData,cost:string }[] = [
//         { id: 1, label: 'x1 tokens and 2 tickets', Icon: Speed1,cost : '0' },
//         { id: 2, label: 'x2 tokens and 4 tickets', Icon: Speed2,cost : '100000' },
//         { id: 3, label: 'x3 tokens and 6 tickets', Icon: Speed3,cost : '150000' },
//         { id: 4, label: 'x4 tokens and 8 tickets', Icon: Speed4,cost : '200000' },
//         { id: 5, label: 'x5 tokens and 10 tickets', Icon: Speed5,cost : '250000' },
//         { id: 6, label: 'x6 tokens and 12 tickets', Icon: Speed6,cost : '350000' },
//         { id: 7, label: 'x7 tokens and 14 tickets', Icon: Speed7,cost : '500000' },
//     ]

//     const handle = async(cost:number,id:number) => {

//         if(Number(UserDt?.speedlvl)+1 == id && Number(UserDt?.gtpoint) >= Number(cost)){
          
//             const lvl = Number(UserDt?.speedlvl) +1
//             const decreasepoint = Number(UserDt?.gtpoint) - cost
//             try {
//               fetch('/api/updatespeed', {
//                method: 'POST',
//                headers: {
//                  'Content-Type': 'application/json',
//                },
//                body: JSON.stringify({ idd: String(UserDt?.idd),speedlvl:lvl,points: decreasepoint}),
//              })
//              .then((res) => res.json())
//              .then((data) => {
//               if(data.success){
//                 //  setUserData({idd:String(UserDt?.idd),speedlvl:String(lvl),gtpoint:String(decreasepoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username)})
//                  new Toast({
//                                position: "top-center",
//                                toastMsg: "Done.",
//                                autoCloseTime: 4500,
//                                canClose: true,
//                                showProgress: true,
//                                pauseOnHover: true,
//                                pauseOnFocusLoss: true,
//                                type: "default",
//                                theme: "light"
//                              });
//               }else{
//                 new Toast({
//                     position: "top-center",
//                     toastMsg: "An error occurred, Please try again later.",
//                     autoCloseTime: 4500,
//                     canClose: true,
//                     showProgress: true,
//                     pauseOnHover: true,
//                     pauseOnFocusLoss: true,
//                     type: "default",
//                     theme: "light"
//                   });
//               }
//              })
//            } catch (err) {
            
//            }

//         }
//         }
       
      

//     return (
//         <div className=" flex justify-center relative bg-white overflow-auto">
//          <div className="w-full h-screen bg-white flex-col ">
         
//          {tasks.map((tab,index) => {
//                         return (
//                             <div key={index} className="flex flex-col mt-8 items-center justify-center">

//                              <Image
//         src={tab.Icon as StaticImageData} 
//       className="w-2/4 aspect-square object-cover rounded-full text-[#ffae19]/[0.9] border-4 border-double"
//       alt="Shiba Inu"
//        />
//                 <p className="text-base mt-1 text-black/[0.9] font-Large">{tab.label}</p>
//                 <p className="text-base mt-1 text-black/[0.9] font-Large"> every 2 hours </p>

//                  <div className="flex w-1/3 items-center justify-start">
//                  <Image
//         src={FootPrint as StaticImageData} 
//       className="w-12 h-12 aspect-square object-cover"
//       alt="Shiba Inu"
//        />
//                        <p className="text-base mt-1 text-black/[0.9] font-Large">{Number(tab.cost) == 0 ? 'Free' : Number(tab.cost).toLocaleString()}</p>
                    
//                  </div>
//                  <button onClick={() => handle(Number(tab.cost),tab.id)} className={`${ Number(UserDt?.speedlvl)+1 == tab.id && Number(UserDt?.gtpoint) >= Number(tab.cost) ? 'bg-[#ffae19]/[0.9]' : 'bg-[#ffae19]/[0.6]'} flex w-1/3 rounded-full  py-[10px] items-center justify-center text-center`}>
//                  <p className="text-base text-black/[0.9] font-Large">{UserDt?.speedlvl == String(tab.id) ? 'Selected' :  Number(UserDt?.speedlvl)+1 == tab.id && Number(UserDt?.gtpoint) >= Number(tab.cost) ? 'Speed Up' : Number(tab.id) > Number(UserDt?.speedlvl)+1 ? 'Unavailable' :  Number(tab.id) < Number(UserDt?.speedlvl) ? 'Passed' : 'Not enough' }</p>
//                   </button>
//                             </div>
//                         )
//                     })}
//            <div className="h-32"/>
//          </div>
//         </div>
//     )
// }

// export default SpeedTab
