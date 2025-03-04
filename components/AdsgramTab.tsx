'use client'

import { useCallback, ReactElement } from 'react'
import { useAdsgram } from "./useAdsgram";
import { ShowPromiseResult } from "@/types/adsgram";
 
const Adsgram = () => {

    const onReward = useCallback(() => {
        alert('Reward');
      }, []);
      const onError = useCallback((result: ShowPromiseResult) => {
        alert(JSON.stringify(result, null, 4));
      }, []);
    
      /**
       * insert your-block-id
       */
      const showAd = useAdsgram({ blockId: "int-8537", onReward, onError });
    
      return (
        <button onClick={showAd}>Show Ad</button>
      )

}

export default Adsgram
