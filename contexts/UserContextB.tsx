'use client'

import {useContext} from "react"
import React from 'react';

type UserDt = {
  idd: string;
  gtpoint: string;
  speedlvl:string;
  upgrade:string;
  selectcharacter:string;
  value:string,
  username:string
  }

  interface ContextProps {
    readonly UserDt: UserDt | null;
    readonly setUserData: (UserDt: UserDt) => void;
    readonly loadUserData: () => Promise<void>;
  }

export const NewUserContext = React.createContext<ContextProps>({
  UserDt: null,
    setUserData: () => null,
    loadUserData: async () => {},
  });

export function UserNew({ children }: { children: React.ReactNode }) {
    const [UserDt, setUserData] = React.useState<UserDt | null>({idd:'',gtpoint:'0',speedlvl:'1',upgrade:'1',selectcharacter:'1',value:'0.00000001',username:''});

  const loadUserData = async () => {
     if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp
            tg.ready()
    
            const initDataUnsafe = tg.initDataUnsafe || {}
            const prm = tg.initDataUnsafe.start_param|| ''
           
            if (initDataUnsafe.user) {
              fetch('/api/user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(initDataUnsafe.user),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.error) {
                 
                  } else {
                    setUserData({idd:String(data.idd),gtpoint:String(data.points),selectcharacter:String(data.selectcharacter),speedlvl:String(data.speedlvl),
                      upgrade:String(data.upgrade),username:String(data.username),value:String(data.tokenvalue)
                    })
    
                    if(prm.length > 0){
                      try {
                        fetch('/api/invitereferal', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ idd:String(prm),idb: String(data.idd),referal:String(prm) }),
                      })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.success) {
                          
                        } else {
                          
                        }
                      })
                    } catch (err) {
                    }
                    }
                    
                    
                  }
                })
                .catch((err) => {
                })
            } else {
              
            }
          } else {
           
          } 
  };

  const value = {
    UserDt,
    setUserData,
    loadUserData,
  };

  return (
    <NewUserContext.Provider value={value}>
      {children}
    </NewUserContext.Provider>
  );
}

export function reo() {
    const context = useContext(NewUserContext)
    if (context === undefined) {
        throw new Error('useTab must be used within a TabProvider')
    }
    return context
}
