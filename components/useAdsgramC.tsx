import { useCallback, useEffect, useRef } from 'react';
/**
 * Check Typescript section
 * and use your path to adsgram types
 */
import type { AdController, ShowPromiseResult } from '@/types/adsgram';

export interface useAdsgramParams {
  blockId: string;
  onRewardC?: () => void;
  onError?: (result: ShowPromiseResult) => void;
}

export function useAdsgramC({ blockId, onRewardC, onError }: useAdsgramParams): () => Promise<void> {
  const AdControllerRef = useRef<AdController | undefined>(undefined);

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({ blockId, debug: false, debugBannerType: 'FullscreenMedia' });
  }, [blockId]);

  return useCallback(async () => {
    if (AdControllerRef.current) {
      AdControllerRef.current
        .show()
        .then(() => {
          // user watch ad till the end or close it in interstitial format
          onRewardC?.();
        })
        .catch((result: ShowPromiseResult) => {
          // user get error during playing ad
          onError?.(result);
        });
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      });
    }
  }, [onError, onRewardC]);
}