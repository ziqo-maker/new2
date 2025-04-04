'use client'

import Image, {StaticImageData} from "next/image";
import FootPrint from '@/icons/footprint.svg';
import Dollar from '@/icons/Dollar.svg';
import React,{useEffect,useState} from 'react';
import Toast from 'typescript-toastify';
import { NewUserContext } from '@/contexts/UserContextB';
import AlienSoldier from '@/charactermg/AlienSoldier.webp'
import Ev from '@/charactermg/ev.webp'
import Jackie from '@/charactermg/jackie.webp'
import Mousey from '@/charactermg/Mousey.webp'
import SwatGuy from '@/charactermg/swatguy.webp'
import Toy from '@/imgs/toypic.webp'
import Lock from '@/icons/lock.svg';



const CharactersTab = () => {

    type model = {
        id: number; label: string; Icon: StaticImageData,cost:number,dollar:string,unlock:boolean
    }

    const { UserDt,setUserData } = React.useContext(NewUserContext);

    const [gtTasks,setTask] = useState<model[]>([
        { id: 1, label: 'Ty', Icon: Toy,cost : 0,dollar:'0.00000001',unlock:true },
        { id: 2, label: 'Mousey', Icon: Mousey,cost : 4000000,dollar:'0.00000001',unlock:false },
        { id: 3, label: 'Jackie', Icon: Jackie,cost : 6000000,dollar:'0.00000001',unlock:false },
        { id: 4, label: 'Swat Guy', Icon: SwatGuy,cost : 10000000,dollar:'0.00000001',unlock:false },
        { id: 5, label: 'Eve', Icon: Ev,cost : 20000000,dollar:'0.00000001',unlock:false },
        { id: 6, label: 'Alien Soldier', Icon: AlienSoldier,cost : 30000000,dollar:'0.00000001',unlock:false },
    ]);

    useEffect(() => {
        const mapstr = UserDt?.upgrade.split(',').map(Number);
        gtTasks.forEach((t: any)=> {
            const found = mapstr?.find(item => item === t.id);
            const contain = found !== undefined
            if(contain){
                var newData = gtTasks.map(el => {
                    if(el.id == t.id)
                       return Object.assign({}, el, {unlock:true})
                    return el
                });
                 setTask(newData)
            }
        })

    },[])


    const handle = async(cost:number,id:number,unlock:boolean) => {

    if(unlock == true){

        try {
            fetch('/api/updateselectedcharacter', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ idd: String(UserDt?.idd),selectcharacter:id}),
           })
           .then((res) => res.json())
           .then((data) => {
            if(data.success){
                setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(UserDt?.gtpoint),selectcharacter:String(id),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),firstname:String(UserDt?.firstname),ticket:String(UserDt?.ticket)})
               new Toast({
                             position: "top-center",
                             toastMsg: "Close and reopen the mini app to see the changes",
                             autoCloseTime: 8500,
                             canClose: true,
                             showProgress: true,
                             pauseOnHover: true,
                             pauseOnFocusLoss: true,
                             type: "default",
                             theme: "light"
                           });
            }else{
              new Toast({
                  position: "top-center",
                  toastMsg: "An error occurred, Please try again later.",
                  autoCloseTime: 4500,
                  canClose: true,
                  showProgress: true,
                  pauseOnHover: true,
                  pauseOnFocusLoss: true,
                  type: "default",
                  theme: "light"
                });
            }
           })
         } catch (err) {
          
         }

    }else if(Number(UserDt?.gtpoint) >= Number(cost) && unlock == false){
      
        const decreasepoint = Number(UserDt?.gtpoint) - cost
        const updatepgrade = UserDt?.upgrade+','+String(id)
        const updatevalue = Number(UserDt?.value)+0.00000001

         try {
                      fetch('/api/upgradecharacter', {
                       method: 'POST',
                       headers: {
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({ idd: String(UserDt?.idd),upgrade:updatepgrade,points: decreasepoint,selectcharacter:id,tokenvalue:String(updatevalue)}),
                     })
                     .then((res) => res.json())
                     .then((data) => {
                      if(data.success){
                        var newData = gtTasks.map(el => {
                            if(el.id == id)
                               return Object.assign({}, el, {unlock:true})
                            return el
                        });
                         setTask(newData)
                         setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(decreasepoint),selectcharacter:String(id),upgrade:String(updatepgrade),value:String(updatevalue),username:String(UserDt?.username),firstname:String(data.firstname),ticket:String(data.ticket)})
                         new Toast({
                          position: "top-center",
                          toastMsg: "Close and reopen the mini app to see the changes",
                          autoCloseTime: 8500,
                          canClose: true,
                          showProgress: true,
                          pauseOnHover: true,
                          pauseOnFocusLoss: true,
                          type: "default",
                          theme: "light"
                        });
                      }else{
                        new Toast({
                            position: "top-center",
                            toastMsg: "An error occurred, Please try again later.",
                            autoCloseTime: 4500,
                            canClose: true,
                            showProgress: true,
                            pauseOnHover: true,
                            pauseOnFocusLoss: true,
                            type: "default",
                            theme: "light"
                          });
                      }
                     })
                   } catch (err) {
                    
                   }

    }

   }
       
      

    return (
        <div className=" flex justify-center relative bg-white overflow-auto">
         <div className="w-full h-screen bg-white flex-col ">
         <div className="flex w-full  items-center justify-center items-center">
       <div className="flex w-[calc(100%-2rem)] bg-[#ffae19]/[0.9] border-white border-4 border-double mt-4 items-center  text-wrap  rounded-full px-1 py-[3px] ">
        <Image 
        src={FootPrint as StaticImageData} 
      className="w-10 h-10 aspect-square object-cover"
      alt="Shiba Inu"
    />
              <div className="flex-1 text-center">
              <div className="flex-col items-center justify-center">
              <p className="text-lg text-white font-Large">Current value</p>
              <p className=" text-white font-Large glow text-base truncate">${(Number(UserDt?.value)).toFixed(8)}</p>
              </div>
              </div>
              </div>
              
       </div>
         <div className="flex items-center justify-center text-center ">
          <p className="text-base w-[calc(100%-2rem)] text-[#ffae19]/[0.9] font-Large text-center text-wrap">Increase your WalkCoin value by unlocking characters</p>
         </div>
         {gtTasks.map((tab,index) => {
                        return (
                            <div key={index} className="flex w-full flex-col mt-8 items-center justify-center">

                             <Image
        src={tab.Icon as StaticImageData} 
      className="w-2/3 aspect-square object-fill rounded-full text-[#ffae19]/[0.9] border-4 border-double"
      alt="Shiba Inu"
       />
                <p className="text-base mt-1 text-black/[0.9] font-Large">{tab.label}</p>
                <div className="flex w-1/3 items-center text-center justify-start space-x-1 pl-1">
                 <Image
        src={Dollar as StaticImageData} 
      className="w-10 h-10  aspect-square object-cover"
      alt="Shiba Inu"
       />
                <p className="text-xl text-[#22ba00] font-Large">+</p>

         <p className="text-base mt-1 text-black/[0.9] font-Large">{tab.dollar}</p>
                    
                 </div>
                 <div className="flex w-1/3 items-center justify-start">
                 <Image
        src={FootPrint as StaticImageData} 
      className="w-12 h-12 aspect-square object-cover"
      alt="Shiba Inu"
       />
                       <p className="text-base mt-1 text-black/[0.9] font-Large">{tab.cost == 0 ? 'Free' : tab.cost.toLocaleString()}</p>
                    
                 </div>
                 <button onClick={() => handle(Number(tab.cost),tab.id,tab.unlock)} className={`${tab.unlock == true && Number(UserDt?.selectcharacter) == tab.id ? 'bg-[#ffae19]/[0.9]' : tab.unlock == true && Number(UserDt?.selectcharacter) != tab.id? 'bg-[#ffae19]/[0.5] ' : Number(UserDt?.gtpoint) >= Number(tab.cost) ? 'bg-[#ffae19]/[0.9]' : 'bg-[#ffae19]/[0.5]' } flex w-1/3 rounded-full  py-[10px] items-center justify-center text-center space-x-`}>
                 <Image
        src={Lock as StaticImageData} 
      className={`${tab.unlock == true ? 'w-0 h-0' : 'w-5 h-5'}`}
      alt="Shiba Inu"
       />
                 <p className="text-base text-black/[0.9] font-Large">{tab.unlock == true && Number(UserDt?.selectcharacter) == tab.id ? 'Selected' : tab.unlock == true && Number(UserDt?.selectcharacter) != tab.id? 'Select' :  'Unlock' }</p>
                  </button>
                            </div>
                        )
                    })}
           <div className="h-32"/>
         </div>
        </div>
    )
}

export default CharactersTab
