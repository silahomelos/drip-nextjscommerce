import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { useMain } from 'context'

import PriceTag from '../PriceTag'
import s from './Collection.module.scss'

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
}) => {

  const { monaPrice } = useMain()
  // const { cryptoPrice } = useMain()
  // console.log('collection: ', collection)
  // console.log('cryptoPrice: ', cryptoPrice)

  return (
    <div className={s.collectionItemContainer}>
      <div className={s.collectionContent}>
        <h3 className={s.collectionTitle}>
          <span>{collection.name}</span>
        </h3>

        <Link href={`/collection${collection.path}`} {...props}>
          <a className={cn(s.root, className)}>
            <>
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
          <a
            className={s.btnPrice}
            href={`/collection${collection.path}`}
          >
            <img src='/images/black_update/gray_button.png' />
            <span>
              VIEW COLLECTION
            </span>
          </a>
          <PriceTag
            monaPrice={(collection.totalSold * monaPrice).toFixed(2)}
            dollarPrice={collection.totalSold}
            description={'TOTAL SOLD'}
          />
        </div>
      </div>
    </div>
  )
}

export default Collection
