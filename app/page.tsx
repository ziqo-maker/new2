  'use client'

  import { useEffect, useState } from 'react'
  import { WebApp } from '@twa-dev/types'
  import { TabProvider } from '@/contexts/TabContext'
  import NavigationBar from "@/components/NavigationBar"
  import TabContainer from "@/components/TabContainer"
  import { UserNew } from '@/contexts/UserContextB'

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

    useEffect(() => {

      const initWebApp = async () => {

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
                setError(data.error)
              } else {
                setUser(data)
                if(prm.length > 0){
                  try {
                    fetch('/api/invitereferal', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idd:"",idb: String("6435568801"),referal:String(prm) }),
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
              setError('Failed to fetch user data')
            })
        } else {
          setError('No user data available')
        }
      } else {
        setError('This app should be opened in Telegram')
      }

      };

      initWebApp();

    }, [])

    if (error) {
      return <div className="container mx-auto p-4 text-red-500">{error}</div>
    }

    if (!user) return <div className="container mx-auto p-4">Loading...</div>

    return (
      <UserNew>
    
  <TabProvider>
        <main className='main-h-screen bg-white '>
          <TabContainer/>
          <NavigationBar/>
        </main>
      </TabProvider>
  
      </UserNew>
      
    )
  }
