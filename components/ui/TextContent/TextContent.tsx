import React, { FunctionComponent } from 'react'
import cn from 'classnames'
import s from './TextContent.module.scss'
import { useRouter } from 'next/router'

type Props = {
  onSelectText: (index: number) => void
}

const TextContent: React.FC<Props> = ({ onSelectText }) => {
  const { asPath } = useRouter()
  const subTitleList = [
    'NFT FASHION',
    'GLOBAL DESIGNER NETWORK',
    'FASHION X DEFI',
  ]
  const selectText = (index: number) => {
    onSelectText(index)
  }
  return (
    <div className={s.textContentContainer}>
      {asPath.includes('web3') ? (
        <img src="/images/Group 1210.png" className={s.titleImage} />
      ) : (
        <h1 className={s.title}>
          {' '}
          Wear to Defi. <br />
          Mod your way into metaverse fashion & Gaming.{' '}
        </h1>
      )}
      <div className={s.subtitleBar}>
        {subTitleList.map((text, index) => (
          <h3
            key={index}
            className={s.subtitle}
            onClick={() => selectText(index)}
          >
            {text}
          </h3>
        ))}
      </div>
    </div>
  )
}

export default TextContent
