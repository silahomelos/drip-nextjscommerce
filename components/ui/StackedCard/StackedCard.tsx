import { useEffect, useState, useRef } from 'react'
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
  contentRef: any
}
const StackedCard: React.FC<Props> = ({ index, random, contentRef }) => {
  const textList = [
    { index: 1, text: 'DYNAMIC NFT MINI DESCRIPTION GOES HERE', visible: true },
    { index: 2, text: 'HYBRID FASHION NFTs', visible: true },
    { index: 3, text: 'UNLOCKABLE CONTENT', visible: true },
    { index: 4, text: 'DYNAMIC NFT MINI DESCRIPTION Text', visible: true },
  ]
  const [stackTexts, setStackTexts] = useState(textList)
  const [wobble, setWobble] = useState(0)
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
  const [dom, setDom] = useState<any>()
  const [images, setImages] = useState<Array<HTMLCollection>>()
  const [imgPosition, setImgPosition] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [cacheMousePos, setCacheMousePos] = useState({ x: 0, y: 0 })
  const [xsideOffset, setXsideOffset] = useState<number>(0)
  const dragRef = useRef()

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window
    setXsideOffset(width * 0.6)
    console.log(xsideOffset)
    setImages(contentRef.current.children)
  })

  useEffect(() => {
    setWobble(1)
    const [movedItem] = stackTexts.filter((item) => item.index == index + 1)
    setStackTexts([
      ...stackTexts,
      {
        index: (stackTexts.length % 4) + 1,
        text: movedItem.text,
        visible: true,
      },
    ])
  }, [index, random])

  const removeOldCard = () => {
    setStackTexts(
      stackTexts
        .slice(stackTexts.length - 4, stackTexts.length)
        .map((item, index) => {
          if (index == 3) {
            return item
          } else {
            return { index: item.index, text: item.text, visible: false }
          }
        })
    )
  }

  const handleDrag = (e: any, ui: any) => {
    removeOldCard()
    console.log(ui)
    const { x, y } = deltaPosition
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    })
    let distance = Math.hypot(
      deltaPosition.x - lastMousePos.x,
      deltaPosition.y - lastMousePos.y
    )
    if (distance > 100) {
      showNextImage()
      setLastMousePos(deltaPosition)
      if (imgPosition < contentRef.current.children.length - 1) {
        setImgPosition(imgPosition + 1)
      } else {
        setImgPosition(0)
      }
    }
  }

  const showNextImage = () => {
    let preImage: HTMLImageElement =
      contentRef.current.children[
        imgPosition == contentRef.current.children.length - 1
          ? 0
          : imgPosition + 1
      ]
    preImage.classList.remove('animated')
    let image: HTMLImageElement = contentRef.current.children[imgPosition]
    image.style.bottom = deltaPosition.y.toString().replace('-', '') + 'px'
    image.style.left = (xsideOffset + deltaPosition.x).toString() + 'px'
    image.classList.add('animated')
  }

  return (
    <>
      {xsideOffset && (
        <Draggable
          axis="both"
          defaultPosition={{ x: xsideOffset, y: 0 }}
          scale={1}
          bounds="parent"
          onDrag={handleDrag}
        >
          <div className={s.cardContainer}>
            {stackTexts.slice(stackTexts.length - 4, stackTexts.length).map(
              (item, index) =>
                item.visible && (
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
                )
            )}
          </div>
        </Draggable>
      )}
    </>
  )
}

export default StackedCard
