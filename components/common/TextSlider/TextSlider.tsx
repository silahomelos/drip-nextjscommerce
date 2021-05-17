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
    <div
      className={styles.wrapper}
      style={{ backgroundColor: black ? 'white' : 'transparent' }}
    >
      <div className={styles.animationForm}>
        <div className={styles.node}>
          {items.map((item, index) => (
            <div
              className={styles.item}
              key={index}
              style={{ color: black ? 'black' : 'white' }}
            >
              {' '}
              {item}{' '}
            </div>
          ))}
        </div>
        <div className={styles.node}>
          {items.map((item, index) => (
            <div
              className={styles.item}
              key={index}
              style={{ color: black ? 'black' : 'white' }}
            >
              {' '}
              {item}{' '}
            </div>
          ))}
        </div>
        <div className={styles.node}>
          {items.map((item, index) => (
            <div
              className={styles.item}
              key={index}
              style={{ color: black ? 'black' : 'white' }}
            >
              {' '}
              {item}{' '}
            </div>
          ))}
        </div>
        <div className={styles.node}>
          {items.map((item, index) => (
            <div
              className={styles.item}
              key={index}
              style={{ color: black ? 'black' : 'white' }}
            >
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
