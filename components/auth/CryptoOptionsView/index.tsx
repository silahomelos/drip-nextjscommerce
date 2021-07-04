import { FC } from 'react'
import { Button, useUI } from '@components/ui'
import s from './styles.module.css'

interface Props {}

const CryptoOptionsView: FC<Props> = () => {
  const onCryptoOptionSelect = (option: number) => {}

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="text-center text-3xl font-bold">Crypto</h1>
      <p> Choose A Token To Swap For Fashion. </p>
      <div className="flex space-x-3">
        <div
          className={`text-center ${s.cryptoIcon}`}
          onClick={() => onCryptoOptionSelect(0)}
        >
          <img src="/cryptos/Rari.png" className="m-auto" />
          <span className="text-xs"> Rari </span>
        </div>
        <div
          className={`text-center ${s.cryptoIcon}`}
          onClick={() => onCryptoOptionSelect(1)}
        >
          <img src="/cryptos/Fei.png" className="m-auto" />
          <span className="text-xs"> Fei </span>
        </div>
        <div
          className={`text-center ${s.cryptoIcon}`}
          onClick={() => onCryptoOptionSelect(2)}
        >
          <img src="/cryptos/InstaDapp.png" className="m-auto" />
          <span className="text-xs"> InstaDapp </span>
        </div>
        <div
          className={`text-center ${s.cryptoIcon}`}
          onClick={() => onCryptoOptionSelect(3)}
        >
          <img src="/cryptos/Matic.png" className="m-auto" />
          <span className="text-xs"> Matic </span>
        </div>
        <div
          className={`text-center ${s.cryptoIcon}`}
          onClick={() => onCryptoOptionSelect(4)}
        >
          <img src="/cryptos/Pickle.png" className="m-auto" />
          <span className="text-xs"> Pickle </span>
        </div>
        <div
          className={`text-center ${s.cryptoIcon}`}
          onClick={() => onCryptoOptionSelect(5)}
        >
          <img src="/cryptos/Mona.png" className="m-auto" />
          <span className="text-xs"> Mona </span>
        </div>
        <div
          className={`text-center ${s.cryptoIcon}`}
          onClick={() => onCryptoOptionSelect(6)}
        >
          <img src="/cryptos/Force.png" className="m-auto" />
          <span className="text-xs"> Force </span>
        </div>
      </div>
    </div>
  )
}

export default CryptoOptionsView
