import { FC } from 'react'
import { Button, useUI } from '@components/ui'
import { setAuthOption, useMain } from 'context'
import router from 'next/router'
import { useCart, useRemoveItem, useAddItem } from '@framework/cart'

interface Props {}

const AuthOptionsView: FC<Props> = () => {
  const { openSidebar, closeModal, setModalView } = useUI()
  const { data } = useCart()
  const { dispatch, account, crypto, productId, variantId } = useMain()
  const addItem = useAddItem()
  const removeItem = useRemoveItem()

  const onOptionClick = async (option: number) => {
    if (option === 0) {
      // setModalView('CRYPTO_OPTIONS_VIEW')
      // if (!account) {
      //   setModalView('CLAIM_YOUR_NFT_VIEW')
      // } else {
      //   closeModal()
      //   setModalView(null)
      //   openSidebar()
      // }
      if (data?.lineItems?.length || 0 > 1) {
        await Promise.all(
          data?.lineItems.map(async (item) => await removeItem(item)) || []
        )
      }
      await addItem({
        productId,
        variantId,
      })
      dispatch(setAuthOption(0))
      if (!account) {
        setModalView('CLAIM_YOUR_NFT_VIEW')
      } else {
        closeModal()
        router.push('/checkout-crypto')
      }
    } else {
      await addItem({
        productId,
        variantId,
      })
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
