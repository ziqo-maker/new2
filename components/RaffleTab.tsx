'use client'

import Image, {StaticImageData} from "next/image"
import FootPrint from '@/icons/footprint.svg';
import React, { useRef,useState,useCallback,useEffect } from 'react';
import { NewUserContext } from '@/contexts/UserContextB';
import Ton from '@/imgs/ton.png';
import Time from '@/icons/time.svg';
import First from '@/icons/first.svg';
import Second from '@/icons/second.svg';
import Ticket from '@/icons/ticket.svg';
import TicketWhite from '@/icons/whiteticket.svg';
import Third from '@/icons/third.svg';
import Chance from '@/icons/chance.svg';
import Fourth from '@/imgs/fourth.png';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useTonConnectUI,SendTransactionRequest } from "@tonconnect/ui-react";
import { Address, beginCell,} from "@ton/core";
import { Button } from "@headlessui/react";
import Toast from 'typescript-toastify';
import Star from '@/icons/star.svg';
import copy from '@/icons/copy.svg'
import imoon from '@/imgs/imoon.jpg'
import imoonsvg from '@/imgs/imoonsvg.svg'

type board = {
  id:string
  ticket: string;
  name:string;
}

type winnertype = {
  id:string
  amount: string;
  name:string;
  date: Date;
}

type transactiontype = {
  id:string
  amount: string;
  tickets:string;
  date: Date;
  status: string;
}



const RaffleTab = () => {

  const [tonConnectUI,setOptions] = useTonConnectUI()
  const [tonAddress, setTonAddress] = useState<string | null>(null);
  const { UserDt,setUserData,loadUserData } = React.useContext(NewUserContext);
  const [value, setValue] = React.useState(0);
  const [valuestar, setValueStar] = React.useState(0);

  const [buyTicket, setBuyTicket] = useState(0);
  const [buyStar, setBuyStar] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [verifybuy, setVerifyBuy] = useState(false);

  const [usedticket, setUsedTicket] = useState(0);

  const [chsCtg, setChsCtg] = useState(1);

  const [tonprice, setTonPrice] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
  
     const [hours,setHours] = useState("00");
    const [minutes,setMinutes] = useState("00");
  const [seconds,setSeconds] = useState("00");
  const [days,setDays] = useState("00");

  const [rfrshvalue, setRfrshValue] = useState(false);
  const [rfrshuse, setRfrshUse] = useState(false);

  const [chance, setChance] = useState(0);

  const [refresh, setRefresh] = useState<boolean>(false);
  const timerRefB = useRef<NodeJS.Timeout | null>(null);
     const [refreshB, setRefreshB] = useState<boolean>(false);

    const [gtBoard,setBoard] = useState<board[]>([]);

    const [gtWinner,setWinner] = useState<winnertype[]>([]);

    const [gtTransaction,setTransaction] = useState<transactiontype[]>([]);
  

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

  const handleSliderChange = (event: Event, newValue: number) => {
    setValue(newValue);
  };

  const handleSliderChangeStar = (event: Event, newValue: number) => {
    setValueStar(newValue);
    setBuyStar(0)
  };

  const handleSliderChangeUseTicket = (event: Event, newValue: number) => {
    setTicket(newValue);
  };

  const handlePayment = async () => {


    if (tonConnectUI.account?.address) {

      if(buyTicket != 0){
          
        try {

          const amount = buyTicket == 1 ? '250000000' : buyTicket == 2 ? '490000000' : '740000000'
          const nmbtickets =  buyTicket == 1 ? '100' : buyTicket == 2 ? '250' : '500'
             const amountB = buyTicket == 1 ? '0.25' : buyTicket == 2 ? '0.49' : '0.74'
        try {
          fetch('/api/transaction', {
           method: 'POST',
           headers: {
             'Content-Type':'application/json',
           },
           body: JSON.stringify({idd:String(UserDt?.idd),amount:String(amountB),status:'pending',tickets: String(nmbtickets)}),
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
                        payload: beginCell().storeUint(0, 32).storeStringTail("Mint").endCell().toBoc().toString('base64'),
                    },
                ],
            });

                setTransaction([])
                setVerifyBuy(true)
                setRefreshB(!refreshB)
               new Toast({
                 position: "top-center",
                 toastMsg: "Your transaction was successful. Your tickets will be added automatically after 30 minutes of your transaction being confirmed.",
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
      }

    } else {
      new Toast({
        position: "top-center",
        toastMsg: "No TON wallet connected. Please connect your wallet.",
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



// useEffect(() => {

//   try {
//     fetch('/api/get-raffle', {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify({}),
//    })
//    .then((res) => res.json())
//    .then((data) => {

//      if (data.success) {
//         setTonPrice(Number(data.priceton))
//         const target = new Date(data.date2);
//         const now = new Date(data.date1);
//         var q = 0        
//         timerRef.current = setInterval(() =>{
//           q += 1000
//           const difference = target.getTime() - now.getTime() - q;
          
//           if(difference > 1000 ){

//             const d = Math.floor(difference / (1000 * 3600 * 24));
//           var dstr = Math.trunc(d).toString();
//           setDays(String(dstr)); 
//           const h = Math.floor(difference % (1000*60*60*24)) / (1000*60*60);
//           var hstr = Math.trunc(h).toString();
//           setHours(String(hstr).padStart(2, "0")); 
//           const m = Math.floor((difference % (1000*60*60)) / (1000*60))
//           if(Math.sign(m) === -1){
//            setMinutes("00")
//           }else{
//             var mstr = m.toString();
//             setMinutes(String(mstr).padStart(2, "0"));
//           }
//           const s = Math.floor((difference % (1000*60)) / 1000)
//           if(Math.sign(s) === -1){
//             setSeconds("00")
//           }else{
//             var sstr = s.toString();
//             setSeconds(String(sstr).padStart(2, "0"));
//           }
           
//           }
          
//         },1000);

       
//      } else {
      
//      }
     
//    })
//   } catch (err) {
   
//   }

//   }, []);

     

  // useEffect(() => {

  //       try {
  //         fetch('/api/get-ticket', {
  //          method: 'POST',
  //          headers: {
  //            'Content-Type': 'application/json',
  //          },
  //          body: JSON.stringify({ idd: String(UserDt?.idd) }),
  //        })
  //        .then((res) => res.json())
  //        .then((data) => {
  //          if (data.success) {
  //           setRefresh(true)
  //           const gtuseticket = Number(data.useticket)
  //           const cal = gtuseticket >= 1? gtuseticket : 0
  //           setUsedTicket(cal)
  //           if(cal >= 0){
              
  //             try {
  //               fetch('/api/get-chance', {
  //                method: 'POST',
  //                headers: {
  //                  'Content-Type': 'application/json',
  //                },
  //                body: JSON.stringify({}),
  //              })
  //              .then((res) => res.json())
  //              .then((data) => {
  //               if(data.success){
                 
  //                 var cnt = 0
  //                 var nmb = 0
  //                 const gtBoar: board[] = []
  //                 data.all.forEach((t: any)=> {
  //                   nmb += Number(t.ticket)
  //                   cnt++
                   
  //                     let model = {
  //                       id:String(cnt),
  //                       name:t.name,
  //                       ticket:t.ticket,
  //                    }
                     
  //                    gtBoar.push(model)
                    
  //                 })
                  
  //                 var sortedArray: board[] = gtBoar.sort((n1,n2) => Number(n1.ticket) - Number(n2.ticket));
  //                 const slc = sortedArray.reverse().slice(0,15)
  //                 setBoard(slc)
  //                 const gtchance = (cal / Number(nmb)) * Number(100)
  //                 setChance(gtchance)
  //               }
  //              })
      
  //            } catch (err) {
              
  //            }
  
  //            try {
  //             fetch('/api/get-winner', {
  //              method: 'POST',
  //              headers: {
  //                'Content-Type': 'application/json',
  //              },
  //              body: JSON.stringify({ idd: String(UserDt?.idd) }),
  //            })
  //            .then((res) => res.json())
  //            .then((data) => {
  //             if(data.success){
               
  //               var nmb = 1
  //               const gtWinnerB: winnertype[] = []
  //               data.all.forEach((t: any)=> {
  //                 let model = {
  //                   id:String(nmb),
  //                   date:t.date,
  //                   amount:t.amount,
  //                   name:t.name
  //                }
  //                nmb++
  //                gtWinnerB.push(model)
                 
  //               })
  //             setWinner(gtWinnerB)
  //             }
  //            })
  //          } catch (err) {
            
  //          }
  
  //            try {
  //             fetch('/api/get-transaction', {
  //              method: 'POST',
  //              headers: {
  //                'Content-Type': 'application/json',
  //              },
  //              body: JSON.stringify({ idd: String(UserDt?.idd) }),
  //            })
  //            .then((res) => res.json())
  //            .then((data) => {
  //             if(data.success){
               
  //               var nmb = 1
  //               const gtTransactionB: transactiontype[] = []
  //               data.all.forEach((t: any)=> {
  //                 let model = {
  //                   id:String(nmb),
  //                   date:t.date,
  //                   amount:t.amount,
  //                   tickets:t.tickets,
  //                   status:t.status
  //                }
  //                nmb++
  //                gtTransactionB.push(model)
                 
  //               })
  //               setTransaction(gtTransactionB)
  //             }
  //            })
  //          } catch (err) {
            
  //          }

  //           }
      
  //          } else {
            
  //          }
  //        })
  //      } catch (err) {
  //      }

      

  //        if(refresh == false) {
  //         timerRefB.current = setInterval(() =>{
  //         setRefreshB(!refreshB)
  //         },3000);
  //        }

  //       return () => {  if (timerRefB.current) {
  //         clearInterval(timerRefB.current);
  //       };
  //     };
  
  //    },[refreshB])

     const buyticketwithwalkcoin = async (rfrshvalue:boolean) => {
      if(rfrshvalue == false){
        setRfrshValue(true)
        const decrease = value * 50000
      const plus = Number(UserDt?.gtpoint) - Number(decrease)
      const mx = Number(UserDt?.ticket)+value
      try {
        fetch('/api/update-walkcoin', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ idd: String(UserDt?.idd),usetoken:decrease,ticket:String(mx) }),
       })
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
          
          setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(plus),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(mx),firstname:String(UserDt?.firstname)})
new Toast({
        position: "top-center",
        toastMsg: `You're received ${value.toLocaleString()} ${value <= 1 ? 'ticket' : 'tickets'} for ${decrease.toLocaleString()} WalkCoin `,
        autoCloseTime: 4500,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "default",
        theme: "light"
      });
      setValue(0)
           setRfrshValue(false)
         } else {
          
         }
       })
     } catch (err) {
     }

      }

     }

     const useticketbtn = async (rfrshuse:boolean) => {
       new Toast({
            position: "top-center",
            toastMsg: `name :${ UserDt?.firstname}`,
            autoCloseTime: 4500,
            canClose: true,
            showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "default",
            theme: "light"
          });
  //     if(ticket != 0){

  //       if(rfrshuse == false){
  //         setRfrshUse(true)
          
  //       const increase = Number(usedticket) + Number(ticket)
  //       const plus = Number(UserDt?.ticket) - ticket
  //       const name = String(UserDt?.firstname).length == 0 ?  String(UserDt?.username) : String(UserDt?.firstname)
  //       try {
  //         fetch('/api/update-useticket', {
  //          method: 'POST',
  //          headers: {
  //            'Content-Type': 'application/json',
  //          },
  //          body: JSON.stringify({ idd: String(UserDt?.idd),useticket:String(increase),ticket:String(plus),name:name }),
  //        })
  //        .then((res) => res.json())
  //        .then((data) => {
  //          if (data.success) {
  //           setTicket(0)
  //           setUsedTicket(increase)
  //           setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(UserDt?.gtpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(plus),firstname:String(UserDt?.firstname)})
  // new Toast({
  //         position: "top-center",
  //         toastMsg: `You used ${ticket.toLocaleString()} ${ticket <= 1 ? 'ticket' : 'tickets'}`,
  //         autoCloseTime: 4500,
  //         canClose: true,
  //         showProgress: true,
  //         pauseOnHover: true,
  //         pauseOnFocusLoss: true,
  //         type: "default",
  //         theme: "light"
  //       });
  //       setRfrshUse(false)
  //       setBoard([])
  //       setWinner([])
  //       setTransaction([])
  //       setRefreshB(!refreshB)  
  //          } else {
            
  //          }
  //        })
  //      } catch (err) {
  //      }
  
  //       }

  //     }

     }


     const handlePurchase = async () => {
      var cntgtticket = buyStar == 3 ? '900 tickets' : buyStar == 1 ? '250 tickets' : buyStar == 2 ? '600 tickets' : `${Number(valuestar) * 5} tickets`
      var title = buyStar == 3 ? 'Buy 900 tickets | 150 Stars' : buyStar == 1 ? 'Buy 250 tickets | 50 Stars' : buyStar == 2 ? 'Buy 600 tickets | 100 Stars' : `Buy ${Number(valuestar) * 5} tickets | ${valuestar} ${valuestar == 0 || valuestar == 1? 'Star' : 'Stars'}`
      var cntticket = buyStar == 3 ? Number(900) : buyStar == 1 ? Number(250) : buyStar == 2 ? Number(600) : Number(Number(valuestar) * 5)
      var setamount = buyStar == 3 ? Number(150) : buyStar == 1 ? Number(50) : buyStar == 2 ? Number(100) : Number(valuestar)
      const plusticket = Number(UserDt?.ticket) + Number(cntticket)
      try {
        
        const response = await fetch('/api/create-invoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId:String(UserDt?.idd),
            amount:String(setamount),
            title : String(cntgtticket)
          })
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create invoice');
        }
  
        const { invoiceLink,gterror } = await response.json();
  
        
        const WebApp = (await import('@twa-dev/sdk')).default;
        
        
        WebApp.openInvoice(invoiceLink, async (status) => {
          
          if (status === 'paid') {
          const gtTransaction = invoiceLink.transactionid
            try {
                        fetch('/api/create-buystar', {
                         method: 'POST',
                         headers: {
                           'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({ idd: String(UserDt?.idd),amount:String(setamount),transactionid:String(gtTransaction),forwhat: 'BuyTicket' }),
                       })
                       .then((res) => res.json())
                       .then((data) => {
                         if (data.success) {

                          try {
                                      fetch('/api/update-ticket', {
                                       method: 'POST',
                                       headers: {
                                         'Content-Type': 'application/json',
                                       },
                                       body: JSON.stringify({ idd: String(UserDt?.idd),ticket: String(plusticket) }),
                                     })
                                     .then((res) => res.json())
                                     .then((data) => {
                                       if (data.success) {
                                        new Toast({
                                          position: "top-center",
                                          toastMsg: `You're received ${cntgtticket}`,
                                          autoCloseTime: 4500,
                                          canClose: true,
                                          showProgress: true,
                                          pauseOnHover: true,
                                          pauseOnFocusLoss: true,
                                          type: "default",
                                          theme: "light"
                                        });
                                    setUserData({idd:String(UserDt?.idd),speedlvl:String(UserDt?.speedlvl),gtpoint:String(UserDt?.gtpoint),selectcharacter:String(UserDt?.selectcharacter),upgrade:String(UserDt?.upgrade),value:String(UserDt?.value),username:String(UserDt?.username),ticket:String(plusticket),firstname:String(UserDt?.firstname)})
                                    
                                      }
                                     })
                                   } catch (err) {
                                   }
                        
                        }
                       })
                     } catch (err) {
                      new Toast({
                        position: "top-center",
                        toastMsg: "An unexpected error occurred, please contact support team",
                        autoCloseTime: 4500,
                        canClose: true,
                        showProgress: true,
                        pauseOnHover: true,
                        pauseOnFocusLoss: true,
                        type: "default",
                        theme: "light"
                      });
                    }
            
            
          } else if (status === 'failed') {
               
            new Toast({
              position: "top-center",
              toastMsg: `Payment failed. Please try again.${invoiceLink.error} ${invoiceLink.errorData} ${gterror} `,
              autoCloseTime: 4500,
              canClose: true,
              showProgress: true,
              pauseOnHover: true,
              pauseOnFocusLoss: true,
              type: "default",
              theme: "light"
            });
          } else if (status === 'cancelled') {

            new Toast({
              position: "top-center",
              toastMsg: `Payment was cancelled by user`,
              autoCloseTime: 4500,
              canClose: true,
              showProgress: true,
              pauseOnHover: true,
              pauseOnFocusLoss: true,
              type: "default",
              theme: "light"
            });

          }
        });
      } catch (e) {
        
        new Toast({
          position: "top-center",
          toastMsg: `Failed to process purchase: ${e instanceof Error ? e.message : 'Unknown error'}`,
          autoCloseTime: 4500,
          canClose: true,
          showProgress: true,
          pauseOnHover: true,
          pauseOnFocusLoss: true,
          type: "default",
          theme: "light"
        });
      }
    };

    var cntup = 1

    const handleCopyLink = () => {
          const inviteLink = `/buytickets`
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

     const handleImoon = () => {
          if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp
          tg.ready()
             tg.openLink("https://imoon.casino/en?aff=b2c1001-1000775_0")     
          }
         }

    return (
        <div className=" flex justify-center overflow-y-auto">
         <div className="w-full h-screen bg-white flex-col ">
       
        <div className="w-full flex flex-col items-center text-center justify-center rounded-b-full bg-[#ffae19]/[0.9]">
        <div className="w-full flex text-center items-center justify-center rounded-b-full bg-white ">
       
        
         <div className="flex flex-col">
          <p className="text-[#ffae19]/[0.9] font-black text-base mt-1">Remaining Tickets</p>
          <p className="text-[#ffae19]/[0.9] font-Normal text-base mb-1">{Number(UserDt?.ticket).toLocaleString()}</p>
          </div>
        <hr className="border-2 border-[#ffae19]/[0.5] h-10 mr-2 ml-2" />
          <div className="flex flex-col">
          <p className="text-[#ffae19]/[0.9] font-black text-base mt-1">Used Tickets</p>
          <p className="text-[#ffae19]/[0.9] font-Normal text-base mb-1">{Number(usedticket).toLocaleString()}</p>


         </div>
        
       
        </div>

             <div className="flex mt-3 mb-3 items-center justify-center space-x-5">
            
                <div className="flex items-center justify-center space-x-2">
                
                <Image
            src={Time as StaticImageData}
          className="w-8 h-8 "
          alt=""
        />   
        <div className="flex flex-col items-center text-center">
        <p className="text-white font-black text-base">Time before draw</p>
        <p className="text-white font-Normal text-sm glow">{days}d {hours}h {minutes}m {seconds}s</p>
        </div>
                </div>


             </div>
            
        </div>
        <div className="flex items-center justify-center space-x-2">
                
                <Image
            src={Ton as StaticImageData}
          className="w-8 h-8 "
          alt=""
        />   
        <div className="flex flex-col space-y-1 text-center items-center">
        <p className="text-white font-black text-[15px] mt-2 bg-[#ffae19]/[0.9] rounded-full py-1 px-3">8 TON</p>
        <p className="text-black/[0.7] font-Normal text-sm glow">~${tonprice*8}</p>
        </div>

        {tonAddress ? (
        <div className="flex flex-col mt-2  items-center">
          <button
            onClick={handleImoon}
            className="bg-red-500 hover:bg-red-700 text-white text-[15px] font-bold py-2 px-4 rounded-full"
          >
            Disconnect Wallet
          </button>
          <p className="text-black/[0.9] mt-1 text-sm">Connected: {formatAddress(tonAddress)}</p>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-[15px] py-2 px-4 rounded-full"
        >
          Connect TON Wallet
        </button>
      )}
                </div>

         <div className="w-full flex flex-col text-center justify-center">

      <div className="flex mt-3 items-center justify-center space-x-2">
              

                <Image
            src={imoon as StaticImageData}
          className="w-24 h-24 rounded-lg border-black border-4  border-double aspect-square object-fit "
          alt=""
        />  
            
            <div className="flex flex-col items-center justify-center text-center">
                <p className="text-black/[0.7] font-black text-sm">Sponsor</p>

 <button
            onClick={() => {handleImoon()}}
            className="flex flex-col mt-1  bg-black text-center items-center justify-center text-white text-[15px] border-white border-4  border-double font-bold py-2 px-6 rounded-full"
          >
           
          <Image
            src={imoonsvg as StaticImageData}
          className="w-14 h-8 aspect-square object-fit "
          alt=""
        />    
         
              <p className="text-white font-black  text-[10px]">Join iMoon and Start Winning!</p>

          </button>
            </div>
     

                </div>

</div>


        <div className="flex w-full space-x-2 items-center justify-center mt-3">
           
        <div className="flex flex-col items-center text-center space-y-1">
          
        <Image
            src={First as StaticImageData}
          className="w-8 h-8 "
          alt=""
        />   
        <p className="text-white font-bold text-sm bg-[#ffae19]/[0.9] rounded-full py-1 px-2">3 TON</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-1">
          
        <Image
            src={Second as StaticImageData}
          className="w-8 h-8 "
          alt=""
        />   
        <p className="text-white font-bold text-sm bg-[#ffae19]/[0.9] rounded-full py-1 px-2">2 TON</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-1">
          
        <Image
            src={Third as StaticImageData}
          className="w-8 h-8 "
          alt=""
        />   
        <p className="text-white font-bold text-sm bg-[#ffae19]/[0.9] rounded-full py-1 px-2">2 TON</p>
        </div>

        <div className="flex flex-col items-center text-center space-y-1">
          
          <Image
              src={Fourth as StaticImageData}
            className="w-8 h-8 "
            alt=""
          />   
          <p className="text-white font-bold text-sm bg-[#ffae19]/[0.9] rounded-full py-1 px-2">1 TON</p>
          </div>
        </div>

        <div className="flex relative overflow-x-auto mt-4 space-x-2">
          <div className="w-1"/>
          <button onClick={() => setChsCtg(1)} className={`${chsCtg == 1 ? '' : 'opacity-70'} flex flex-grow  bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-2 py-[8px]`}>
                           
          
                                 <div className="flex-1 text-center">
                                 <div className="flex items-center space-x-1 justify-center">
                               
                            <p className=" text-white font-semibold text-base truncate">Raffles</p>
                                 </div>
                                 </div>
                                 </button>
                                 <button onClick={() => setChsCtg(2)} className={`${chsCtg == 2 ? '' : 'opacity-70'} flex flex-grow  bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-2 py-[8px]`}>
                           
          
                                 <div className="flex-1 text-center">
                                 <div className="flex items-center space-x-1 justify-center">
                               
                            <p className=" text-white font-semibold text-base truncate">Leaderboard</p>
                                 </div>
                                 </div>
                                 </button>

                                 <button onClick={() => setChsCtg(3)} className={`${chsCtg == 3 ? '' : 'opacity-70'} flex flex-grow  bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-2 py-[8px]`}>
                           
          
                                 <div className="flex-1 text-center">
                                 <div className="flex items-center space-x-1 justify-center">
                               
                            <p className=" text-white font-semibold text-base truncate">Winners</p>
                                 </div>
                                 </div>
                                 </button>

                                 <button onClick={() => setChsCtg(4)} className={`${chsCtg == 4 ? '' : 'opacity-70'} flex flex-grow  bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-2 py-[8px]`}>
                          
          
                                 <div className="flex-1 text-center">
                                 <div className="flex items-center space-x-1 justify-center">
                               
                            <p className=" text-white font-semibold text-base truncate">Transactions</p>
                                 </div>
                                 </div>
                                 </button>

                                 <div className="w-1"/>
        </div>

        {chsCtg == 1 ? (
        
        <div className="flex flex-col w-full">
          
          <center>
          <div className="w-[calc(100%-2rem)] flex items-center justify-center">
    <hr className="flex grow  my-8 bg-white border-2 border-dashed border-[#ffae19]/[0.9] dark:bg-white"/>
    <p className="text-black/[0.9] font-black text-base mr-2 ml-2 text-nowrap">Buy tickets - {Number(50000).toLocaleString()} WalkCoin each</p>
    <hr className="flex grow  my-8 bg-white border-2 border-dashed border-[#ffae19]/[0.9] dark:bg-white"/>

</div>
          </center>
      
          <div className="flex w-full   items-center   justify-center items-center">
               <div className="flex w-[calc(95%-2rem)]  bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-1 py-[3px] ">
                <Image 
                src={FootPrint as StaticImageData} 
              className="w-10 h-10 aspect-square object-cover"
              alt=""
            />
                      <div className="flex-grow text-center ">
                      <div className="flex flex-col items-center justify-center">
                      <p className=" text-white font-bold text-base mr-6 truncate">WalkCoin Balance</p>
                      <p className=" text-white font-Large  text-sm mr-6 truncate">{Number(UserDt?.gtpoint).toLocaleString()}</p>
                      </div>
                      </div>
                      </div>
               </div>
     
        <center>
        <div className="flex w-[calc(100%-2rem)] mt-1 items-center mb-2 justify-center">

        <Box sx={{ width:'80%', justifyContent: 'center' ,alignContent: 'center' }} >
        <Slider className="w-full"   size="medium"  color='warning' value={value}  onChange={handleSliderChange} min={0} defaultValue={0} max={ Number(((Number(UserDt?.gtpoint) - Number(50000)) /Number(50000)).toFixed()) } aria-label="default" valueLabelDisplay="auto" />

        <div className={`${Number(((Number(UserDt?.gtpoint) - Number(50000)) /Number(50000)).toFixed()) <= 0 ? 'w-0 h-0 text-[0px]' : 'flex w-full'}  justify-between`}>
        <p className={`${Number(((Number(UserDt?.gtpoint) - Number(50000)) /Number(50000)).toFixed()) <=0 ? 'w-0 h-0 text-[0px]' : 'text-[#ff7700]/[0.9] font-bold text-base  truncate'}`}>{0} min</p>
        <p className={`${Number(((Number(UserDt?.gtpoint) - Number(50000)) /Number(50000)).toFixed()) <=0 ? 'w-0 h-0 text-[0px]' : 'text-[#ff7700]/[0.9] font-bold text-base  truncate'}`}>{Number(((Number(UserDt?.gtpoint) - Number(50000)) /Number(50000)).toFixed())} max</p>

        </div>
           
         </Box>
       
        </div>
        <button onClick={() => {value == 0 ? '' : buyticketwithwalkcoin(rfrshvalue)}} className={`${value == 0? 'opacity-60' :''}  flex flex-grow mt-1 px-5 bg-[#ff7700]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px]`}>
                           
          
                <div className="flex-1 text-center">
                           <div className="flex items-center space-x-1 justify-center">
                         
                      <p className=" text-white font-bold  text-lg  truncate">Buy {value} {value <= 1? 'ticket' : 'tickets' }</p>
                           </div>
                           </div>
                           </button>
        </center>


        <div className="w-full mt-4  text-center  rounded-b-full items-center justify-center bg-white ">
        <center>
          <div className="w-[calc(100%-2rem)] flex items-center justify-center">
    <hr className="flex grow  my-1 bg-white border-2 border-dashed border-[#ffae19]/[0.9] dark:bg-white"/>
    <p className="text-black/[0.9] font-black text-base mr-3 ml-3 text-nowrap">Buy tickets with Star</p>
    <hr className="flex grow  my-1 bg-white border-2 border-dashed border-[#ffae19]/[0.9] dark:bg-white"/>

</div>
          </center>
          <center >
          <p className="text-black/[0.9] font-normal mt-1 text-sm mr-4 ml-4">You can buy tickets with Telegram stars in the WalkCoin bot by running the command /buytickets</p>
          <button onClick={() => handleCopyLink()} className="flex mt-2 flex-grow bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-2xl px-2 py-[4px] ">
                           <Image 
                           src={copy as StaticImageData} 
                         className="w-7 h-7 aspect-square object-cover"
                         alt="Shiba Inu"
                       />
                               <p className="text-white font-bold text-[15px] truncate mr-2 ml-2">Copy the command</p>
                                 </button>
          <p className="text-black/[0.9] font-bold text-sm mr-3 ml-3 mt-1">then click the button</p>
        <button onClick={() => {buyStar == 0 ? '' : handleOpenLink()}} className={`${buyStar == 0? 'opacity-60' :''} mt-1 flex flex-grow  px-8 bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl  px-2 py-[8px]`}>
                           
          
                           <div className="flex-1 text-center">
                                      <div className="flex items-center space-x-1 justify-center">
                                    
                                 <p className=" text-white font-black text-base truncate">{buyStar == 3 ? 'Buy 950 tickets | 150 Stars' : buyStar == 1 ? 'Buy 300 tickets | 50 Stars' : buyStar == 2 ? 'Buy 650 tickets | 100 Stars' : buyStar == 4 ? 'Buy 5 tickets | 1 Star' : buyStar == 5 ? 'Buy 50 tickets | 9 Stars' : buyStar == 6 ? 'Buy 100 tickets | 17 Stars' : 'Buy 0 tickets | 0 Stars'}</p>
                                      </div>
                                      </div>
                                      </button>
        </center> 



     
        <div className="flex w-full space-x-2 items-center justify-center mt-3">
           
           <div className={`${buyStar == 4 ? 'opacity-60' : ''} flex flex-col items-center text-center space-y-2`}>
             
             <div className="flex items-center ">
             <Image
               src={Ticket as StaticImageData}
             className="w-8 h-8 "
             alt=""
           />   

                      <p className="text-black/[0.8] font-black text-sm ml-1 ">x 5</p>
             </div>
          
             <Button onClick={() => setBuyStar(4)} className="flex items-center space-x-1 bg-[#ffae19]/[0.9] border-white border-4  border-double rounded-2xl py-2 px-2">
             <Image
               src={Star as StaticImageData}
             className="w-6 h-6 "
             alt=""
           />   

             <p className="text-white font-black text-[12px]  ">1 Star</p>

             </Button>

           </div>
   
           <div className={`${buyStar == 5 ? 'opacity-60' : ''} flex flex-col items-center text-center space-y-2`}>
             
             <div className="flex items-center ">
             <Image
               src={Ticket as StaticImageData}
             className="w-8 h-8 "
             alt=""
           />   

                      <p className="text-black/[0.8] font-black text-sm ml-1 ">x 50</p>
             </div>
          
             <Button onClick={() => setBuyStar(5)} className="flex items-center space-x-1 bg-[#ffae19]/[0.9] border-white border-4  border-double rounded-2xl py-2 px-2">
             <Image
               src={Star as StaticImageData}
             className="w-6 h-6 "
             alt=""
           />   

             <p className="text-white font-black  text-[12px]  ">9 Stars</p>

             </Button>

           </div>
   
           <div className={`${buyStar == 6 ? 'opacity-60' : ''} flex flex-col items-center text-center space-y-2`}>
             
             <div className="flex items-center ">
             <Image
               src={Ticket as StaticImageData}
             className="w-8 h-8 "
             alt=""
           />   

                      <p className="text-black/[0.8] font-black text-sm ml-1 ">x 100</p>
             </div>
          
             <Button onClick={() => setBuyStar(6)} className="flex items-center space-x-1 bg-[#ffae19]/[0.9] border-white border-4  border-double rounded-2xl py-2 px-2">
             <Image
               src={Star as StaticImageData}
             className="w-6 h-6 "
             alt=""
           />   

             <p className="text-white font-black  text-[12px] ">17 Stars</p>

             </Button>

           </div>
   
           
           </div>





        <center>
          <div className="w-[calc(100%-2rem)] flex items-center justify-center">
    <hr className="flex grow  my-8 bg-white border-2 border-dashed border-[#ffae19]/[0.9] dark:bg-white"/>
    <p className="text-black/[0.9] font-black text-base mr-3 ml-3 text-nowrap">Buy tickets with TON</p>
    <hr className="flex grow  my-8 bg-white border-2 border-dashed border-[#ffae19]/[0.9] dark:bg-white"/>

</div>
          </center>
        <center >
        <button onClick={() => handlePayment()} className={`  flex flex-grow  px-8 bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl  px-2 py-[8px]`}>
                           
          
                           <div className="flex-1 text-center">
                                      <div className="flex items-center space-x-1 justify-center">
                                    
                                 <p className=" text-white font-black text-base truncate">{buyTicket == 0 ? 'No tickets selected' : buyTicket == 1 ? 'Buy 100 tickets | 0.25 TON' : buyTicket == 2 ? 'Buy 250 tickets | 0.49 TON' : 'Buy 500 tickets | 0.74 TON'}</p>
                                      </div>
                                      </div>
                                      </button>
        </center>

        <div className="flex w-full space-x-2 items-center justify-center mt-4">
           
           <div className={`${buyTicket == 1 ? 'opacity-60' : ''} flex flex-col items-center text-center space-y-2`}>
             
             <div className="flex items-center ">
             <Image
               src={Ticket as StaticImageData}
             className="w-8 h-8 "
             alt=""
           />   

                      <p className="text-black/[0.8] font-black text-sm ml-1 ">x 100</p>
             </div>
          
             <Button onClick={() => setBuyTicket(1)} className="flex items-center space-x-1 bg-[#ffae19]/[0.9] border-white border-4  border-double rounded-2xl py-2 px-2">
             <Image
               src={Ton as StaticImageData}
             className="w-6 h-6 "
             alt=""
           />   

             <p className="text-white font-black text-[12px]  ">0.25 TON</p>

             </Button>

           </div>
   
           <div className={`${buyTicket == 2 ? 'opacity-60' : ''} flex flex-col items-center text-center space-y-2`}>
             
             <div className="flex items-center ">
             <Image
               src={Ticket as StaticImageData}
             className="w-8 h-8 "
             alt=""
           />   

                      <p className="text-black/[0.8] font-black text-sm ml-1 ">x 250</p>
             </div>
          
             <Button onClick={() => setBuyTicket(2)} className="flex items-center space-x-1 bg-[#ffae19]/[0.9] border-white border-4  border-double rounded-2xl py-2 px-2">
             <Image
               src={Ton as StaticImageData}
             className="w-6 h-6 "
             alt=""
           />   

             <p className="text-white font-black  text-[12px]  ">0.49 TON</p>

             </Button>

           </div>
   
           <div className={`${buyTicket == 3 ? 'opacity-60' : ''} flex flex-col items-center text-center space-y-2`}>
             
             <div className="flex items-center ">
             <Image
               src={Ticket as StaticImageData}
             className="w-8 h-8 "
             alt=""
           />   

                      <p className="text-black/[0.8] font-black text-sm ml-1 ">x 500</p>
             </div>
          
             <Button onClick={() => setBuyTicket(3)} className="flex items-center space-x-1 bg-[#ffae19]/[0.9] border-white border-4  border-double rounded-2xl py-2 px-2">
             <Image
               src={Ton as StaticImageData}
             className="w-6 h-6 "
             alt=""
           />   

             <p className="text-white font-black  text-[12px] ">0.74 TON</p>

             </Button>

           </div>
   
           
           </div>
           
           <center>
            {verifybuy ? (
  <div className=" w-full flex flex-col text-center items-center justify-center mt-5">
  <p className="w-[calc(90%-2rem)]  text-white bg-[#ffae19]/[0.9] rounded-full py-2 px-2 font-bold text-sm  wrap">*Your tickets will be added automatically after 30 minutes of your transaction being confirmed.</p>
  </div>
            ) :(<div/>)

            }
         
          <div className="w-[calc(100%-2rem)] mt-1 flex items-center justify-center">
    <hr className="flex grow  my-8 bg-white border-2 border-dashed border-[#ffae19]/[0.9] dark:bg-white"/>
    <p className="text-black/[0.9] font-black text-base mr-3 ml-3 text-nowrap">Use Tickets</p>
    <hr className="flex grow  my-8 bg-white border-2 border-dashed border-[#ffae19]/[0.9] dark:bg-white"/>

</div>
          </center>

           <div className="flex w-full   items-center  justify-center items-center">
               <div className="flex w-[calc(90%-2rem)]  bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-1 py-[3px] ">
                <Image 
                src={TicketWhite as StaticImageData} 
              className="w-10 h-10 aspect-square object-cover"
              alt=""
            />

                      <div className="flex-grow text-center ">
                      <div className="flex flex-col items-center justify-center">
                      <p className=" text-white font-bold text-base mr-6 truncate">Remaining Tickets</p>
                      <p className=" text-white font-Large  text-sm mr-6 truncate">{Number(Number(UserDt?.ticket) - ticket ) }</p>
                      </div>
                      </div>
                      </div>
               </div>

   
   <center>

   <div className="flex flex-col w-[calc(100%-2rem)] mt-1  items-center justify-center">

<Box sx={{ width:'80%', justifyContent: 'center' ,alignContent: 'center' }} >
<Slider className="w-full"   size="medium"  color='warning' value={ticket}  onChange={handleSliderChangeUseTicket} min={0} defaultValue={0} max={ Number(UserDt?.ticket) } aria-label="default" valueLabelDisplay="auto" />

<div className={`${Number(UserDt?.ticket) <= 0 ? 'w-0 h-0 text-[0px]' : 'flex w-full mb-1'} justify-between`}>
<p className={`${Number(UserDt?.ticket) <=0 ? 'w-0 h-0 text-[0px]' : 'text-[#ff7700]/[0.9] font-bold text-base  truncate'}`}>{0} min</p>
<p className={`${Number(UserDt?.ticket) <=0 ? 'w-0 h-0 text-[0px]' : 'text-[#ff7700]/[0.9] font-bold text-base  truncate'}`}>{Number(UserDt?.ticket)} max</p>

</div>
   
 </Box>
 
 <button onClick={() => {useticketbtn(rfrshuse)}} className={`${ticket == 0? 'opacity-60' :''}  flex flex-grow mt-1 px-5 bg-[#ff7700]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px]`}>
                           
          
                <div className="flex-1 text-center">
                           <div className="flex items-center space-x-1 justify-center">
                         
                      <p className=" text-white font-bold  text-lg  truncate">Use {ticket} {ticket <= 1? 'ticket' : 'tickets' }</p>
                           </div>
                           </div>
                           </button>


</div>

<div className=" w-full flex flex-col text-center items-center justify-center mt-3">
                      <p className="w-[calc(90%-2rem)]  text-white bg-[#ffae19]/[0.9] rounded-full py-2 px-2 font-bold text-sm  wrap">The more tickets you use, the higher your chances of winning!</p>
                      </div>
   </center>
               

                      

        </div>

        </div>

      ) : chsCtg == 2? (

      <div className="flex flex-col w-full">
        <center>
        <div className=" w-[calc(100%-2rem)] flex flex-col mt-4 text-center font-bold text-wrap">
          <center>
          <p className="w-[calc(100%-2rem)] text-[#ffae19]/[0.9]  font-Large text-base">Top 15 players who used the most tickets</p>

          </center>
              <p className="text-[#ffae19]/[0.8] font-normal text-sm  ">Remember that the tickets you used to participate will be reset after the draw.</p>

              <div className="flex w-full   items-center  justify-center items-center">
               <div className="flex w-[calc(100%-2rem)] mt-2  bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-1 py-[3px] ">
                <Image 
                src={Chance as StaticImageData} 
              className="w-10 h-10 aspect-square object-cover"
              alt=""
            />
                      <div className="flex-grow text-center ">
                      <div className="flex flex-col items-center justify-center">
                      <p className=" text-white font-bold text-base mr-6 truncate">Your chances of winning</p>
                      <p className=" text-white glow font-Large  text-sm mr-6 truncate">{chance.toFixed(2)}%</p>
                      </div>
                      </div>
                      </div>
               </div>
             
      </div>
        </center>
 
       
        <div className="relative overflow-x-auto mt-4 mr-1 ml-1  ">
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
            
            <p className="">Tickets</p>
            </div>
            </div>
            </div>
                        </th>
                    </tr>
                </thead>
                
                {gtBoard.map((task,index) => {
                  return(
                   <tbody key={index}>
                    <tr className=" text-black text-wrap text-sm">
                    <th scope="row" className="pl-5 px-2 text-wrap text-start text-sm  font-medium  whitespace-nowrap ">
                        {cntup++}
                    </th>
                    <td className="text-wrap text-start text-sm ">
                        {task.name}
                    </td>
                    <td className="px-6 py-4 text-[#ffae19]/[0.9] text-end text-wrap">
                    <div className="flex grow">
            
                  <div className="flex-1 text-center ">
                  <div className="flex items-center text-start justify-center space-x-2">
                  <Image 
            src={TicketWhite as StaticImageData} 
          className="w-6 h-6  glowbox rounded-full object-fit"
          alt="Shiba Inu"
        />
                  <p className=" text-[#ffae19]/[0.9] font-bold glow text-sm  text-wrap">{Number(task.ticket).toLocaleString()} </p>
                  </div>
                  </div>
                  </div>
                  
                    </td>
                    
                </tr>
                    
                </tbody>
                  )
                  }) }
                
            </table>
        </div>

      </div>


      ): chsCtg ==3? (

        <div className="flex flex-col w-full">
        <center>
        <div className=" w-[calc(100%-2rem)] flex flex-col mt-4 text-center font-bold text-wrap">
              <p className=" text-[#ffae19]/[0.9] font-Large text-base">Previous winners</p>
              <p className=" text-[#ffae19]/[0.8] font-normal text-sm ">Here is the list of past raffle winners, proof that luck isn't entirely a myth.</p>
             
      </div>
        </center>

        <div className="relative overflow-x-auto mt-4 mr-1 ml-1  ">
            <table className="w-full text-sm   text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase  bg-[#ffae19]/[0.9] border-white border-4  border-double ">
                    <tr>
                        <th scope="col" className="text-start px-6 py-3">
                        name
                        </th>
                        <th scope="col" className="">
                            date
                        </th>
                        
                        <th scope="col" className="px-6 py-3">
                        <div className="flex grow">
            
            <div className="flex-1 text-center ">
            <div className="flex items-center justify-center">
            
            <p className="">Prize</p>
            </div>
            </div>
            </div>
                        </th>
                    </tr>
                </thead>
                
                {gtWinner.map((task,index) => {
                  return(
                   <tbody key={index}>
                    <tr className=" text-black text-wrap text-sm">
                    <th scope="row" className="pl-5 px-2 text-sm text-black text-wrap  text-start font-normal  whitespace-nowrap ">
                    {task.name}
                    </th>

                    <td className="text-wrap text-black/[0.6] text-sm  font-bold  text-start">
                        
                        {new Date(task.date).toDateString()}
                    </td>
       
                    
                    

                    <td className="px-6 py-4 text-[#ffae19]/[0.9] text-end text-wrap">
                    <div className="flex grow">
            
                  <div className="flex-1 text-center ">
                  <div className="flex items-center text-start justify-center space-x-2">
                  <Image 
            src={Ton as StaticImageData} 
          className="w-6 h-6  glowblue rounded-full object-fit"
          alt="Shiba Inu"
        />
                  <p className=" text-[#0091ff]/[0.9] font-bold glow text-sm text-wrap">{Number(task.amount).toLocaleString()} TON </p>
                  </div>
                  </div>
                  </div>
                  
                    </td>
                    
                </tr>
                    
                </tbody>
                  )
                  }) }
                
            </table>
        </div>

        </div>
      ) : chsCtg == 4 ? (
        <div className="flex flex-col w-full">

        <center>
        <div className=" w-[calc(100%-2rem)] flex flex-col mt-4 text-center font-bold text-wrap">
              <p className=" text-[#ffae19]/[0.9] font-Large text-base">All your ton transactions</p>
              <p className=" text-[#ffae19]/[0.8] font-normal text-sm ">Here is a list of all transactions where you bought tickets with ton</p>
             
      </div>
        </center>

        <div className="relative overflow-x-auto mt-4 mr-1 ml-1  ">
            <table className="w-full text-sm   text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase  bg-[#ffae19]/[0.9] border-white border-4  border-double ">
                    <tr>
                        <th scope="col" className="text-start px-6 py-3">
                        date
                        </th>
                        <th scope="col" className="">
                        status
                        </th>
                        
                        <th scope="col" className="px-6 py-3">
                        <div className="flex grow">
            
            <div className="flex-1 text-center ">
            <div className="flex items-center justify-center">
            
            <p className="">amount</p>
            </div>
            </div>
            </div>
                        </th>
                    </tr>
                </thead>
                
                {gtTransaction.map((task,index) => {
                  return(
                   <tbody key={index}>
                    <tr className=" text-black text-wrap text-sm">
                    <th scope="row" className="pl-5 px-2 text-black text-wrap text-sm   text-start font-bold  whitespace-nowrap ">
                    {new Date(task.date).toDateString()}
                    </th>

                    <td className="text-wrap text-black/[0.6] font-bold text-sm   text-start">
                        
                        {task.status}
                    </td>
       
                    
                    

                    <td className="px-6 py-4 text-[#ffae19]/[0.9] text-end text-wrap">
                    <div className="flex flex-col space-y-2">
                    <div className="flex grow">
            
            <div className="flex-1 text-center ">
            <div className="flex items-center text-start justify-center space-x-2">
            <Image 
      src={TicketWhite as StaticImageData} 
    className="w-6 h-6  glowbx rounded-full object-fit"
    alt="Shiba Inu"
  />
            <p className=" text-[#ffae19]/[0.9] font-bold glow text-sm text-wrap">{Number(task.tickets).toLocaleString()} Tickets</p>
            </div>
            </div>
            </div>

                    <div className="flex grow">
            
            <div className="flex-1 text-center ">
            <div className="flex items-center text-start justify-center space-x-2">
            <Image 
      src={Ton as StaticImageData} 
    className="w-6 h-6  glowblue rounded-full object-fit"
    alt="Shiba Inu"
  />
            <p className=" text-[#0091ff]/[0.9] font-bold glow text-sm text-wrap">{Number(task.amount).toLocaleString()} TON </p>
            </div>
            </div>
            </div>
                    </div>
                 
                  
                    </td>
                    
                </tr>
                    
                </tbody>
                  )
                  }) }
                
            </table>
        </div>

        </div>

      ) : ( 
        <div />
      )
    }

        
       
          
        <div className="h-20 mt-5" />

         </div>
        </div>
    )
}

export default RaffleTab
