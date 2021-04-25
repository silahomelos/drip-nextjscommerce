import { useKeenSlider } from 'keen-slider/react'
import cn from 'classnames'
import { FC, useRef, useState } from 'react'
import s from './ProductDetailSlider.module.css'

interface Props {
  content: any
}

const ProductDetailSlider: FC<Props> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(slide) {
      setCurrentSlide(slide.details().relativeSlide)
    },
  })

  return (
    <div className={s.root} ref={sliderContainerRef}>
      <button
        className={cn(s.leftControl, s.control)}
        onClick={slider?.prev}
        aria-label="Previous Product Detail"
      />
      <button
        className={cn(s.rightControl, s.control)}
        onClick={slider?.next}
        aria-label="Next Product Detail"
      />
      <div ref={ref} className="keen-slider h-full">
        {content.map((item: any) => {
          return (
            <div className="block md:flex keen-slider__slide w-full">
              <img src={item} className={`${s.detialImage}`} />
              <div className={s.description}>
                Each fashion item comes with a unique memetic patch print
                (Minted as an 1155 NFT), inventory claim ticket, XP points for
                ESPA and a dynamic NFT that becomes unique overtime. Read more
                below!
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductDetailSlider
