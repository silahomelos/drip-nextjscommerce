import { FC } from 'react'
import { Button, useUI } from '@components/ui'
import s from './styles.module.css'
import { setCrypto, useMain } from 'context'

interface Props {}

const CryptoOptionsView: FC<Props> = () => {
  const { setModalView } = useUI()
  const { dispatch } = useMain()
  const onCryptoOptionSelect = (option: number) => {
    dispatch(setCrypto(option))
    window.localStorage.setItem('CRYPTO_OPTION', option.toString())
    setModalView('CLAIM_YOUR_NFT_VIEW')
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="text-center text-3xl font-bold">Crypto</h1>
      <p> Choose A Token To Swap For Fashion. </p>
      <div>
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
            <img src="/cryptos/dai.png" className="m-auto" />
            <span className="text-xs"> Dai </span>
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
        <div className="flex justify-center space-x-3">
          <div
            className={`text-center ${s.cryptoIcon}`}
            onClick={() => onCryptoOptionSelect(7)}
          >
            <img src="/cryptos/aave.png" className="m-auto" />
            <span className="text-xs"> AAVE </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon}`}
            onClick={() => onCryptoOptionSelect(6)}
          >
            <img src="/cryptos/matic.png" className="m-auto" />
            <span className="text-xs"> MATIC </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon}`}
            onClick={() => onCryptoOptionSelect(6)}
          >
            <img src="/cryptos/ruller.png" className="m-auto" />
            <span className="text-xs"> RULLER </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon}`}
            onClick={() => onCryptoOptionSelect(6)}
          >
            <img src="/cryptos/bancor.png" className="m-auto" />
            <span className="text-xs"> BANCOR </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoOptionsView
