import { Banner } from '@components/ui'
import { FC, useRef, useState } from 'react'
import { TextSlider } from '..'
import TextContent from '@components/ui/TextContent'
import Container from '@components/ui/Container'
import StackedCard from '@components/ui/StackedCard'
import styles from './ProductTopBanner.module.scss'
import shortid from 'shortid'

interface Props {
  showSlider: boolean
}

const ProductTopBanner: FC<Props> = ({ showSlider }) => {
  const contentEl = useRef(null)
  const [cardTextIndex, setCardTextIndex] = useState(0)
  const [randomStr, setRandomStr] = useState('')

  const onSelectCard = (index: number) => {
    setCardTextIndex(index)
    setRandomStr(shortid.generate())
  }

  return (
    <div className={styles.wrapper}>
      <Banner>
        <Container>
          <div className="contentContainer">
            <div className="content" ref={contentEl}>
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/tile.png"
                alt="Some image"
              />
            </div>
          </div>
          <TextContent onSelectText={onSelectCard} />
          <StackedCard
            index={cardTextIndex}
            random={randomStr}
            contentRef={contentEl}
          />
        </Container>
      </Banner>
      {showSlider && <TextSlider black={false} />}
    </div>
  )
}

export default ProductTopBanner
