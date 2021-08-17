import React, { FunctionComponent } from 'react'
import cn from 'classnames'
import s from './TextContent.module.scss'

type Props = {
  onSelectText: (index: number) => void
}

const TextContent: React.FC<Props> = ({ onSelectText }) => {
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
      <img src="/images/Group 1210.png" className={s.titleImage} />
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
