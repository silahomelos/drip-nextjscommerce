import React from 'react'
import styles from './styles.module.scss'
import FashionCard from '@components/product/ProductView/fashion-card'
import { Container } from '@components/ui'

const FashionList = ({ fashionData, collections }) => {
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
                products={collections}
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
