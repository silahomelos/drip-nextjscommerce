import { FC, useEffect } from 'react'
import cn from 'classnames'
import s from './styles.module.css'
import { setWeb3Provider } from 'services/web3-provider.service'
import { connectWallet } from 'services/network.service'
import { setAccount, setChainId, setWallet, useMain } from 'context'
import { toast } from 'react-toastify'
import { useUI } from '@components/ui'
import router from 'next/router'

interface Props {}

const CryptoSignUpView: FC<Props> = () => {
  const { closeModal, setModalView, openSidebar } = useUI()
  const { dispatch, account, chainId } = useMain()

  const btnClasses = cn(
    'rounded-xl w-80 border-2 border-black flex items-center px-10 py-1 justify-between',
    s.walletBtn
  )

  const onConnect = async (option: number) => {
    setWeb3Provider(option)
    try {
      if (!account) {
        const res = await connectWallet(option)
        dispatch(setWallet(option))
        dispatch(setAccount(res.account))
        dispatch(setChainId(res.chainId))
        window.localStorage.setItem('ACCOUNT', res.account)
        window.localStorage.setItem('CHAIN_ID', res.chainId)
        window.localStorage.setItem('WALLET', option.toString())
        router.push('/checkout-crypto')
      }
      closeModal()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="text-center text-3xl font-bold"> Sign In or Sign Up </h1>
      <p className="w-96 text-center m-10">
        {' '}
        Sign Up With The Same Email That You Used At Checkout To Claim Your NFT.{' '}
      </p>
      <div className={btnClasses} onClick={() => onConnect(2)}>
        <span> Venly Wallet </span>
        <img src="/images/arkane.png" className="w-11" />
      </div>
      <div className={btnClasses} onClick={() => onConnect(1)}>
        <span> Metamask </span>
        <img src="/images/metamask.png" className="w-11" />
      </div>
    </div>
  )
}

export default CryptoSignUpView
