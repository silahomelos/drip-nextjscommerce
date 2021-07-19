import { FC } from 'react'
import { Button, useUI } from '@components/ui'
import s from './styles.module.css'
import { setCrypto, useMain } from 'context'
import { approveOrder } from 'services/order.service'

interface Props {}

const supportedCryptos = [
  {
    name: 'rari',
    caption: 'Rari',
    image: '/cryptos/Rari.png',
  },
  {
    name: 'fei',
    caption: 'Fei',
    image: '/cryptos/Fei.png',
  },
  {
    name: 'instadapp',
    caption: 'InstaDapp',
    image: '/cryptos/InstaDapp.png',
  },
  {
    name: 'dai',
    caption: 'Dai',
    image: '/cryptos/dai.png',
  },
  {
    name: 'pickle',
    caption: 'Pickle',
    image: '/cryptos/Pickle.png',
  },
  {
    name: 'mona',
    caption: 'Mona',
    image: '/cryptos/Mona.png',
  },
  {
    name: 'aave',
    caption: 'AAVE',
    image: '/cryptos/aave.png',
  },
  {
    name: 'matic',
    caption: 'MATIC',
    image: '/cryptos/matic.png',
  },
  {
    name: 'bancor',
    caption: 'BANCOR',
    image: '/cryptos/bancor.png',
  },
  {
    name: 'force',
    caption: 'Force',
    image: '/cryptos/Force.png',
  },
]

const CryptoOptionsView: FC<Props> = () => {
  const { setModalView } = useUI()
  const { dispatch, account, crypto, chainId } = useMain()
  const onCryptoOptionSelect = (option: string) => {
    dispatch(setCrypto(option))
    window.localStorage.setItem('CRYPTO_OPTION', option.toString())
    // setModalView('CLAIM_YOUR_NFT_VIEW')
  }

  const onApprove = () => {
    const promises = []
    const res = approveOrder({
      account,
      chainId,
      crypto,
    })
    promises.push(res)
  }

  const chunk = (arr: Array<any>, size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    )

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="text-center text-3xl font-bold">Crypto</h1>
      <p> Choose A Token To Swap For Fashion. </p>
      <div>
        {chunk(supportedCryptos, 6).map((group, index) => (
          <div
            key={`crypto-row-${index}`}
            className="flex justify-center space-x-3"
          >
            {group.map((cryptoItem) => {
              return (
                <div
                  key={cryptoItem.name}
                  className={`text-center ${s.cryptoIcon} ${
                    crypto === cryptoItem.name && s.selected
                  }`}
                  onClick={() => onCryptoOptionSelect(cryptoItem.name)}
                >
                  <img src={cryptoItem.image} className="m-auto" />
                  <span className="text-xs"> {cryptoItem.caption} </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div>
        <Button variant="slim" width="200px" onClick={onApprove}>
          <span className={`uppercase ${s.smallButton}`}>Approve Spend</span>
        </Button>
      </div>
    </div>
  )
}

export default CryptoOptionsView
