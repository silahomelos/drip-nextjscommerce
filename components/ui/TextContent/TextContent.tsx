import React, { FunctionComponent } from 'react'
import cn from 'classnames'
import s from './TextContent.module.scss'

const TextContent: React.FC = () => {
  return (
    <div className={s.textContentContainer}>
      <h1 className={s.title}> REP YOUR STYLE IRL.</h1>
      <h3 className={s.subtitle}>
        {' '}
        Digital-Physical Hybrid Fashion Supply Chain.{' '}
      </h3>
      <h4 className={s.smsubtitle}>
        {' '}
        NFTs. Sustainability. Digi-Fizzy Realms.{' '}
      </h4>
      <p className={s.text}>
        {' '}
        Decentralised Commerce (DeCo). Unlockable Content.{' '}
      </p>
    </div>
  )
}

export default TextContent
