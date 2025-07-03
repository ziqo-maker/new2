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
  username:string,
  ticket:string,
  firstname:string
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
    const [UserDt, setUserData] = React.useState<UserDt | null>({idd:'0',gtpoint:'0',speedlvl:'1',upgrade:'0',selectcharacter:'0',value:'0.00000001',username:'',ticket:'0',firstname:''});

  const loadUserData = async () => { };

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
