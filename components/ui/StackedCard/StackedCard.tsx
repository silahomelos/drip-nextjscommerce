import { useEffect, useState, DOMAttributes } from 'react'
import * as React from 'react'
import Draggable from 'react-draggable'
import shortid from 'shortid'
import ReactCSSTransitionGroup from 'react-transition-group'
import cn from 'classnames'
import s from './StackedCard.module.scss'
import { Key } from 'node:readline'

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    wobble?: number
  }
}

type Props = {
  index: number
  random: String
}
const StackedCard: React.FC<Props> = ({ index, random }) => {
  const textList = [
    { index: 1, text: 'DYNAMIC NFT MINI DESCRIPTION GOES HERE' },
    { index: 2, text: 'HYBRID FASHION NFTs' },
    { index: 3, text: 'UNLOCKABLE CONTENT' },
    { index: 4, text: 'DYNAMIC NFT MINI DESCRIPTION Text' },
  ]
  const [stackTexts, setStackTexts] = useState(textList)
  const [wobble, setWobble] = useState(0)
  useEffect(() => {
    setWobble(1)
    const [movedItem] = stackTexts.filter((item) => item.index == index + 1)
    setStackTexts([
      ...stackTexts,
      { index: (stackTexts.length % 4) + 1, text: movedItem.text },
    ])
  }, [index, random])

  const getRandomKey = (): number => {
    console.log(shortid.generate())
    return 1
  }

  return (
    <Draggable
      axis="both"
      defaultPosition={{ x: 0, y: 0 }}
      scale={1}
      bounds="parent"
    >
      <div className={s.cardContainer}>
        {stackTexts
          .slice(stackTexts.length - 4, stackTexts.length)
          .map((item, index) => (
            <div
              key={index}
              onAnimationEnd={() => setWobble(0)}
              wobble={wobble}
              className={cn(
                s.stackedCard,
                'card' + item.index,
                'layer' + index
              )}
            >
              <h1 className={s.cardText}>{item.text}</h1>
            </div>
          ))}
      </div>
    </Draggable>
  )
}

export default StackedCard
