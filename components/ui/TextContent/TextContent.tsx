import React, { FunctionComponent } from 'react'
import cn from 'classnames'
import s from './TextContent.module.scss'

type Props = {
  onSelectText: (index: number) => void
}

const TextContent: React.FC<Props> = ({ onSelectText }) => {
  const subTitleList = [
    'CROSS DIGI-FIZZY REALMS',
    'HYBRID FASHION NFTs',
    'UNLOCKABLE CONTENT',
  ]
  const selectText = (index: number) => {
    onSelectText(index)
  }
  return (
    <div className={s.textContentContainer}>
      <h1 className={s.title}>
        {' '}
        MOD YOUR WAY INTO METAVERSE FASHION & GAMING{' '}
      </h1>
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
