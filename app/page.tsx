'use client'

import { useEffect, useState } from 'react'
import { WebApp } from '@twa-dev/types'
import { TabProvider } from '@/contexts/TabContext'
import NavigationBar from "@/components/NavigationBar"
import TabContainer from "@/components/TabContainer"
import Script from 'next/script'
declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp
    }
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    try {
      fetch('/api/updatedt', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ idd: String("6124587322") }),
     })
     .then((res) => res.json())
     .then((data) => {
       if (data.success) {
        
       } else {
        
       }
     })
   } catch (err) {
   }

    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()

      const initData = tg.initData || ''
      const initDataUnsafe = tg.initDataUnsafe || {}

      
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
              setError(data.error)
            } else {
              setUser(data)
            }
          })
          .catch((err) => {
            setError('Failed to fetch user data')
          })
      } else {
        setError('No user data available')
      }
    } else {
      setError('This app should be opened in Telegram')
    }
  }, [])

  const handleIncreasePoints = async () => {
    if (!user) return

    try {
      const res = await fetch('/api/increase-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId: user.telegramId }),
      })
      const data = await res.json()
      if (data.success) {
        setUser({ ...user, points: data.points })
        setNotification('Points increased successfully!')
        setTimeout(() => setNotification(''), 3000)
      } else {
        setError('Failed to increase points')
      }
    } catch (err) {
      setError('An error occurred while increasing points')
    }
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <TabProvider>
       <>
      <Script src="https://sad.adsgram.ai/js/sad.min.js" strategy="afterInteractive" />
      </>
      <main className='main-h-screen bg-[#1d2025] text-white'>
        <TabContainer/>
        <NavigationBar/>
      </main>
    </TabProvider>
  )
}
