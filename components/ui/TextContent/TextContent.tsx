import React, { FunctionComponent } from 'react'
import cn from 'classnames'
import s from './TextContent.module.scss'

const TextContent: React.FC = () => {
  return (
    <div className={s.textContentContainer}>
      <h1 className={s.title}>
        {' '}
        MOD YOUR WAY INTO METAVERSE FASHION & GAMING{' '}
      </h1>
      <div className={s.subtitleBar}>
        <h3 className={s.subtitle}>CROSS DIGI-FIZZY REALMS</h3>
        <h3 className={s.subtitle}>HYBRID FASHION NFTs </h3>
        <h3 className={s.subtitle}>UNLOCKABLE CONTENT</h3>
      </div>
    </div>
  )
}

export default TextContent
