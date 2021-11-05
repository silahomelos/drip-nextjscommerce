import { FC, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'

import type { Product } from '@commerce/types'
import PriceTag from '../PriceTag'
import s from './ProductItem.module.scss'

interface Props {
  className?: string
  product: Product
  variant?: 'slim' | 'simple'
  imgProps?: Omit<ImageProps, 'src'>
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductItem: FC<Props> = ({
  className,
  product,
  variant,
  imgProps,
  ...props
}) => {
  const [isJson, setIsJson] = useState(false)
  const [descContent, setDescContent] = useState(() => {
    try {
      setIsJson(true)
      return JSON.parse(product.description)
    } catch (e) {
      setIsJson(false)
      return product.description
    }
  })

  return (
    <div className={s.productItemContainer}>
      <div className={s.productContent}>
        <h3 className={s.productTitle}>
          <span>{product.name}</span>
        </h3>

        <Link href={`/product/${product.slug}`} {...props}>
          <a className={cn(s.root, className)}>
            <>
              <div className={s.imageContainer}>
                {product?.images && (
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0].url || placeholderImg}
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
          <PriceTag
            monaPrice={`${product.price.value}`}
            dollarPrice={`${product.price.value}`}
            description={'SALE PRICE'}
          />
          <a
            className={s.btnPrice}
            href={`/product/${product.slug}`}
          >
            <img src='/images/black_update/gray_button2.png' />
            <span>
              BUY NOW
            </span>
          </a>
        </div>
      </div>
      
    </div>
  )
}

export default ProductItem
