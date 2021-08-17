import React from 'react'
import styles from './styles.module.scss'

const reviseUrl = (url) => {
  if (url?.includes('gateway.pinata')) {
    return url.replace('gateway.pinata', 'digitalax.mypinata')
  }
  return url
}

const ImageCard = ({ imgUrl = null }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.bodyWrapper}>
          {imgUrl ? (
            <img src={reviseUrl(imgUrl)} className={styles.image} />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ImageCard
