'use client'

import {useContext} from "react"
import React from 'react';

type UserData = {
  idd: string;
  gtpoint: string;
  speedlvl:string;
  upgrade:string;
  selectcharacter:string;
  value:string,
  username:string
  }

  interface ContextProps {
    readonly userData: UserData | null;
    readonly setUserData: (userData: UserData) => void;
    readonly loadUserData: () => Promise<void>;
  }

export const NewUserContext = React.createContext<ContextProps>({
    userData: null,
    setUserData: () => null,
    loadUserData: async () => {},
  });

export function UserNew({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = React.useState<UserData | null>({idd:'',gtpoint:'0',speedlvl:'1',upgrade:'1',selectcharacter:'1',value:'0.00000001',username:''});

  const loadUserData = async () => {
    console.log('load')
  };

  const value = {
    userData,
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
