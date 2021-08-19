import React from 'react'
import styles from './styles.module.scss'
import FashionCard from '@components/product/ProductView/fashion-card'
import { Container } from '@components/ui'

const FashionList = ({ fashionData }) => {
  const videoUrls = [
    '/images/product_detail1.mp4',
    '/images/product_detail2.mp4',
    '/images/product_detail6.png',
    '/images/product_detail3.mp4',
    '/images/product_detail4.mp4',
    '/images/product_detail5.mp4',
  ]

  return (
    <div>
      <section className={styles.bgBotSection}>
        <img src="/images/bgbot.png" className={styles.back} />
        <img src="/images/glitch.png" className={styles.glitch} />
      </section>

      <section className={styles.fashionListSection}>
        <img src="/images/webtitle.png" className={styles.webtitle} />
        {fashionData.map((item, index) => (
          <Container>
            <div className={styles.cardWrapper}>
              <FashionCard
                item={item}
                leftImage={index % 2 == 0 ? true : false}
                image={videoUrls[index]}
                rarity={'Semi-Rare'}
              />
            </div>
          </Container>
        ))}
        <img src="/images/glitch.png" className={styles.glitch} />
      </section>

      <section className={styles.viewAllSkinsSection}>
        <img src="/images/bgbot.png" className={styles.back} />
      </section>
    </div>
  )
}

export default FashionList
