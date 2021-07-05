import { FC } from 'react'
import { Button, useUI } from '@components/ui'
import s from './styles.module.css'

interface Props {}

const ClaimYourNFTView: FC<Props> = () => {
  const { setModalView } = useUI()

  const onClaim = () => {
    setModalView('CRYPTO_SIGNUP_VIEW')
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="uppercase text-center text-3xl font-bold">
        claim your nft!
      </h1>
      <p className="text-center">
        Sign Up With The Same Email That You Used At Checkout To Claim Your NFT.
      </p>
      <div className="relative w-full">
        <div className="w-full py-10">
          <div className={`${s.bar}`}></div>
        </div>
        <div className="absolute top-0 left-0 flex justify-around h-full w-full">
          <div className="border border-black flex items-center justify-center w-24 bg-white">
            Fashion
          </div>
          <div className="border border-black flex items-center justify-center w-24 bg-white">
            NFT
          </div>
          <div className="border border-black flex items-center justify-center w-24 bg-white">
            DeFi
          </div>
        </div>
      </div>
      <Button variant="slim" onClick={onClaim}>
        CLAIM NFT
      </Button>
    </div>
  )
}

export default ClaimYourNFTView
