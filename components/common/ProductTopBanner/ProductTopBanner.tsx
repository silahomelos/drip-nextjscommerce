import { FC, useState } from 'react'
import { TextSlider } from '..'
import styles from './ProductTopBanner.module.scss'

const ProductTopBanner: FC = () => {
  const [type, setType] = useState(0)
  const description = [
    'BRINGING DECENTRALISED COMMERCE #DECO TO METAVERSAL FASHION',
    'STITCHING THE FABRIC FOR GATEMAKERS IN BOTH THE PHYSICAL & DIGITAL REALMS',
    'DYNAMIC NFTs CHANGE AS YOU GROW YOUR METAVERSE TRIBES',
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        {' '}
        MOD YOUR WAY INTO METAVERSE FASHION & GAMING{' '}
      </div>
      <div className={styles.buttonGroup}>
        <button type="button" onClick={() => setType(1)}>
          {' '}
          DECO{' '}
        </button>
        <button type="button" onClick={() => setType(2)}>
          {' '}
          REP YOUR STYLE IRL{' '}
        </button>
        <button type="button" onClick={() => setType(0)}>
          {' '}
          UNLOCKABLE NFTS{' '}
        </button>
      </div>
      <div className={styles.displayer}>
        <img src="/images/Group 1136.png" className={styles.image} />
        <div className={styles.content}> {description[type]} </div>
      </div>
      <TextSlider black={false} />
    </div>
  )
}

export default ProductTopBanner
