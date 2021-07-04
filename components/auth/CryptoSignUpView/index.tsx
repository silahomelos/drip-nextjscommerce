import { FC } from 'react'
import cn from 'classnames'
import s from './styles.module.css'

interface Props {}

const CryptoSignUpView: FC<Props> = () => {
  const btnClasses = cn(
    'rounded-xl w-80 border-2 border-black flex items-center px-10 py-1 justify-between',
    s.walletBtn
  )

  const onConnect = (option: number) => {
    if (option === 1) {
    } else {
    }
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="text-center text-3xl font-bold"> Sign In or Sign Up </h1>
      <p className="w-96 text-center m-10">
        {' '}
        Sign Up With The Same Email That You Used At Checkout To Claim Your NFT.{' '}
      </p>
      <div className={btnClasses} onClick={() => onConnect(0)}>
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
