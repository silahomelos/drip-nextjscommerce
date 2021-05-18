import { FC } from 'react'
import styles from './TextSlider.module.scss'

interface Props {
  black: boolean
}

const TextSlider: FC<Props> = ({ black }) => {
  const items = [
    'MONA PRICE',
    'DIGITALAX NEW POST TITLE',
    'DRIP PRODUCT TITLE',
    'DIGIFIZZY FEATURE',
    'DRIP PRODUCT TITLE',
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.animationForm}>
        <div className={styles.node}>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              {' '}
              {item}{' '}
            </div>
          ))}
        </div>
        <div className={styles.node}>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              {' '}
              {item}{' '}
            </div>
          ))}
        </div>
        <div className={styles.node}>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              {' '}
              {item}{' '}
            </div>
          ))}
        </div>
        <div className={styles.node}>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              {' '}
              {item}{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TextSlider
