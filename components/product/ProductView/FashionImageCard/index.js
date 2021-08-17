import LazyLoad from 'react-lazyload'
import React from 'react'
import styles from './styles.module.scss'

const reviseUrl = (url) => {
  if (url?.includes('gateway.pinata')) {
    return url.replace('gateway.pinata', 'digitalax.mypinata')
  }
  return url
}

const ImageCard = ({ data, imgUrl = null }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.bodyWrapper}>
          {data ? (
            <LazyLoad>
              <video key={data.id} autoPlay muted loop className={styles.video}>
                <source
                  src={reviseUrl(
                    data.garment ? data.garment.animation : data.animation
                  )}
                  type="video/mp4"
                />
              </video>
            </LazyLoad>
          ) : null}
          {imgUrl ? (
            <img src={reviseUrl(imgUrl)} className={styles.image} />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ImageCard
