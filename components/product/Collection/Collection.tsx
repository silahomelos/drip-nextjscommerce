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
        <h3 className={s.collectionTitle}>
          <span>{collection.name}</span>
        </h3>
        <div className={s.userSection}>
          <div className="user-avatar">
            <img src={`/logo.jpg` || placeholderImg} alt="" />
          </div>
          <p>DIGITALAX</p>
        </div>
      </div>
    </div>
    <div className={s.collectionContent}>
      <Link href={`/product/${collection.slug}`} {...props}>
        <a className={cn(s.root, className)}>
          <>
            <div className={s.squareBg} />
            <div className={s.imageContainer}>
              {collection?.image && (
                <Image
                  alt={collection.name || 'Collection Image'}
                  className={s.collectionImage}
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
      <div className={s.collectionPriceSection}>
        <span className={s.collectionPrice}></span>
        <div className={s.btnPrice}>
          <p>Open Collection</p>
          <a href={`/collection${collection.path}`}>VIEW COLLECTION</a>
        </div>
      </div>
    </div>
  </div>
)

export default Collection
