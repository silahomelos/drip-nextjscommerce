import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useUI } from '@components/ui/context'
import { Navbar, Footer, TextSlider } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Button, Modal, LoadingDots } from '@components/ui'
import CartSidebarView from '@components/cart/CartSidebarView'

import {
  LoginView,
  AuthOptionsView,
  CryptoOptionsView,
  CryptoSignUpView,
} from '@components/auth'
import { CommerceProvider } from '@framework'
import type { Page } from '@framework/common/get-all-pages'
import { NFTClaimedView } from '@components/modals'
import {
  setAccount,
  setChainId,
  setCrypto,
  setCryptoPrice,
  setEthPrice,
  setWallet,
  useMain,
} from 'context'
import { getPayableTokenReport } from 'services/api.service'
import { ETH_API_URL, tokens } from '../../../constants'
import { setWeb3Provider } from 'services/web3-provider.service'
import CheckoutWarning from '@components/modals/CheckoutWarning'
import { useCart } from '@framework/cart'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)

const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
)

interface Props {
  pageProps: {
    pages?: Page[]
    commerceFeatures: Record<string, boolean>
  }
}

const Layout: FC<Props> = ({
  children,
  pageProps: { commerceFeatures, ...pageProps },
}) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
    setModalView,
  } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { data } = useCart()
  const { locale = 'en-US', pathname, asPath } = useRouter()
  const { dispatch, crypto, chainId, cryptoPrice, wallet, account } = useMain()

  useEffect(() => {
    if (window.localStorage.getItem('ACCOUNT')) {
      dispatch(setAccount(window.localStorage.getItem('ACCOUNT') || ''))
    }
    if (window.localStorage.getItem('CHAIN_ID')) {
      dispatch(setChainId(window.localStorage.getItem('CHAIN_ID') || ''))
    }
    if (window.localStorage.getItem('CRYPTO_OPTION')) {
      dispatch(setCrypto(window.localStorage.getItem('CRYPTO_OPTION') || ''))
    }
    if (window.localStorage.getItem('WALLET')) {
      dispatch(
        setWallet(parseInt(window.localStorage.getItem('WALLET') || '0'))
      )
    }
  }, [])

  useEffect(() => {
    if (
      data?.lineItems.length === 0 &&
      window.localStorage.getItem('CHECKING_OUT', '0')
    ) {
      setModalView('CRYPTO_SUCCESS_VIEW')
      window.localStorage.setItem('CHECKING_OUT', '1')
    }
  }, [data?.lineItems.length])

  useEffect(() => {
    if (wallet && account) {
      setWeb3Provider(wallet)
    }
  }, [wallet, account])

  // useEffect(() => {
  //   if (crypto) {
  //     const fetchCryptoPrice = async () => {
  //       if (chainId && crypto) {
  //         const { payableTokenReport } = await getPayableTokenReport(
  //           tokens[crypto].address
  //         )
  //         const updatedPrice = payableTokenReport.payload / 1e18
  //         if (updatedPrice !== cryptoPrice) {
  //           dispatch(setCryptoPrice(updatedPrice))
  //         }
  //       }
  //     }

  //     fetchCryptoPrice()
  //     const interval = setInterval(fetchCryptoPrice, 10000)

  //     return () => clearInterval(interval)
  //   }
  // }, [crypto])

  const getMainWrapperClassName = () => {
    if (asPath.includes('marketplace')) {
      return s.marketplace
    }
    if (asPath.includes('minecraft')) {
      return s.collection2
    }
    if (asPath.includes('aave')) {
      return s.aave
    }
    if (asPath.includes('instadapp')) {
      return s.instadapp
    }
    if (asPath.includes('ruler')) {
      return s.ruler
    }
    if (asPath.includes('poap')) {
      return s.poap
    }
    if (asPath.includes('force')) {
      return s.force
    }
    if (asPath.includes('zerion')) {
      return s.zerion
    }
    if (asPath.includes('zapper')) {
      return s.zapper
    }
    if (asPath.includes('polygon')) {
      return s.polyon
    }
    if (asPath.includes('opyn')) {
      return s.opyn
    }
    if (asPath.includes('pickle')) {
      return s.pickle
    }
    if (asPath.includes('rari')) {
      return s.rari
    }
    if (asPath.includes('maker')) {
      return s.maker
    }
    if (asPath.includes('bancor')) {
      return s.bancor
    }
    return s.collection1
  }

  useEffect(() => {
    console.log(modalView)
  }, [modalView])

  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        <div
          id="mainWrapper"
          className={cn(s.mainWrapper, getMainWrapperClassName())}
        >
          {!pathname.includes('ambassadors') ? <Navbar /> : null}
          <main className="fit">{children}</main>
          {!pathname.includes('shippingandreturns') && <TextSlider black />}
        </div>
        <Footer pages={pageProps.pages} />

        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'LOGIN_VIEW' && <LoginView />}
          {modalView === 'SIGNUP_VIEW' && <SignUpView />}
          {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
          {modalView === 'AUTH_OPTIONS_VIEW' && <AuthOptionsView />}
          {modalView === 'CRYPTO_OPTIONS_VIEW' && <CryptoOptionsView />}
          {modalView === 'NFT_CLAIMED_VIEW' && <NFTClaimedView />}
          {modalView === 'CRYPTO_SIGNUP_VIEW' && <CryptoSignUpView />}
          {modalView === 'CHECKOUT_WARNING' && <CheckoutWarning />}
        </Modal>

        <Sidebar open={displaySidebar} onClose={closeSidebar}>
          <CartSidebarView />
        </Sidebar>

        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
