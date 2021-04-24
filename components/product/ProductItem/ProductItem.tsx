import { FC, useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types'
import s from './ProductItem.module.scss'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'

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
        <Link href={`/product/${product.slug}`} {...props}>
          <a className={cn(s.root, className)}>
            <>
              <div className={s.squareBg} />

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
          <span className={s.productPrice}>
            {product.price.currencyCode}
            &nbsp;
            {product.price.value}
          </span>
          <div className={s.btnPrice}>
            <a href={`/product/${product.slug}`}>BUY NOW</a>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center align-center box-border w-full">
        <div className="">
          <h3 className={s.productTitle}>
            <span>{product.name}</span>
          </h3>
          <div className={s.descriptionSection}>
            {!isJson && <p>{descContent}</p>}
            {isJson && <p>{descContent[0].description}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
