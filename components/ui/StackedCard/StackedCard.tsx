import React, { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import s from './StackedCard.module.scss'
type Props = {
  index: number
}
const StackedCard: React.FC<Props> = ({ index }) => {
  const textList = [
    'DYNAMIC NFT MINI DESCRIPTION GOES HERE',
    'HYBRID FASHION NFTs',
    'UNLOCKABLE CONTENT',
  ]
  const [topText, setTopText] = useState(textList[0])
  useEffect(() => {
    console.log(index)
    setTopText(textList[index])
  }, [index])
  return (
    <div className={s.cardContainer}>
      <div className={cn(s.stackedCard, s.card1)}>
        <h1 className={s.cardText}></h1>
      </div>
      <div className={cn(s.stackedCard, s.card2)}>
        <h1 className={s.cardText}></h1>
      </div>
      <div className={cn(s.stackedCard, s.card3)}>
        <h1 className={s.cardText}></h1>
      </div>
      <div className={cn(s.stackedCard, s.card4)}>
        <h1 className={s.cardText}>{topText}</h1>
      </div>
    </div>
  )
}

export default StackedCard
