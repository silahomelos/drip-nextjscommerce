import React, { FC, useContext, useMemo, useReducer } from 'react'
export interface State {
  wallet: number
  account: string
  chainId: string
  crypto: number
  authOption: number
}

interface Props {}

const initialState = {
  wallet: null,
  account: null,
  chainId: null,
  crypto: null,
  authOption: null,
}

export const MainContext = React.createContext<State | any>(initialState)

MainContext.displayName = 'MainContext'
interface Action {
  type: string
  payload: any
}

function createAction(type: string, payload: any) {
  return {
    type,
    payload,
  }
}

export const setWallet = (wallet) => createAction('SET_WALLET', wallet)
export const setAccount = (account) => createAction('SET_ACCOUNT', account)
export const setChainId = (chainId) => createAction('SET_CHAIN_ID', chainId)
export const setCrypto = (crypto) => createAction('SET_CRYPTO', crypto)
export const setAuthOption = (authOption) =>
  createAction('SET_AUTH_OPTION', authOption)

function mainReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_WALLET': {
      return {
        ...state,
        wallet: action.payload,
      }
    }
    case 'SET_ACCOUNT': {
      return {
        ...state,
        account: action.payload,
      }
    }
    case 'SET_CHAIN_ID': {
      return {
        ...state,
        chainId: action.payload,
      }
    }
    case 'SET_CRYPTO': {
      return {
        ...state,
        crypto: action.payload,
      }
    }
    case 'SET_AUTH_OPTION': {
      return {
        ...state,
        authOption: action.payload,
      }
    }
  }
}

export const useMain = () => {
  const context = useContext(MainContext)
  if (context === undefined) {
    throw new Error('useMain must be used within MainProvider')
  }
  return context
}

export const MainProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state]
  )

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}
