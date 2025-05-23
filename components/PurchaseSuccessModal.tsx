'use client';

import Image, {StaticImageData} from "next/image"
import Extra from '@/imgs/extra.png';
import TicketCircle from '@/icons/whiteticket.svg';
import Star from '@/icons/star.svg';
import copy from '@/icons/copy.svg'
import FootPrint from '@/icons/footprint.svg';
import Close from '@/icons/close.svg';
import React,{useState} from 'react';


export default function PurchaseSuccessModal() {

     const [Itm, setItm] = useState<number>(0);
    
  return (
    <center>

<div className="fixed max-w-xl mx-auto inset-0 bg-[#808080] overflow-x-auto bg-opacity-50 h-screen   items-center z-40 justify-center p-2 ">
    <center>
    <div className="bg-white max-w-xl mx-auto   border-4 border-double  border-[#ffae19]/[0.9] glowbox transform  rounded-3xl bg-white shadow-xl  data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in  data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                               
                               <div className="h-2" />
                         
                               <div className="flex flex-col  items-center justify-center  mt-1 ">
                                                                   
                                                                        <Image 
                                                                  src={Close as StaticImageData} 
                                                                className="w-8 h-8 aspect-square object-cover"
                                                                alt=""
                                                              />
                                                                        </div>
                                                      <div className="sm:flex mt-2 sm:items-start">
                                                       
                                                        <div className=" w-full text-center  sm:ml-4 sm:text-left">
                                                          
                                                          <center>
                                                          <p  className="text-base font-semibold text-gray-900">
                                                          Need Extra WalkCoin ?
                                                          </p>
                                                          <div className="">
                                                            <p className="text-sm text-gray-500">
                                                            You can get additional WalkCoin tokens and raffle tickets every 2 hours 
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                            You can purchase each item once
                                                            </p>
                                                          </div>
                                                       </center>
                                                          
                                                        </div>
                                                      </div>
                                                    
                                                    <div className="h-3" />
                         
                                                     <div  className="flex flex-col justify-center   items-center ">
                                                                      
                                                                        <div className="flex items-center justify-center space-x-3">
                                                                        <button onClick={() => {setItm(1)}} className={`${Itm == 1 ? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
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
                                                          
                                                                        <button onClick={() => {setItm(2)}} className={`${Itm == 2 ? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
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
                                                                        <div className="flex items-center justify-center  space-x-3">
                                                                        <button onClick={() => {setItm(3)}} className={`${Itm == 3 ? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
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

                                                                        <button onClick={() => {setItm(4)}} className={`${Itm == 4 ? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                                            <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                                            <Image 
                                                                                      src={TicketCircle as StaticImageData} 
                                                                                    className="w-6 h-6 aspect-square object-cover"
                                                                                    alt="Shiba Inu"
                                                                                  />
                                                                                            <p className="text-white   font-bold glow text-sm px-5 ">+7</p>
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
                                                                              
                                                                                            <div className="flex ml-1 justify-center space-x-3  items-center  rounded-full ">
                                                                                            
                                                                                            
                                                                                           
                            
                                                                                            <button onClick={() => {setItm(5)}} className={`${Itm == 5 ? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                                            <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                                            <Image 
                                                                                      src={TicketCircle as StaticImageData} 
                                                                                    className="w-6 h-6 aspect-square object-cover"
                                                                                    alt="Shiba Inu"
                                                                                  />
                                                                                            <p className="text-white   font-bold glow text-sm px-4 ">+15</p>
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
                                                                                            
                                                                              
                                                                                            <button onClick={() => {setItm(6)}} className={`${Itm == 6 ? 'opacity-60' : ''} flex flex-col text-center bg-[#ffae19]/[0.9] text-white border-4 border-white rounded-xl border-double`}>
                                                                                            <div className="flex space-x-1.5 items-center justify-center px-2 py-0.5 mt-1 ">
                                                                                            <Image 
                                                                                      src={FootPrint as StaticImageData} 
                                                                                    className="w-6 h-6 aspect-square object-cover"
                                                                                    alt="Shiba Inu"
                                                                                  />
                                                                                            <p className="text-white   font-bold glow text-sm px-4  ">+25</p>
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
                                                                                            <div className="h-5" />
                                                                                            <div className="flex  justify-center space-x-2  items-center ">
                                                                              
                                                                              <button onClick={() => {}} className={`${Itm ==0?'opacity-60':''} bg-[#ffae19]/[0.9] glowbox  flex px-4 rounded-xl border-white border-4  border-double  py-[10px] items-center justify-center text-center`}>
                                                                               
                                                                               <p className="text-base text-white  font-bold">{Itm == 0 ? '' : 'Buy' } {Itm == 1 ? '+10,000 Extra WalkCoin' :Itm == 2 ? '+20,000 Extra WalkCoin' : Itm == 3 ? '+30,000 Extra WalkCoin' : Itm == 4 ? '+7 Extra Tickets': Itm == 5 ? '+15 Extra Tickets' : Itm == 6 ? '+25 Extra Tickets' : 'No Item Selected'}</p>
                                                                              <div className="w-1" />
                                                                              
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
                                                          
                                                           <p className="text-black/[0.7] font-normal w-[calc(100%-2rem)] text-sm">You can purchase the above items with Telegram stars in the WalkCoin bot by running the /extra command</p>
                                                 
                                                           </div>
                                                           <div className="h-20" /> 
    
                         
                               </div>
    </center>
      
    </div>

    </center>
    
  );
} 
