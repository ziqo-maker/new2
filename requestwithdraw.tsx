'use client'

import TetherC from '@/icons/tetherc.svg';
import Image, {StaticImageData} from "next/image";
import React,{ useState,useRef,useEffect } from 'react'
import { NewUserContext } from '@/contexts/UserContextB';
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Info from '@/icons/info.svg';
import Toast from 'typescript-toastify';
import { useTab } from '@/contexts/TabContext'



type modelB = {
 id: number
}

const Withdraw = () => {
     

  const { UserDt,setUserData } = React.useContext(NewUserContext);
 
    const [network, setNetwork] = useState<string>('Select Network');
    const [address, setAddress] = useState<string>('');

    const [amount, setAmount] = useState<string>('0');

   const { activeTab, setActiveTab } = useTab()

   const [gtMpdel,setModelB] = useState<modelB[]>([
    { id: 1},
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5},
    { id: 6 },
]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
     const [refreshB, setRefreshB] = useState<boolean>(false);
     const [refreshC, setRefreshC] = useState<boolean>(false);

     const [A2, setA2] = useState<boolean>(false);
     const [A3, setA3] = useState<boolean>(false);
     const [A4, setA4] = useState<boolean>(false);
     const [A5, setA5] = useState<boolean>(false);
     const [A6, setA6] = useState<boolean>(false);

     useEffect(() => {
      
      setRefreshC(true)
        if (timerRef.current) {
          clearInterval(timerRef.current);
        };
        const mapstr = UserDt?.upgrade.split(',').map(Number);
        gtMpdel.forEach((t: any)=> {
        
            const found = mapstr?.find(item => item === t.id);
            const contain = found !== undefined
            
             if(t.id == 1){
              
            }else if (t.id == 2){
              setA2(contain)
            }else if (t.id == 3){
              setA3(contain)
            }else if(t.id == 4){
              setA4(contain)
            }else if(t.id == 5){
              setA5(contain)
            }else if(t.id == 6){
              setA6(contain)
            }
            
        })

      if(refreshC == false) {
        timerRef.current = setInterval(() =>{
         
        setRefreshB(!refreshB)
        },3000);
       }

      return () => {  if (timerRef.current) {
        clearInterval(timerRef.current);
      };
    };

    },[refreshB])

   const handle = async (network:string,address:string,amount:string,) => {
    const deduction = network == 'TON'? String((Number(amount)+0.65).toFixed(2)) : network == 'BSC(BEP20)'?String((Number(amount)+0.11).toFixed(2)): '0';
    const calpoint = Number(deduction) / Number(UserDt?.value)
    if(A2 == true && A3 == true && A4 == true && A5 == true && A6 == true){
      if(network == 'Select Network' || address.length ==0 || amount == '0'){
        new Toast({
                 position: "top-center",
                 toastMsg: "You must fill in all of the fields.",
                 autoCloseTime: 4500,
                 canClose: true,
                 showProgress: true,
                 pauseOnHover: true,
                 pauseOnFocusLoss: true,
                 type: "default",
                 theme: "light"
               });
           }else if(calpoint > Number(UserDt?.gtpoint)){
             new Toast({
               position: "top-center",
               toastMsg: "Not enough balance",
               autoCloseTime: 4500,
               canClose: true,
               showProgress: true,
               pauseOnHover: true,
               pauseOnFocusLoss: true,
               type: "default",
               theme: "light"
             });
       
           }else if(((Number(amount)+0.11)).toFixed(2) >= Number(1.50).toFixed(2) &&  network == 'BSC(BEP20)' || ((Number(amount)+0.65)).toFixed(2) >= Number(1.50).toFixed(2) && network == 'TON'){
            
             const actualreceive = network == 'TON' && (Number(amount)-0.65) > 0? String((Number(amount)-0.65).toFixed(2)) : network == 'BSC(BEP20)' && (Number(amount)-0.11)>0?String((Number(amount)-0.11).toFixed(2)): '0';
             
            const points = Number(UserDt?.gtpoint) - calpoint
             
             try {
               fetch('/api/request-withdraw', {
                method: 'POST',
                headers: {
                  'Content-Type':'application/json',
                },
                body: JSON.stringify({idd:String(UserDt?.idd),points:points,amount:String(actualreceive),address:address,network:network,status:'pending' }),
              })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                 setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String((Number(points).toFixed())),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(UserDt?.ticket),firstname:String(UserDt?.firstname)})
                 new Toast({
                   position: "top-center",
                   toastMsg: "Your request has been registered.",
                   autoCloseTime: 6500,
                   canClose: true,
                   showProgress: true,
                   pauseOnHover: true,
                   pauseOnFocusLoss: true,
                   type: "default",
                   theme: "light"
                 });
                setActiveTab('wallet')
                } else {
                }
              })
            } catch (err) {
            }
           }
    }

   }

       
    return (
        <div className="flex justify-center overflow-auto">
         <div className="w-full h-screen bg-white flex-col ">
         <center>
        <div className="flex-col w-full justify-center  mt-2 " >
            <center>
            <Image
        src={TetherC as StaticImageData}
      className="w-20 h-20  rounded-full  aspect-square  "
      alt=""
    />
            </center>  
            <div className="flex-1 text-center font-bold text-wrap">
              <p className="mr-20 ml-20 text-black/[0.5] font-Large text-xl glow">Withdrawal</p>
              </div>         
        </div>

        <div className="flex-1 text-center font-bold text-wrap">
              </div>
              <p className={`mr-4 ml-4 flex justify-center grow text-[#db0000]/[0.9] font-bold font-Large text-xl glow mt-5`}>All fields are required</p>
              {A2 == true && A3 == true && A4 == true && A5 == true && A6 == true ?
               ''
              :
              <p className={`mr-4 ml-4 flex justify-center grow text-[#db0000]/[0.9] font-normal font-Large text-base glow mt-1`}>*You aren't eligible to burn Walkcoin</p>
              }

      </center>
              
              <center>
             
        
            <Menu as="div" className="relative  w-[calc(100%-4rem)] mt-4">
                <MenuButton className="inline-flex block justify-between rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base text-white bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer">
                <p className={`font-normal text-base ${network == 'Select Network' ? 'text-white/[0.9] italic font-bold' : 'text-white font-normal'}`}>{network}</p>
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-7 text-white" />
                </MenuButton>
                <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Network</label>
        
              <MenuItems 
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#ffae19] ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div >
                  <button  onClick={() => setNetwork('BSC(BEP20)')} className='flex px-4 py-4   grow w-full text-center items-center justify-center'>
                    <a
                      className="block text-sm font-bold text-black "
                    >
                      BSC(BEP20)
                    </a>
                  </button>
                  <div className='flex grow w-full border-0 border-b-4 border-white'/>
                  <button  onClick={() => setNetwork('TON')} className='flex px-4 py-4   grow w-full text-center items-center justify-center'>
                    <a
                      className="block text-sm font-bold text-black "
                    >
                      TON
                    </a>
                  </button>
                
                  
                  
                  
        
                </div>
              </MenuItems>
            </Menu>

            <div className='flex w-[calc(100%-4rem)] justify-start items-center'>
    <p className={`font-normal text-sm glow text-black`}>Please make sure that the address under this network is the same as the deposit sending platform, or you might lose your funds.</p>

    </div>
    
    <div className="relative w-[calc(100%-4rem)] mt-4">
    <input type="text" id="floating_filled" value={address} onChange={(e) => setAddress(e.target.value)} className={`dark:text-white text-white block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none dark:text-white dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer`} placeholder="" />
    <label form="floating_filled" className={`absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}>Withdrawal address</label>
    </div>
    <div className='flex w-[calc(100%-4rem)] justify-start items-start'>
    <p className={`font-normal text-sm glow mt-1 text-black`}>Note: Enter the Tether USD Address</p>
    </div>
  

    <div className="relative w-[calc(100%-4rem)] mt-4">
    <input type="text" id="floating_filled" value={amount}  onChange={(e) => setAmount(e.target.value)}  className={`${amount == '0' ? 'text-white/[0.5] dark:text-white/[0.5]' : ' text-white dark:text-white'} block rounded-xl px-2.5 pb-2.5 pt-5 w-full text-base bg-[#6b4d11]/[0.8] dark:bg-[#6b4d11]/[0.8] border-0 border-b-4 border-[#ffae19]/[0.9] appearance-none  dark:border-[#ffae19]/[0.9] dark:focus:border-[#ffae19]/[0.9] focus:outline-none focus:ring-0 focus:border-[#ffae19]/[0.9] peer`} placeholder=" " />
    <label form="floating_filled" className="absolute text-sm  text-white dark:text-white/[0.9] italic font-bold  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Amount</label>
    <p className="text-white absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">USDT</p>
    </div>
    <div className='flex w-[calc(100%-4rem)] mt-1 justify-between items-start'>
    <p className={`font-normal text-sm glow text-black`}>Available: {(Number(UserDt?.gtpoint)*Number(UserDt?.value)).toFixed(8)} USDT</p>
    <Button onClick={() => setAmount(String(Number(UserDt?.gtpoint)*Number(UserDt?.value)))} className={`font-semibold text-base text-[#26A17B] mr-2`}>All</Button>
    </div>

    <div className='flex w-[calc(100%-4rem)] mt-3 justify-between items-start'>
    <p className={`font-normal text-sm glow text-black`}>Fee</p>
    <div className='flex space-x-1'>
    <p className={`font-normal text-sm  text-black`}>{network == 'TON'? '0.65' : network == 'BSC(BEP20)'?'0.11': '0'}</p>
    <p className={`font-normal text-sm text-black/[0.6]`}>USDT</p> 

      </div>
    </div>
    <div className='flex w-[calc(100%-4rem)] mt-1 justify-between items-start'>
    <p className={`font-normal text-sm glow text-black`}>Deduction</p>
    <div className='flex space-x-1'>
    <p className={`font-normal text-sm text-black`}>{network == 'TON'? String((Number(amount)+0.65).toFixed(2)) : network == 'BSC(BEP20)'?String((Number(amount)+0.11).toFixed(2)): '0'}</p>
    <p className={`font-normal text-sm text-black/[0.6]`}>USDT</p> 
    </div>
    </div>
    <div className='flex w-[calc(100%-4rem)] mt-1 justify-between items-start'>
    <p className={`font-normal text-sm glow text-[#ca2929f9]`}>Minimum withdrawal</p>
    <div className='flex space-x-1'>
    <p className={`font-normal text-sm text-[#ca2929f9]`}>20</p> 
    <p className={`font-normal text-sm text-black/[0.6]`}>USDT</p> 

    </div>
    </div>

    <div className='flex w-[calc(100%-4rem)] mt-1 justify-between items-start'>
    <p className={`font-normal text-sm glow text-[#22ba00]`}>Actual receive</p>
    <div className='flex space-x-1'>
    <p className={`font-normal text-sm text-[#22ba00]`}>{network == 'TON' && (Number(amount)-0.65) > 0? String((Number(amount)-0.65).toFixed(2)) : network == 'BSC(BEP20)' && (Number(amount)-0.11)>0?String((Number(amount)-0.11).toFixed(2)): '0'}</p>
    <p className={`font-normal text-sm text-black/[0.6]`}>USDT</p> 
    </div>
    </div>
                   
        <div className={`${((Number(UserDt?.gtpoint)*Number(UserDt?.value)).toFixed(8)) >= Number(20).toFixed(2)? 'h-5' : 'h-10' }`} />


    <button onClick={() => {handle(network,address,amount)}} data-dialog-target="dialog" className="relative w-[calc(100%-6rem)]">
    <div className="flex justify-center items-center space-x-2 px-4 pb-2 pt-2 w-full text-base text-white border-[#ffae19]/[0.9]  rounded-full bg-[#6b4d11]/[0.9] appearance-none dark:text-white border-4  focus:outline-none focus:ring-0 peer">
    <p className={`font-bold text-lg text-white glow text-nowrap`}>{amount == '0' ? 'Request' : ((Number(amount)+0.11)).toFixed(2) >= Number(20).toFixed(2) &&  network == 'BSC(BEP20)' || ((Number(amount)+0.65)).toFixed(2) >= Number(20).toFixed(2) && network == 'TON' ? 'Request' : 'Withdrawal limit 20 USDT' }</p>
    </div>
     </button>  

     <div className='flex space-x-1 w-[calc(100%-5rem)] mt-1 justify-center items-center'>
     <Image 
        src={Info as StaticImageData} 
      className="w-7 h-7 aspect-square object-cover"
      alt=""
    />
    <p className={`font-normal text-start text-base glow text-black text-wrap`}>It takes about 1 to 3 days to process your request</p>    
    </div>
   

     


              </center>
              <div className='h-1/5'/>
         </div>
        </div>
    )
}

export default Withdraw
