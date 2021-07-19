import React, { FC, useContext, useMemo, useReducer } from 'react'
export interface State {
  wallet?: number
  account?: string
  signMsg: string
  chainId?: string
  crypto: string
  cryptoPrice: number
  authOption: number
  ethPrice: number
  buyNowStatus: number
}

interface Props {}

const initialState = {
  wallet: null,
  account: null,
  signMsg: null,
  chainId: null,
  crypto: null,
  cryptoPrice: 0,
  authOption: null,
  ethPrice: 0,
  buyNowStatus: 0,
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

export const setWallet = (wallet?: number) => createAction('SET_WALLET', wallet)
export const setAccount = (account?: string) =>
  createAction('SET_ACCOUNT', account)
export const setChainId = (chainId?: string) =>
  createAction('SET_CHAIN_ID', chainId)
export const setCrypto = (crypto: string) => createAction('SET_CRYPTO', crypto)
export const setEthPrice = (price: number) =>
  createAction('SET_ETH_PRICE', price)
export const setCryptoPrice = (price: number) =>
  createAction('SET_CRYPTO_PRICE', price)
export const setSignMsg = (msg: string) => createAction('SET_SIGN_MSG', msg)
export const setAuthOption = (authOption: number) =>
  createAction('SET_AUTH_OPTION', authOption)
export const setBuyNowStatus = (status: number) =>
  createAction('SET_BUY_NOW_STATUS', status)

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
    case 'SET_ETH_PRICE': {
      return {
        ...state,
        ethPrice: action.payload,
      }
    }
    case 'SET_CRYPTO_PRICE': {
      return {
        ...state,
        cryptoPrice: action.payload,
      }
    }
    case 'SET_SIGN_MSG': {
      return {
        ...state,
        signMsg: action.payload,
      }
    }
    case 'SET_BUY_NOW_STATUS': {
      return {
        ...state,
        buyNowStatus: action.payload,
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
  const [state, dispatch] = useReducer<any>(mainReducer, initialState)

  const value = useMemo(
    () => ({
      ...(state as object),
      dispatch,
    }),
    [state]
  )

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}
