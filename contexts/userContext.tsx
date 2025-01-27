'use client'

import {createContext,useContext} from "react"
import React from 'react';

interface UserContextType {
    idd: string;
    gtpoint: string;
    speedlvl:string;
    updateUser: (idd: string,
      gtpoint: string,
      speedlvl:string) => void;
  }

export const UserContext = React.createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserContextType>({
    idd: '6124587322',
    gtpoint: '101',
    speedlvl: '2',
    updateUser: (idd: string,
      gtpoint: string,
      speedlvl:string) => null,
  });
    return (
        <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
    )
}

export function re() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useTab must be used within a TabProvider')
    }
    return context
}
