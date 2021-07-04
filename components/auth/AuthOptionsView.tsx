import { FC } from 'react'
import { Button, useUI } from '@components/ui'

interface Props {}

const AuthOptionsView: FC<Props> = () => {
  const { openSidebar, closeModal, setModalView } = useUI()
  const onOptionClick = (option: number) => {
    if (option === 0) {
    } else {
      setModalView('')
      closeModal()
      openSidebar()
    }
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="uppercase text-center text-3xl font-bold">
        {' '}
        start reppling{' '}
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
