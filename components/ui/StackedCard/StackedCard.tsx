import React, { useCallback, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import cn from 'classnames'
import s from './StackedCard.module.scss'
type Props = {
  index: number
}
const StackedCard: React.FC<Props> = ({ index }) => {
  const textList = [
    { index: 1, text: 'DYNAMIC NFT MINI DESCRIPTION GOES HERE' },
    { index: 2, text: 'HYBRID FASHION NFTs' },
    { index: 3, text: 'UNLOCKABLE CONTENT' },
    { index: 4, text: 'DYNAMIC NFT MINI DESCRIPTION Text' },
  ]
  const [stackTexts, setStackTexts] = useState(textList)
  useEffect(() => {
    const [movedItem] = stackTexts.filter((item) => item.index == index + 1)
    setStackTexts([
      ...stackTexts.filter((item) => item.index !== index + 1),
      movedItem,
    ])
  }, [index])

  const handleStop = (index: number) => {
    const [movedItem] = stackTexts.filter((item) => item.index == index)
    setStackTexts([
      movedItem,
      ...stackTexts.filter((item) => item.index !== index),
    ])
  }

  return (
    <div className={s.cardContainer}>
      {stackTexts.map((item, index) => {
        if (index == 3) {
          return (
            <Draggable
              axis="x"
              defaultPosition={{ x: 0, y: 0 }}
              position={{ x: 0, y: 0 }}
              scale={1}
              onStop={() => handleStop(item.index)}
            >
              <div className={cn(s.draggableCard, 'layer' + index)}>
                <div className={cn(s.stackedCard, 'card' + item.index)}>
                  <h1 className={s.cardText}>{item.text}</h1>
                </div>
              </div>
            </Draggable>
          )
        } else {
          return (
            <div
              className={cn(
                s.stackedCard,
                'card' + item.index,
                'layer' + index
              )}
            >
              <h1 className={s.cardText}>{item.text}</h1>
            </div>
          )
        }
      })}
    </div>
  )
}

export default StackedCard
