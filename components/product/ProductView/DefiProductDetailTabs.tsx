import { FC, useState } from 'react'
import s from './ProductView.module.scss'

import { Tabs, Tab } from '@components/ui'
import { useRouter } from 'next/router'

interface Props {
  description: string
  title: string
}

const info: {
  [key: string]: {
    icon?: string
    globe?: string
    twitter?: string
    discord?: string
  }
} = {
  aave: {
    icon: '/cryptos/aave.png',
    globe: 'https://aave.com/',
    twitter: 'https://twitter.com/aaveaave',
    discord: 'https://aave.com/discord',
  },
  instadapp: {
    icon: '/cryptos/InstaDapp.png',
    globe: 'https://instadapp.io/',
    twitter: 'https://twitter.com/instadapp',
    discord: 'https://discord.com/invite/C76CeZc',
  },
  rulerprotocol: {
    icon: '/cryptos/ruler.png',
    globe: 'https://rulerprotocol.com/',
    twitter: 'https://twitter.com/RulerProtocol',
    discord: 'https://discord.com/invite/XcAQKg2YGP',
  },
  poap: {
    icon: '/cryptos/poap.png',
    globe: 'https://poap.xyz/',
    twitter: 'https://twitter.com/poapxyz',
    discord: 'https://discord.gg/9s8U8Bn',
  },
  forcedao: {
    icon: '/cryptos/Force.png',
    globe: 'https://www.forcedao.com/',
    twitter: 'https://twitter.com/force_dao',
    discord: 'http://discord.gg/xqxp2SNPwm',
  },
  zerion: {
    icon: '/cryptos/zerion.png',
    globe: 'https://zerion.io/',
    twitter: 'https://twitter.com/zerion_io',
    discord: 'https://discord.com/invite/B4kjkgv',
  },
  zapper: {
    icon: '/cryptos/Zapper.png',
    globe: 'https://zapper.fi/',
    twitter: 'https://twitter.com/zapper_fi',
    discord: 'https://discordapp.com/invite/h6CGbuN',
  },
  polygon: {
    icon: '/cryptos/Matic.png',
    globe: 'https://polygon.technology/',
    twitter: 'https://twitter.com/0xPolygon',
    discord: 'https://discord.gg/polygon',
  },
  opyn: {
    icon: '/cryptos/opyn.png',
    globe: 'https://www.opyn.co/',
    twitter: 'https://twitter.com/opyn_',
    discord: 'https://discord.com/invite/2NFdXaE',
  },
  picklefinance: {
    icon: '/cryptos/Pickle.png',
    globe: 'https://pickle.finance/',
    twitter: 'https://twitter.com/picklefinance',
    discord: 'https://discord.gg/uG6WhYkM8n',
  },
  rari: {
    icon: '/cryptos/Rari-logo@10x 1.png',
    globe: 'https://www.rari.capital/',
    twitter: 'https://twitter.com/RariCapital',
    discord: 'https://discord.gg/mtb6W57Ap6',
  },
  maker: {
    icon: '/cryptos/Maker.png',
    globe: 'https://makerdao.com/en/',
    twitter: 'https://twitter.com/MakerDAO',
  },
  bancor: {
    icon: '/cryptos/bancor.png',
    globe: 'https://bancor.network/',
    twitter: 'https://twitter.com/Bancor',
    discord: 'https://discord.gg/CAm3Ncyrxk',
  },
  fei: {
    icon: '/cryptos/Fei.png',
    globe: 'https://fei.money/',
    twitter: 'https://twitter.com/feiprotocol',
    discord: 'https://discord.com/invite/2prhYdQ5jP',
  },
}

const designers = [
  'QmeDMVjLR9ZdHiHcUtyK9v623WAZtk5L21rT1inJcV6jES',
  'QmXy1644mEhtz3a45NQoG2EYog9VoEekySb5v9cu3XRTao',
  'QmSDMo73zKtn8GNAbtpDTBAo5LA9CDWAYyymrQ66jV1qsy',
  'QmTDmSfjGcHdffrFFukr3XL7QPEcw9TDvXaXdkqJBdjt7f',
  'QmZAbCduSE23mcXWjWzyc9Qq6owHb51etvcf28krit3fAn',
  'QmYmeWeZJXMuWXo3XpvovMUw16uDzZhqNUW2wCGuWiqFoU',
  'QmSyws8iuUDfcnTkX8HdudFauRdYV5tQbTnStnFS3yxUKx',
  'QmUVDtcDmXUf3tqntFkZy5V3QbCX6CTYzMh4JoKoEiFJGa',
  'QmP7pVdaR48NEnu6oHHpXV4xWS6EoNoqhciS9QJutTooyL',
  'QmVMiuW2yMFFQn5awc4Y9tHMY5PE9w2tSX7wRzx3m7ahKk',
  'QmQGMVBs7szFXufsz5nZKNyXsK8fzM8HfH3zkmcip4zfYS',
  'QmZASiZv3oLiabBfJhHpN2k93JPhZDMCFiLuTLN9vbVEjE',
  'QmQrFEUu3BWXR6PY7b1GRRMzhVnWySBzrYBJrmURrAXVug',
  'QmXmrAB7WQmo7uXZSyEobfk7gE9CEq1BNXR3Gt7egSusMc',
  'QmXXb7kCf9s4zssDXe2vHsx3JATGDzJCCVNBWmie42jEgU',
  'QmVNeaLgf9NqCuhmqNpYcc4P5pS2Ap7meMSnSyxeaNmeJG',
  'QmTnwJLNJTUZN8SwngUNwsM98ftfkND21AAZpJ4pX1qEzR',
  'QmYssaHYqZzAE6x7pja2EuKSFBDwxLZQKn6na763ApCMSY',
  'QmZxXVbwQ3JpgL1byEn9PAPpV4qHQrWkzN2zdDzJ16M193',
  'Qmb9mVa984gARfQj3npaTvxQBuKnXrV6mgYhTwmyvxNhzg',
  'QmQo5QHgjqwAc8D5e38hUMUTPaRxKxvitv8Qhk9EYSseQr',
  'QmecATW8TNkuWzEeBnKmrvBg5kYCtcXfG6dTVMKKRu2rjY',
  'QmSiKL12E9qoWEhPypkKS3n7pEAzyXhZu9dRyVryMmxTBB',
  'QmbdkU6heGFcJaaL3f5pt1kinSracEKTrgG7Q6RxbPMDzS',
  'QmayYHdVT84cA93pQ3BE7CJRoMuwqXRSYnc1V6yF6VTT6g',
  'Qmdj3uT97pFgmjvZHT3xWswVHdvYY4QH8FwtGGX2d7sEQz',
  'QmXx7NwPw5Bg9AgufPt4FNULddKwycovNjwPFWRafJU9SQ',
  'QmbBdbVDEvEEBqffo3PYN8jwMHYH4BLTZKagQ3gxJnZnqX',
  'QmaLF9YiYgdyGcS8db8v8B6YxSZ6E4jz73hFsAB4Liagun',
  'QmNcSTL7iDTeyUtX9j7mA2yfm1VvQ3eTZ18Djg2pZ2sSdN',
  'QmQqUTyCA3Lyj3p7SgcqjceYyMDpThAsZXy9sZNXWAfQKq',
  'QmSKUFNmbt6DgnPBorpkTVTJqnW2ZoUTC2TkNXD21KTevP',
  'Qmbpwbegx36odBYuZW5Gozntv6hSXbczKaBCHbcK7XMHZW',
  'QmXXejGdkZcBYUWF3zjdvJnDHEHiq9TBnUddHQYFuU5i9F',
  'QmXd3Ddox6cNFF7qbvCcfHxZYF8LQbUGzFm5abM45wgyry',
  'QmYKmqm4zkQjcC1V1etdFCSe87ATGYuRSt8N7XCeKFNg6d',
  'QmS41KVS7VxeFJz2RFAV5i22ajTVQk82MJCGeBFiK2X5sG',
  'QmZW1EHZ3RWAzn549buA6YCooN2DKFChCUXRQ1WNrcWa4r',
  'QmRhJqp9WZ97pvYMvMSaXzrBpcuCoCn4x2A88cujy5KoFR',
  'QmZRuyjPvAmyipY1XLoKQ2wSN27aSU46oRcFTJBhuKXG4Z',
  'QmV2SUf7jkbSUzpSsy1hzzNW6ZV4mjaqtj4gHaGLG7z9Gz',
  'QmWQ7xxgkPgrYRQw81Esz5hPYvwR1AYhr71gUeczD23VDQ',
  'QmZ57y1NDfL4h2vfaYietaXxNrf2hVn4p5sivBEZPdsE2h',
  'QmZSSNjvnHyzy5tRHRE7Xb9W8Muapy9QgwDYrMmpVCM6BH',
  'QmcDajxjNSP744AZJwbgirDAhWnTzHdSpjcHhQb1DDeoDZ',
  'QmVtjWxkwZm2y1aEgExWxWPyDo6MuPAwSPJ1VVt6MH51s5',
  'QmXYDbNHBghTjSt1mggfhWEwK7LCvBchG5KXHTymWZ825W',
  'QmNXGMowThSXJBvz1tsCHP8VpRU5tQ4dVbyHw6szKCwamC',
  'QmYUdQWmAdUuswCAwpAuy2xVrjNGpBHja3KBoxZ9KPNJRA',
  'QmTLVd8Y8f6uy67adMc3ekA7GnWAFYtj2ZkaLS5D4M94gu',
  'QmdsEp9tH9QC4ktAx7LmVUKx1fsbco2dHPH2AgpqG2umm7',
  'QmQEjRUZHsHmenXJRNwXsCZwLW9PBYj9Y4yVx1JhQvQD5Z',
  'QmXgVvgESyHoFTmgTjSLG4ZYQnSVTSCh1GMAp1mF5SmCCx',
  'QmdpAGnL7Y6Wr78Cp88nTqH6JbAp8tpemThzANkxPAgqga',
  'QmW8sY16JHBFDRSS7sSfe7TpsvZDVfgmkai7bTDvtByXqD',
  'QmZ4PP2vzEqj9n1kfpC197YkoCdsWvjLG28f8QDP6HCXXd',
  'QmPcjYYUfWtZbxwrQRA5eWibUQCXh5xUQUut36aYABbbvQ',
  'QmeLycuMWqMvWw697sLipcR8zqSif259hQXmJCVRqXfnmE',
  'QmQ124iWZq1j8vYUvoogYAsbezHGihRoGTqFgWA7i8svLf',
  'QmYAhyjpNp674htrNv2KQhowFQjnJDwPdZvvvoRopFRSyc',
  'QmbRYAf6Bh5D3ECByCtvUooQHd1fBbGYGsjHALjADa8sEh',
  'QmNrsQcyELHMgkNkdnbHcuNgyKzWcm5qPuRAzNohtNWjPj',
  'QmNTcaJ6TRKroAb8LS3hjN6XyQeWusbniUVbx53U45kYNF',
  'QmUbWT3ssWigdjBaDfYYVNm6FMXveTFKs7yqyzNLEQvYS1',
  'QmZPYhqdTqkKxSZCysobV8kSQUjRkvRz3xG92aKbumg15s',
  'QmbLqWoNSo9YAa7jpqKGJvTquPX7ox9ukZ69r1hKkNBni1',
  'QmdQ4F4Zjc6wQexA3akvLkqzhK7e3NvF95aEDVsgtAPqVG',
  'QmaDh9keCHBjMatNeZ8q4q2tbjcr9Um3VwLZM1TjNsuR6r',
  'QmdD64XdQ1tV6nUvmBpqyAjfKJoyrfFjTbEBCSu9V6m6DJ',
  'QmeeksvDyu8EDh2XLbEXt2K9EiGxSwffoSZrqtN4B7V9v1',
  'QmTpp2Ne6pHKKDCen1RnFt6NfRdWxRCphvh9avQTa2nsgf',
  'QmSY5VG6Nmq7VTLyTxGUxw6wLZeSEe7WMWrDtSnauyiggK',
  'QmX5m5AqmikvTEPMKDmiYu7oZMD3re7kYWcMi8mpB6znFm',
  'QmPYjhdoJo5qZBcV4PBC3v7y2TuqhYAc9GmuVWpuXbPpR9',
  'QmVRcyMe4wJMz7GmxJdt1HyZYH2LvNNLZoPo4KtRDXctbC',
  'QmShShwG53Ap1bznq779EEfFxxgK31BqWTLqxrhxtKysmx',
  'QmcajcKWBZmx7DxMzMHC6phtzk2UVrHA4NFASrLipvQWp8',
  'QmXYxvLX4Pd95gJ96fyW3nMqFJUsmZMJbeFFTai7bHvQuk',
  'QmaFDPrDjKwgg9g3QDAbegg3sKK23m3dVG4dtaFZtoax2Y',
  'QmWU5HqWRYCBceMFWAsjj683QZd41PYTotzHM9KAy1x2pw',
  'QmawnazFESAdxT6wA3qfPon13F3V96hdFxnXUAxnz9ZbFd',
  'QmXArwa5f4R6ngDKJpELkrdWjzvuRALcTyjdT96RC9vWg1',
  'QmXsk7LHui9yM6UNdwRGqdt85Wb5N2Ws5LFeU3Pfd3z1PQ',
  'Qmbde1u7NFPuQbYz6DSJ2BdFTw6HLqjTCLxPPqfaQCoNEE',
  'QmUkSyTZtp2UKgmHNeKvJ36Uq8tgVWg3jyU2EDbGkQzBcq',
  'QmZ8LFgJbyMSbYghyvC7DijknJo4NCYYsUZ1F6ZhQYbh72',
  'QmSdgNUSUprH4aJcSx2z77gMtdv4w9reRCp1SMV2sL6Dph',
  'QmfLmJqY37MDANfRJWQ4HNWe4gLUBk4aQ4K43aGSVfYJD2',
  'QmdnAiNvbf7DPZzMHrzapXt1LgT7QDDNA8yvrTnh21VEwV',
]

const DefiProductDetailTabs: FC<Props> = ({ description, title }) => {
  const router = useRouter()
  const { asPath } = router
  const index = asPath.split('/product/')[1].split('-')[0]

  return (
    <div className={s.tabSection}>
      <Tabs>
        <Tab title="WEAR TO DEFI">
          <div className={s.tabRow}>
            <img src="/images/defi-map.png" className={s.tabRowImage} />
            <div className={s.text}>
              <div className={s.title}>Merging Fashion x DeFi.</div>
              <div className={s.description}>
                WTF is DeFi and why is it so hard to use? What if you what you
                could earn more from what you wear?
                <br />
                <br />
                This fashion isn’t just ordinary fashion. It onboards you into
                an entire world of NFTs, Decentralised Finance, Crypto and Web3.
                Every fashion piece is a unique NFT that can also earn you yield
                in $MONA token and other crypto. Read more{' '}
                <a
                  className="underline"
                  href="https://digifizzy.xyz/magazines/37"
                >
                  here.{' '}
                </a>
                <br />
                <br />
                We are melting the centralised exploitative crown to weave the
                fabric of a generative ecosystem.
              </div>
            </div>
          </div>
          <div className={s.tabRow}>
            <img src={(info[index] || {}).icon} className={s.tabRowImage} />
            <div className={s.text}>
              <div className={s.title}> {title} </div>
              <div className={s.description}> {description} </div>
              <div className="flex items-center space-x-2 mt-4">
                <a href={(info[index] || {}).globe} target="_blank">
                  <img src="/images/globe 1.png" />
                </a>
                {(info[index] || {}).twitter ? (
                  <a href={(info[index] || {}).twitter} target="_blank">
                    <img src="/images/twitter 1.png" />
                  </a>
                ) : null}
                {(info[index] || {}).discord ? (
                  <a href={(info[index] || {}).discord} target="_blank">
                    <img src="/images/discord 1.png" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Tab>
        <Tab title="GLOBAL DESIGNER NETWORK">
          <div className="flex flex-col items-center space-y-3">
            <div>
              <div className="text-lg font-bold">
                DIGITALAX & THE GLOBAL DESIGNER NETWORK.
              </div>
              Your fashion garment was designed by DIGITALAX in collaboration
              with hundreds of highly skilled digital and physical fashion
              designers under the Global Designer Network.
            </div>
            <div>
              <a href="https://designers.digitalax.xyz/" target="_blank">
                <b className="underline">
                  {' '}
                  Meet All of the Web3 Fashion Anarchists
                </b>{' '}
              </a>
            </div>
            <div>
              Every part of your fashion is minted on-chain as an NFT under the
              <a
                href="https://designers.digitalax.xyz/fractional"
                target="_blank"
              >
                <b className="underline">
                  {' '}
                  Fractional Garment Ownership standard.
                </b>{' '}
              </a>
              Patterns, materials, textures and prints are designed by the
              Global Designer Network and minted as ERC-1155 NFTs by each
              designer, where they are open sourced under the DIGITALAX on-chain
              material libraries.
              <br />
              <br />
              This allows for modular and composable tracking of every part of
              the garment throughout the entire supply chain (Across both the
              digital and physical realms). The master garment is minted as an
              ERC-721 that owns a balance of the incorporated ERC-1155 NFTs
              on-chain— establishing streamlined fractional royalties for all
              contributors and injecting open source into fashion.
            </div>
            <div className="">
              <a
                href="https://designers.digitalax.xyz/opensourcelibraries/"
                target="_blank"
              >
                {' '}
                <b className="underline">
                  {' '}
                  See Entire On-Chain Open Source Libraries{' '}
                </b>{' '}
              </a>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default DefiProductDetailTabs
