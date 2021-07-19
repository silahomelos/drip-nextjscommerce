import { FC, useEffect, useState } from 'react'
import { Button, useUI } from '@components/ui'
import s from './styles.module.css'
import { setBuyNowStatus, setCryptoPrice, useMain } from 'context'
import { approveToken } from 'services/order.service'
import { tokens } from '../../../constants'
import { getPayableTokenReport } from 'services/api.service'
import router from 'next/router'

interface Props {}

const CryptoOptionsView: FC<Props> = () => {
  const { setModalView, closeModal } = useUI()
  const { dispatch, account, chainId, buyNowStatus, cryptoPrice } = useMain()
  const [crypto, setCrypto] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [approved, setApproved] = useState(false)
  const onCryptoOptionSelect = (option: string) => {
    // dispatch(setCrypto(option))
    setCrypto(option)
    window.localStorage.setItem('CRYPTO_OPTION', option.toString())
    // setModalView('CLAIM_YOUR_NFT_VIEW')
  }

  useEffect(() => {
    if (crypto.length) {
      const fetchCryptoPrice = async () => {
        const { payableTokenReport } = await getPayableTokenReport(
          tokens[crypto].address
        )

        const updatedPrice = payableTokenReport.payload / 1e18
        if (updatedPrice !== cryptoPrice) {
          dispatch(setCryptoPrice(updatedPrice))
        }
      }

      fetchCryptoPrice()
    }
  }, [crypto])

  useEffect(() => {
    if (buyNowStatus === 2) {
      dispatch(setBuyNowStatus(0))
      setLoading(false)
      setModalView('')
      closeModal()
      router.push('/marketplace')
    }
  }, [buyNowStatus])

  const onApprove = async () => {
    if (!approved) {
      try {
        setLoading(true)
        await approveToken({
          account,
          crypto,
          cryptoPrice,
        })
        setApproved(true)
        setLoading(false)
      } catch (err) {
        console.log(err)
        throw err
      }
    } else {
      dispatch(setBuyNowStatus(1))
      setLoading(true)
    }
  }

  return (
    <div className="flex flex-col space-y-3 items-center">
      <h1 className="text-center text-3xl font-bold">Crypto</h1>
      <p> Choose A Token To Swap For Fashion. </p>
      <div>
        <div className="flex space-x-3">
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'rari' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('rari')}
          >
            <img src="/cryptos/Rari.png" className="m-auto" />
            <span className="text-xs"> Rari </span>
          </div>
          {/* <div
            className={`text-center ${s.cryptoIcon}`}
            onClick={() => onCryptoOptionSelect('fei')}
          >
            <img src="/cryptos/Fei.png" className="m-auto" />
            <span className="text-xs"> Fei </span>
          </div> */}
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'instadapp' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('instadapp')}
          >
            <img src="/cryptos/InstaDapp.png" className="m-auto" />
            <span className="text-xs"> InstaDapp </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'dai' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('dai')}
          >
            <img src="/cryptos/dai.png" className="m-auto" />
            <span className="text-xs"> Dai </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'pickle' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('pickle')}
          >
            <img src="/cryptos/Pickle.png" className="m-auto" />
            <span className="text-xs"> Pickle </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'mona' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('mona')}
          >
            <img src="/cryptos/Mona.png" className="m-auto" />
            <span className="text-xs"> Mona </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'aave' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('aave')}
          >
            <img src="/cryptos/aave.png" className="m-auto" />
            <span className="text-xs"> AAVE </span>
          </div>
        </div>
        <div className="flex justify-center space-x-3">
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'matic' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('matic')}
          >
            <img src="/cryptos/Matic.png" className="m-auto" />
            <span className="text-xs"> MATIC </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'bancor' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('bancor')}
          >
            <img src="/cryptos/bancor.png" className="m-auto" />
            <span className="text-xs"> BANCOR </span>
          </div>
          <div
            className={`text-center ${s.cryptoIcon} ${
              crypto === 'force' && s.selected
            }`}
            onClick={() => onCryptoOptionSelect('force')}
          >
            <img src="/cryptos/Force.png" className="m-auto" />
            <span className="text-xs"> Force </span>
          </div>
        </div>
      </div>
      <Button
        variant="slim"
        onClick={onApprove}
        disabled={!crypto.length && cryptoPrice === 0.0}
        loading={loading}
      >
        {!approved ? 'Approve Spend' : 'Purchase Item'}
      </Button>
    </div>
  )
}

export default CryptoOptionsView
