import React, { useState } from 'react'
import type { Purchase } from 'src/types/purchase.type'
import type { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface extendPurchasesProps extends Purchase {
  distable: boolean
  checked: boolean
}

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendPurchases: extendPurchasesProps[]
  setExtendPurchases: React.Dispatch<React.SetStateAction<extendPurchasesProps[]>>
  reset: () => void
}

const initialContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendPurchases: [],
  setExtendPurchases: () => null,
  reset: () => null
}

export const AppContext = React.createContext<AppContextInterface>(initialContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialContext.profile)
  const [extendPurchases, setExtendPurchases] = useState<extendPurchasesProps[]>(initialContext.extendPurchases)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setExtendPurchases([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendPurchases,
        setExtendPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
