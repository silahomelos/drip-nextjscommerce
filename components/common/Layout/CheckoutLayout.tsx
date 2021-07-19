import { CommerceProvider } from '@framework'
import { defaultPageProps } from '@lib/defaults'
import type { Page } from '@framework/common/get-all-pages'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import {
  AuthOptionsView,
  CryptoOptionsView,
  CryptoSignUpView,
  ForgotPassword,
  LoginView,
  SignUpView,
} from '@components/auth'
import { ClaimYourNFTView, NFTClaimedView } from '@components/modals'
import { Modal, useUI } from '@components/ui'
import { setAccount, setChainId, setCrypto, setWallet, useMain } from 'context'
import { setWeb3Provider } from 'services/web3-provider.service'
import CryptoSuccessView from '@components/modals/CryptoSuccessView'

interface Props {
  pageProps: {
    pages?: Page[]
    commerceFeatures: Record<string, boolean>
  }
}

const CheckoutLayout: FC<Props> = ({
  children,
  pageProps: { commerceFeatures, ...pageProps },
}) => {
  const { locale = 'en-US', pathname, asPath } = useRouter()
  const { displayModal, closeModal, modalView } = useUI()
  const { dispatch, wallet, account } = useMain()

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
    if (wallet && account) {
      setWeb3Provider(wallet)
    }
  }, [wallet, account])

  return (
    <CommerceProvider locale={locale}>
      <Navbar />
      {children}
      <Modal open={displayModal} onClose={closeModal}>
        {modalView === 'LOGIN_VIEW' && <LoginView />}
        {modalView === 'SIGNUP_VIEW' && <SignUpView />}
        {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        {modalView === 'AUTH_OPTIONS_VIEW' && <AuthOptionsView />}
        {modalView === 'CRYPTO_OPTIONS_VIEW' && <CryptoOptionsView />}
        {modalView === 'NFT_CLAIMED_VIEW' && <NFTClaimedView />}
        {modalView === 'CRYPTO_SIGNUP_VIEW' && <CryptoSignUpView />}
        {modalView === 'CLAIM_YOUR_NFT_VIEW' && <ClaimYourNFTView />}
        {modalView === 'CRYPTO_SUCCESS_VIEW' && <CryptoSuccessView />}
      </Modal>
      <Footer pages={pageProps.pages} />
    </CommerceProvider>
  )
}

export default CheckoutLayout
