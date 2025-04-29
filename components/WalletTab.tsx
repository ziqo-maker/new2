'use client'
 
import Image, {StaticImageData} from "next/image";
import FootPrint from '@/icons/footprint.svg';
import Dollar from '@/icons/Dollar.svg';
import React,{useEffect,useState,useRef,useCallback} from 'react';
import Toast from 'typescript-toastify';
import { NewUserContext } from '@/contexts/UserContextB';
import AlienSoldier from '@/charactermg/AlienSoldier.webp'
import Ev from '@/charactermg/ev.webp'
import Jackie from '@/charactermg/jackie.webp'
import Mousey from '@/charactermg/Mousey.webp'
import SwatGuy from '@/charactermg/swatguy.webp'
import Toy from '@/imgs/toypic.webp'
import Lock from '@/icons/lockb.svg';
import DollarB from '@/icons/DollarWhite.svg'; 
import TicketCircle from '@/icons/whiteticket.svg';  
import Star from '@/icons/star.svg';
import copy from '@/icons/copy.svg'
import Ton from '@/imgs/ton.png';
import LockC from '@/icons/lockc.svg';
import Tick from '@/icons/tick.svg';
import { useTonConnectUI,SendTransactionRequest } from "@tonconnect/ui-react";
import { Address, beginCell,} from "@ton/core";

const CharactersTab = () => {

    type model = {
        id: number; label: string; Icon: StaticImageData,cost:number,dollar:string,unlock:boolean,ticket:number,star:number,ton:number
    }

    type modelB = {
      id: number
  }

    const { UserDt,setUserData } = React.useContext(NewUserContext);

    const [gtTasks,setTask] = useState<model[]>([]);
    const [gtMpdel,setModelB] = useState<modelB[]>([
      { id: 1},
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5},
      { id: 6 },
  ]);
  const [refresh, setRefresh] = useState<boolean>(false);
      const timerRef = useRef<NodeJS.Timeout | null>(null);
       const [refreshB, setRefreshB] = useState<boolean>(false);
 
    useEffect(() => {
      const upgrade = UserDt?.upgrade
      
        setRefresh(true)
        if (timerRef.current) {
          clearInterval(timerRef.current);
        };
        const mapstr = UserDt?.upgrade.split(',').map(Number);
        gtMpdel.forEach((t: any)=> {
        
            const found = mapstr?.find(item => item === t.id);
            const contain = found !== undefined
             if(t.id == 1){
              const model = {id: 1, label: 'Ty', Icon: Toy,cost : 0,dollar:'0.00000001',unlock:true,ticket:0,star: 0,ton:0}
              gtTasks.push(model)
            }else if (t.id == 2){
              const model = { id: 2, label: 'Mousey', Icon: Mousey,cost : 2500000,dollar:'0.00000020',unlock:contain,ticket:125,star: 25,ton:0.12 }
              gtTasks.push(model)
            }else if (t.id == 3){
              const model = { id: 3, label: 'Jackie', Icon: Jackie,cost : 5000000,dollar:'0.00000025',unlock:contain,ticket:250,star: 50,ton:0.25 }
                gtTasks.push(model)
            }else if(t.id == 4){
              const model =  { id: 4, label: 'Swat Guy', Icon: SwatGuy,cost : 8000000,dollar:'0.00000030',unlock:contain,ticket:375,star: 75,ton:0.37 }
              gtTasks.push(model)
            }else if(t.id == 5){
              const model =  { id: 5, label: 'Eve', Icon: Ev,cost : 12000000,dollar:'0.00000040',unlock:contain,ticket:500,star: 100,ton:0.50 }
              gtTasks.push(model)
            }else if(t.id == 6){
              const model = { id: 6, label: 'Alien Soldier', Icon: AlienSoldier,cost : 25000000,dollar:'0.00000050',unlock:contain,ticket:1000,star: 200,ton:1 }
                gtTasks.push(model)
            }
            
        })
      

      if(refresh == false) {
        timerRef.current = setInterval(() =>{
         
        setRefreshB(!refreshB)
        },3000);
       }

      return () => {  if (timerRef.current) {
        clearInterval(timerRef.current);
      };
    };

    },[refreshB])


    const handle = async(cost:number,id:number,unlock:boolean,dollar:String,ticket:number) => {

    if(unlock == true){
      const ticketupdate = Number(UserDt?.ticket) + Number(ticket)
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
              try {
                fetch('/api/update-ticket', {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ idd: String(UserDt?.idd),ticket: String(ticketupdate) }),
               })
               .then((res) => res.json())
               .then((data) => {
                 if (data.success) {
                  setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(UserDt?.gtpoint),selectcharacter:String(id),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})
                  new Toast({
                                position: "top-center",
                                toastMsg: "Close and reopen the app to see the changes",
                                autoCloseTime: 8500,
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
         const updatevalue = (Number(UserDt?.value)+Number(dollar)).toFixed(8)

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
                         setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(decreasepoint),selectcharacter:String(id),upgrade:String(updatepgrade),value:String(updatevalue),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})
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
       
   const handleCopyLink = () => {
             const inviteLink = `/characters`
             navigator.clipboard.writeText(inviteLink)
               new Toast({
                           position: "top-center",
                           toastMsg: 'The command is copied',
                           autoCloseTime: 4500,
                           canClose: true,
                           showProgress: true,
                           pauseOnHover: true,
                           pauseOnFocusLoss: true,
                           type: "default",
                           theme: "light"
                         });
           }
      
           const handleOpenLink = () => {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
              const tg = window.Telegram.WebApp
            tg.ready()
               tg.openTelegramLink("https://t.me/TheWalkCoinBot")     
            }
           }

            const [tonConnectUI,setOptions] = useTonConnectUI()
           const [tonAddress, setTonAddress] = useState<string | null>(null);
           const [verifybuy, setVerifyBuy] = useState(0);

           const handleWalletConnection = useCallback((address: string) => {
            setTonAddress(address);
            console.log("Wallet connected successfully!");
          }, []);
        
          const handleWalletDisconnection = useCallback(() => {
            setTonAddress(null);
            console.log("Wallet disconnected successfully!");
          }, []);

           useEffect(() => {
               const checkWalletConnection = async () => {
                 if (tonConnectUI.account?.address) {
                   handleWalletConnection(tonConnectUI.account?.address);
                 } else {
                   handleWalletDisconnection();
                 }
               };
           
               checkWalletConnection();
           
               const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
                 if (wallet) {
                   handleWalletConnection(wallet.account.address);
                 } else {
                   handleWalletDisconnection();
                 }
               });
           
               return () => {
                 unsubscribe();
               };
             }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);
           
           
             const handleWalletAction = async () => {
               if (tonConnectUI.connected) {
                 await tonConnectUI.disconnect();
               } else {
                 await tonConnectUI.openModal();
               }
             };
           
             const formatAddress = (address: string) => {
               const tempAddress = Address.parse(address).toString();
               return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
             };
           
            

           const handlePayment = async (id:number,ton:number) => {
           
           
               if (tonConnectUI.account?.address) {
                                
                   try {
           
                     const amount = id == 2 ? '120000000' : id == 3 ? '250000000' : id == 4 ? '370000000' : id == 5 ? '500000000' :id == 6 ? '1000000000' : '0'
                     
                   try {
                     fetch('/api/transactioncharacter', {
                      method: 'POST',
                      headers: {
                        'Content-Type':'application/json',
                      },
                      body: JSON.stringify({idd:String(UserDt?.idd),amount:String(ton),idcharacter: String(id)}),
                    })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.success) {
                    
                      } else {
                      }
                    })
                  } catch (err) {
                  }
               
                        await tonConnectUI.sendTransaction({
                           validUntil: Math.floor(Date.now() / 1000) + 60,
                           messages: [
                               {
                                   address: "UQD3X829OTABBFBWUASyK1h1zAYF7OjkEDWXtVss-DrL_dgy",
                                   amount: amount,
                                   payload: beginCell().storeUint(0, 32).storeStringTail("Unlock Character").endCell().toBoc().toString('base64'),
                               },
                           ],
                       });
           
                         
                           setVerifyBuy(id)
                           
                          new Toast({
                            position: "top-center",
                            toastMsg: "Your transaction was successful and the character will automatically unlock after 30 minutes of your transaction being confirmed, thank you for your patience.",
                            autoCloseTime: 15500,
                            canClose: true,
                            showProgress: true,
                            pauseOnHover: true,
                            pauseOnFocusLoss: true,
                            type: "default",
                            theme: "light"
                          });
               
               
                   } catch (error) {
                     
                   } 
                 
           
               } else {
                 new Toast({
                   position: "top-center",
                   toastMsg: "No TON wallet connected. Go to the raffle section and connect your wallet.",
                   autoCloseTime: 15500,
                   canClose: true,
                   showProgress: true,
                   pauseOnHover: true,
                   pauseOnFocusLoss: true,
                   type: "default",
                   theme: "light"
                 });
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
              <div className="flex-1 text-center mr-5">
              <div className="flex-col items-center justify-center">
              <p className="text-lg text-white font-Large">Current price</p>
              <p className=" text-white font-Large glow text-base truncate">${(Number(UserDt?.value)).toFixed(8)}</p>
              </div>
              </div>
              </div>
              
       </div>
         <div className="flex flex-col items-center justify-center text-center ">
          <p className="text-base w-[calc(100%-2rem)] text-[#ffae19]/[0.9] font-Large text-center text-wrap">By unlocking characters, you can increase the price of your WalkCoin tokens and walk with your favorite character</p>
          <div className="flex flex-col text-center mt-2 space-x-1 items-center justify-start">
          <Image
        src={Star as StaticImageData} 
      className={`w-6 h-6`}
      alt=""
       />
          <p className="text-black/[0.7] font-normal w-[calc(100%-2rem)] text-sm">You can unlock characters with Telegram stars in the WalkCoin bot by running the command /characters</p>

          </div>
         </div>
         {gtTasks.map((tab,index) => {
                        return (
                            <div key={index} className="flex w-full flex-col mt-8 items-center justify-center">

                             <Image
        src={tab.Icon as StaticImageData} 
      className="w-2/3 aspect-square object-fill rounded-full text-[#ffae19]/[0.9] border-[#ffae19]/[0.9] glowbox border-4 border-double"
      alt="Shiba Inu"
       />
                <div className={`bg-[#ffae19]/[0.9] mt-2 flex px-5 rounded-full   py-[10px] items-center justify-center text-center`}>
    
                 <p className="text-base text-white glow font-bold">{tab.label}</p>
                  </div>
                  <p className="text-base text-black glow font-bold mt-2">Benefits:</p>
                 <div className="flex space-x-2 items-center justify-center">
                 <div className={`flex flex-col bg-[#ffae19]/[0.9] mt-2 border-white border-4  border-double flex px-2 rounded-xl space-y-1  py-[5px] items-center justify-center text-center`}>
                 <p className="text-base text-white font-bold">WalkCoin Price</p>
                 <div className="flex space-x-1 items-center justify-center">
                 <Image 
        src={DollarB as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt="Shiba Inu"
    />
                 <p className="text-sm text-white glow font-bold">+{tab.dollar}</p>
                  </div>
               </div>
               {Number(tab.ticket) > 0 ? 
                <div className={`flex flex-col bg-[#ffae19]/[0.9] border-white border-4  border-double mt-2 flex px-2 rounded-xl space-y-1   py-[5px] items-center justify-center text-center`}>
                 <p className="text-base text-white font-bold">Raffle Ticket</p>
                 <div className="flex space-x-1 items-center justify-center">
                 <Image 
        src={TicketCircle as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt="Shiba Inu"
    />
                 <p className="text-sm text-white glow font-bold">+{tab.ticket}</p>
                  </div>
               </div>
               : ''
               }
               

                </div>
               
                 <div className="flex w-1/3  items-center justify-start">
                 <Image
        src={FootPrint as StaticImageData} 
      className="w-12 h-12 aspect-square object-cover"
      alt="Shiba Inu"
       />
                       <p className="text-base mt-1 text-black/[0.9] font-Large">{tab.cost == 0 ? 'Free' : tab.cost.toLocaleString()}</p>
                    
                 </div>
                 <button onClick={() => handle(Number(tab.cost),tab.id,tab.unlock,tab.dollar,tab.ticket)} className={`${tab.unlock == true && Number(UserDt?.selectcharacter) == tab.id ? 'bg-[#ffae19]/[0.9]' : tab.unlock == true && Number(UserDt?.selectcharacter) != tab.id? 'bg-[#ffae19]/[0.5] ' : Number(UserDt?.gtpoint) >= Number(tab.cost) ? 'bg-[#ffae19]/[0.9]' : 'bg-[#ffae19]/[0.5]' } flex w-1/3 rounded-full border-white border-4  border-double  py-[10px] items-center justify-center text-center space-x-`}>
                 <Image
        src={Lock as StaticImageData} 
      className={`${tab.unlock == true ? 'w-0 h-0' : 'w-7 h-7'}`}
      alt="Shiba Inu"
       />
       <Image
        src={Tick as StaticImageData} 
      className={`${tab.unlock == true && Number(UserDt?.selectcharacter) == tab.id ? 'w-7 h-7 mr-1' : 'w-0 h-0'}`}
      alt="Shiba Inu"
       />
                 <p className="text-base text-white font-bold">{tab.unlock == true && Number(UserDt?.selectcharacter) == tab.id ? 'Selected' : tab.unlock == true && Number(UserDt?.selectcharacter) != tab.id? 'Select' :  'Unlock' }</p>
                  </button>
            
            {tab.unlock == false?
            <center >

<div className="flex flex-col mt-2 ">

<button onClick={() => {handleOpenLink()}} className={`bg-[#ffae19]/[0.9]  flex px-4 rounded-full border-white border-4  border-double  py-[10px] items-center justify-center text-center`}>
 <Image
src={Lock as StaticImageData} 
className={`w-7 h-7`}
alt="Shiba Inu"
/>
 <p className="text-base text-white font-bold">Unlock | {tab.star} Stars</p>
<div className="w-1" />
 <Image
src={Star as StaticImageData} 
className={`w-5 h-5`}
alt="Shiba Inu"
/>
  </button>
</div>
              
<button onClick={() => handleCopyLink()} className="flex mt-1 bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-2xl px-2 py-[4px] ">
                           <Image 
                           src={copy as StaticImageData} 
                         className="w-6 h-6 aspect-square object-cover"
                         alt="Shiba Inu"
                       />
                               <p className="text-white font-normal text-[15px]  mr-2 ml-2">Copy command</p>
                                 </button>

                                 <button onClick={() => {handlePayment(tab.id,tab.ton)}} className={`bg-[#ffae19]/[0.9] mt-2 flex px-4 rounded-full border-white border-4  border-double  py-[10px] items-center justify-center text-center`}>
                 <Image
        src={LockC as StaticImageData} 
      className={`w-7 h-7`}
      alt="Shiba Inu"
       />
                 <p className="text-base text-white font-bold">Unlock | {tab.ton} TON</p>
               <div className="w-1" />
                 <Image
        src={Ton as StaticImageData} 
      className={`w-6 h-6`}
      alt="Shiba Inu"
       />
                  </button>

              </center>
              
            :''}
            <p className={`${verifybuy == tab.id ? 'text-black/[0.7] mr-4 ml-4 text-center mt-1 font-normal text-sm' : 'text-[0px] w-0 h-0'}`}>Your transaction was successful and the character will automatically unlock after 30 minutes of your transaction being confirmed, thank you for your patience.</p>

                       
                            </div>
                        )
                    })}
           <div className="h-32"/>
         </div>
        </div>
    )
}

export default CharactersTab
