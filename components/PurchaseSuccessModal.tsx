'use client';


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
    <div className="fixed inset-0 bg-[#808080] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white  border-4 border-double border-[#ffae19]/[0.9] glowbox transform overflow-hidden rounded-3xl bg-white shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
       
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


      </div>
    </div>
  );
} 
