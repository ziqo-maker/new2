'use client'

import Image, {StaticImageData} from "next/image"
import FootPrint from '@/icons/footprint.svg';
import React, { useContext,useState,useCallback,useEffect } from 'react';
import { NewUserContext } from '@/contexts/UserContextB';
import Ton from '@/imgs/ton.png';
import Time from '@/icons/time.svg';
import First from '@/icons/first.svg';
import Second from '@/icons/second.svg';
import Third from '@/icons/third.svg';
import Fourth from '@/imgs/fourth.png';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useTonClient } from './useTonClient';
import { useTonConnectUI,SendTransactionRequest } from "@tonconnect/ui-react";
import {
  Address,
  beginCell,
  Cell,
  loadMessage,
  storeMessage,
  Transaction,
} from "@ton/core";
import { TonClient } from "@ton/ton";
import { getHttpEndpoint } from '@orbs-network/ton-access';

// const transaction: SendTransactionRequest = {
//   validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
//   messages: [
//     {
//       address:
//         "0QD-SuoCHsCL2pIZfE8IAKsjc0aDpDUQAoo-ALHl2mje04A-", // message destination in user-friendly format
//       amount: "20000", // Toncoin in nanotons
      
//     },
//   ],
// };

const defaultTx: SendTransactionRequest = {
  // The transaction is valid for 10 minutes from now, in unix epoch seconds.
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [
    {
      // The receiver's address.
      address: "0QA0VRQbT9KhtYIdLHi8pxNT0MaNVBef3U347s1vnrlaW_O1",
      // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
      amount: "5000000",
      // (optional) State initialization in boc base64 format.
      stateInit:
        "te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==",
      // (optional) Payload in boc base64 format.
      payload: "te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==",
    },

  
  ],
};


interface WaitForTransactionOptions {
  address: string;
  hash: string;
  refetchInterval?: number;
  refetchLimit?: number;
}

const waitForTransaction = async (
  options: WaitForTransactionOptions,
  client: TonClient
): Promise<Transaction | null> => {
  const { hash, refetchInterval = 1000, refetchLimit, address } = options;

  return new Promise((resolve) => {
    let refetches = 0;
    const walletAddress = Address.parse(address);
    const interval = setInterval(async () => {
      refetches += 1;

      console.log("waiting transaction...");
      const state = await client.getContractState(walletAddress);
      if (!state || !state.lastTransaction) {
        clearInterval(interval);
        resolve(null);
        return;
      }
      const lastLt = state.lastTransaction.lt;
      const lastHash = state.lastTransaction.hash;
      const lastTx = await client.getTransaction(
        walletAddress,
        lastLt,
        lastHash
      );

      if (lastTx && lastTx.inMessage) {
        const msgCell = beginCell()
          .store(storeMessage(lastTx.inMessage))
          .endCell();

        const inMsgHash = msgCell.hash().toString("base64");
        console.log("InMsgHash", inMsgHash);
        if (inMsgHash === hash) {
          clearInterval(interval);
          resolve(lastTx);
        }
      }
      if (refetchLimit && refetches >= refetchLimit) {
        clearInterval(interval);
        resolve(null);
      }
    }, refetchInterval);
  });
};





const RaffleTab = () => {

  const [tx, setTx] = useState(defaultTx);
  const [finalizedTx, setFinalizedTx] = useState<Transaction | null>(null);
  const [msgHash, setMsgHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { client } = useTonClient();
  const [tonConnectUI,setOptions] = useTonConnectUI()
  const [tonAddress, setTonAddress] = useState<string | null>(null);
  const { UserDt,setUserData,loadUserData } = React.useContext(NewUserContext);
  const [value, setValue] = React.useState(0);
  const [mx, setMx] = React.useState(Number(((Number(UserDt?.gtpoint) - Number(50000)) /Number(50000)).toFixed()));
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  interface CollectionMetadata {
    name: string;
    description: string;
    image: string;
}
  
  useEffect(() => {

    
    const handleAd = async () => {
      try {
        const result = await tonConnectUI.sendTransaction(tx);
        
        setLoading(true);
        setError("Loading")
        const hash = Cell.fromBase64(result.boc)
          .hash()
          .toString("base64");

        const message = loadMessage(
          Cell.fromBase64(result.boc).asSlice()
        );
        setError(message.body.hash().toString("hex"))
        console.log("Message:", message.body.hash().toString("hex"));
        setMsgHash(hash);

        if (client) {
          const txFinalized = await waitForTransaction(
            {
              address: tonConnectUI.account?.address ?? "",
              hash: hash,
            },
            client
          );
          setFinalizedTx(txFinalized);
        }
      } catch (e) {
        setError(String(e))
        console.error(e);
        
      } finally {
        setError("false")
        setLoading(false);
      }
    }

    handleAd();


    },[error])

  const handleWalletConnection = useCallback((address: string) => {
    setTonAddress(address);
    console.log("Wallet connected successfully!");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonAddress(null);
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
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
      setIsLoading(true);
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

  function decodeCell(cell: any): string {
    let slice = cell.beginParse();
    slice.loadUint(8); // Skip the first byte
    return slice.loadStringTail();
}
  
  const [metadata, setMetadata] = useState<CollectionMetadata | null>(null);
  const [mintPrice, setMintPrice] = useState<string>('0');

  


  const handleMint = async () => {

    try {
        setIsLoading(true);

        const mintCost = 5000000 // Adding gas fees

        const result=  await tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: "0QA0VRQbT9KhtYIdLHi8pxNT0MaNVBef3U347s1vnrlaW_O1",
                    amount: "5000000",
                    payload: beginCell().storeUint(0, 32).storeStringTail("Mint").endCell().toBoc().toString('base64'),
                },
            ],
        });

        
        setLoading(true);
        const hash = Cell.fromBase64(result.boc)
          .hash()
          .toString("base64");

        // const message = loadMessage(
        //   Cell.fromBase64(result.boc).asSlice()
        // );
        // console.log("Message:", message.body.hash().toString("hex"));
        // setMsgHash(hash);

        if (client) {
          const txFinalized = await waitForTransaction(
            {
              address: tonConnectUI.account?.address ?? "",
              hash: "",
            },
            client
          );
          setFinalizedTx(txFinalized);
        }

        alert('Minting transaction sent successfully!');
    } catch (error) {
        console.error('Error minting:', error);
        alert('Error minting. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className=" flex justify-center overflow-auto">
         <div className="w-full h-screen bg-white flex-col ">
       
        <div className="w-full flex flex-col items-center rounded-b-full bg-[#ffae19]/[0.9]">
        <div className="w-full  text-center rounded-b-full bg-white ">
        <p className="text-[#ffae19]/[0.9] font-black text-xl mt-1">Ticket Balance</p>
        <p className="text-[#ffae19]/[0.9] font-Normal text-base mb-1">10</p>
        </div>

             <div className="flex mt-3 mb-3 items-center justify-center space-x-5">
             <div className="flex items-center justify-center space-x-2">
                
                <Image
            src={Ton as StaticImageData}
          className="w-8 h-8 "
          alt=""
        />   
        <div className="flex flex-col items-center text-center">
        <p className="text-white font-black text-lg">8 TON</p>
        <p className="text-white/[0.8] font-Normal text-sm glow">~$37.00</p>
        </div>
                </div>
                
                <hr className="border-2 h-9 border-white"></hr>

                <div className="flex items-center justify-center space-x-2">
                
                <Image
            src={Time as StaticImageData}
          className="w-8 h-8 "
          alt=""
        />   
        <div className="flex flex-col items-center text-center">
        <p className="text-white font-black text-lg">Time before draw</p>
        <p className="text-white font-Normal text-sm glow">00:00:00</p>
        </div>
                </div>


             </div>
            
        </div>

        <div className="flex w-full space-x-2 items-center justify-center mt-2">
           
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

        <div className="flex w-full space-x-2 items-center justify-center mt-4">
          <div className="w-1"/>
          <button onClick={() => {}} className="flex flex-grow  bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px] ">
                           
          
                                 <div className="flex-1 text-center">
                                 <div className="flex items-center space-x-1 justify-center">
                               
                            <p className=" text-white font-semibold text-lg truncate">Raffles</p>
                                 </div>
                                 </div>
                                 </button>
                                 <button onClick={() => {}} className="flex flex-grow bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px] ">
                           
          
                                 <div className="flex-1 text-center">
                                 <div className="flex items-center space-x-1 justify-center">
                               
                            <p className=" text-white font-semibold text-lg truncate">Leaderboard</p>
                                 </div>
                                 </div>
                                 </button>

                                 <button onClick={() => {}} className="flex flex-grow  bg-[#ffae19]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px] ">
                           
          
                                 <div className="flex-1 text-center">
                                 <div className="flex items-center space-x-1 justify-center">
                               
                            <p className=" text-white font-semibold text-lg truncate">Winners</p>
                                 </div>
                                 </div>
                                 </button>

                                 <div className="w-1"/>
        </div>
        <div className="flex-col w-full space-x-2 items-center justify-center mt-2">
        <div className="w-full  text-center rounded-b-full bg-white ">
        <p className="text-[#ffae19]/[0.9] font-bold text-lg mt-1">Buy tickets - {Number(50000).toLocaleString()} WalkCoin each</p>
          <div className="flex w-full   items-center mt-2  justify-center items-center">
               <div className="flex w-[calc(80%-2rem)]  bg-[#ffae19]/[0.9] border-white border-4 border-double items-center  text-wrap  rounded-full px-1 py-[3px] ">
                <Image 
                src={FootPrint as StaticImageData} 
              className="w-10 h-10 aspect-square object-cover"
              alt=""
            />
                      <div className="flex-grow text-center ">
                      <div className="flex flex-col items-center justify-center">
                      <p className=" text-white font-bold text-base mr-6 truncate">Remaining WalkCoin</p>
                      <p className=" text-white font-Large  text-sm mr-6 truncate">{Number(UserDt?.gtpoint).toLocaleString()}</p>
                      </div>
                      </div>
                      </div>
               </div>
        </div>
        <center>
        <div className="flex w-[calc(100%-2rem)] mt-3 items-center justify-center">

        <Box sx={{ width:'60%', justifyContent: 'center' ,alignContent: 'center' }} >
        <Slider className="w-full"   size="medium"  color='warning' value={value}  onChange={handleSliderChange} min={0} defaultValue={0} max={ mx } aria-label="default" valueLabelDisplay="auto" />

        <div className="flex w-full justify-between">
        <p className=" text-[#ff7700]/[0.9] font-bold text-base  truncate">{0} min</p>
        <p className=" text-[#ff7700]/[0.9] font-bold text-base  truncate">{mx} max</p>

        </div>
           
         </Box>
       
        </div>
        <button onClick={() => {}} className={`${value == 0? 'opacity-60' :''}  flex flex-grow mt-2 px-5 bg-[#ff7700]/[0.9] border-white border-4  border-double items-center justify-center text-center text-wrap  rounded-2xl px-1 py-[8px]`}>
                           
          
                <div className="flex-1 text-center">
                           <div className="flex items-center space-x-1 justify-center">
                         
                      <p className=" text-white font-bold  text-lg  truncate">Buy {value} ticket</p>
                           </div>
                           </div>
                           </button>
        </center>
        {tonAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Connected: {formatAddress(tonAddress)}</p>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect TON Wallet
        </button>
      )}


        </div>
        <button
            className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={
              handleMint
            }
          >
              {loading ? "Loading..." : "Send transaction"}
            <div> Tx Message Hash: {msgHash}</div>
            <div> Tx Hash: {finalizedTx?.hash().toString("hex")}</div>
          </button>
          
        <div className="h-20 mt-5" />

         </div>
        </div>
    )
}

export default RaffleTab
