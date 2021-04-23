import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types'
import s from './Collection.module.scss'
import Image, { ImageProps } from 'next/image'

interface Props {
  className?: string
  collection: any
  imgProps?: Omit<ImageProps, 'src'>
}

const placeholderImg = '/product-img-placeholder.svg'

const Collection: FC<Props> = ({
  className,
  collection,
  imgProps,
  ...props
}) => (
  <div className={s.collectionItemContainer}>
    <div className="flex flex-row justify-between box-border w-full">
      <div className="">
        <h3 className={s.productTitle}>
          <span>{collection.name}</span>
        </h3>
        <div className={s.userSection}>
          <div className="user-avatar">
            <img src={collection.image.url || placeholderImg} alt="" />
          </div>
          <p>DigitalAX</p>
        </div>
      </div>
    </div>
    <div className={s.productContent}>
      <Link href={`/product/${collection.slug}`} {...props}>
        <a className={cn(s.root, className)}>
          <>
            <div className={s.squareBg} />

            <div className={s.imageContainer}>
              {collection?.images && (
                <Image
                  alt={collection.name || 'Product Image'}
                  className={s.productImage}
                  src={collection.image.url || placeholderImg}
                  height={540}
                  width={540}
                  quality="85"
                  layout="responsive"
                  {...imgProps}
                />
              )}
            </div>
          </>
        </a>
      </Link>
      <div className={s.productPriceSection}>
        <span className={s.productPrice}></span>
        <div className={s.btnPrice}>
          <p>Open Collection</p>
          <a href={`/collection/${collection.slug}`}>VIEW COLLECTION</a>
        </div>
      </div>
    </div>
  </div>
)

export default Collection
