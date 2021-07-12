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
import { ClaimYourNFTView, NFTClaimedView } from '@components/modals'
import { setAccount, setChainId, setCrypto, useMain } from 'context'

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
  } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US', pathname, asPath } = useRouter()
  const { dispatch } = useMain()

  useEffect(() => {
    if (window.localStorage.getItem('ACCOUNT')) {
      dispatch(setAccount(window.localStorage.getItem('ACCOUNT')))
      dispatch(setChainId(window.localStorage.getItem('CHAIN_ID')))
    }
    if (window.localStorage.getItem('CRYPTO_OPTION')) {
      dispatch(setCrypto(window.localStorage.getItem('CRYPTO_OPTION')))
    }
  }, [])

  const getMainWrapperClassName = () => {
    if (asPath.includes('marketplace')) {
      return s.marketplace
    }
    if (asPath.includes('minecraft')) {
      return s.collection2
    }
    return s.collection1
  }

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
          {modalView === 'CLAIM_YOUR_NFT_VIEW' && <ClaimYourNFTView />}
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
