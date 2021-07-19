import { FC } from 'react'
import { Button, useUI } from '@components/ui'
import { setAuthOption, useMain } from 'context'
import router from 'next/router'

interface Props {}

const AuthOptionsView: FC<Props> = () => {
  const { openSidebar, closeModal, setModalView } = useUI()
  const { dispatch, account, crypto } = useMain()
  const onOptionClick = (option: number) => {
    if (option === 0) {
      // setModalView('CRYPTO_OPTIONS_VIEW')
      // if (!account) {
      //   setModalView('CLAIM_YOUR_NFT_VIEW')
      // } else {
      //   closeModal()
      //   setModalView(null)
      //   openSidebar()
      // }
      dispatch(setAuthOption(0))
      if (!account) {
        setModalView('CLAIM_YOUR_NFT_VIEW')
      } else {
        closeModal()
        router.push('/checkout-crypto')
      }
    } else {
      setModalView('')
      openSidebar()
      closeModal()
      dispatch(setAuthOption(1))
    }
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="uppercase text-center text-3xl font-bold">
        {' '}
        start repping{' '}
      </h1>
      <p className="my-4">
        {' '}
        Take Your Drip Across The Realms. Claim Your NFT.{' '}
      </p>
      <Button variant="slim" width="200px" onClick={() => onOptionClick(0)}>
        <span className="uppercase">use crypto</span>
      </Button>
      <Button variant="slim" width="200px" onClick={() => onOptionClick(1)}>
        <span className="uppercase">use fiat</span>
      </Button>
    </div>
  )
}

export default AuthOptionsView
