import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useState } from 'react'
import s from './ProductView.module.scss'

import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, useUI } from '@components/ui'

import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem, useCart, useRemoveItem } from '@framework/cart'

import { getVariant, SelectedOptions } from '../helpers'
import DefiProductDetailTabs from './DefiProductDetailTabs'
import ProductDetailTabs from './ProductDetailTabs'
import ProductTopBanner from '@components/common/ProductTopBanner'
import { useRouter } from 'next/router'
import { setProductId, setVariantId, useMain } from 'context'

interface Props {
  className?: string
  children?: any
  product: Product
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const { data } = useCart()
  const removeItem = useRemoveItem()
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  const { openSidebar, openModal, setModalView } = useUI()
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({
    color: null,
    size: null,
  })
  const { dispatch } = useMain()
  const [curImgIndex, setCurImgIndex] = useState(0)
  const { asPath } = useRouter()

  // Select the correct variant based on choices
  const variant = getVariant(product, choices)

  const handleOnclick = (i: number) => {
    setCurImgIndex(i)
  }

  const addToCart = async () => {
    setLoading(true)
    try {
      // dispatch(setProductId(String(product.id)))
      // dispatch(
      //   setVariantId(String(variant ? variant.id : product.variants[0].id))
      // )
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      })
      // setModalView('AUTH_OPTIONS_VIEW')
      // openModal()
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const isOriginal = () => {
    return (
      asPath.includes('marketplace') ||
      asPath.includes('minecraft') ||
      asPath.includes('metameme')
    )
  }

  return (
    <>
      <ProductTopBanner showSlider={false} />
      <Container className={`${s.productViewContainer}`} clean>
        <NextSeo
          title={product.name}
          description={product.description}
          openGraph={{
            type: 'website',
            title: product.name,
            description: product.description,
            images: [
              {
                url: product.images[0]?.url!,
                width: 800,
                height: 600,
                alt: product.name,
              },
            ],
          }}
        />
        <div className={cn(s.root, 'fit')}>
          <div className={s.leftSide}>
            <div className={cn(s.productDisplay, 'fit')}>
              <div className={s.nameBox}>
                <h1 className={s.name}>{product.name}</h1>
              </div>

              <div className={s.sliderContainer}>
                <ProductSlider key={product.id} imageId={curImgIndex}>
                  {product.images.map((image, i) => (
                    <div key={image.url} className={s.imageContainer}>
                      <Image
                        className={s.img}
                        src={image.url!}
                        alt={image.alt || 'Product Image'}
                        width={780}
                        height={1000}
                        priority={i === 0}
                        quality="85"
                      />
                    </div>
                  ))}
                </ProductSlider>
              </div>
            </div>

            <div className={s.previewImages}>
              {product.images.map((image, i) => (
                <div key={image.url} className={s.previewImg}>
                  <Image
                    className={s.img}
                    src={image.url!}
                    alt={image.alt || 'Product Image'}
                    width={88}
                    height={119}
                    priority={i === 0}
                    quality="85"
                    onClick={() => handleOnclick(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={s.sidebar}>
            <section>
              <div>
                <h1 className={s.productName}>{product.name}</h1>
                <div className={s.userSection}>
                  <div className="user-avatar">
                    <img src="/logo.jpg" />
                  </div>
                  <p>DIGITALAX</p>
                </div>
                <div className={s.price}>
                  {price}
                  {` `}
                  {product.price?.currencyCode}
                </div>
              </div>
              <div className={s.productAttrs}>
                {product.options?.map((opt) => (
                  <div className="pb-4 pr-6" key={opt.displayName}>
                    <h2 className={`${s.optionTitle} uppercase font-medium`}>
                      {opt.displayName}
                    </h2>
                    <div className="flex flex-row py-4">
                      {opt.values.map((v, i: number) => {
                        const active = (choices as any)[
                          opt.displayName.toLowerCase()
                        ]

                        return (
                          <Swatch
                            key={`${opt.id}-${i}`}
                            active={v.label.toLowerCase() === active}
                            variant={opt.displayName}
                            color={v.hexColors ? v.hexColors[0] : ''}
                            label={v.label}
                            onClick={() => {
                              setChoices((choices) => {
                                return {
                                  ...choices,
                                  [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                                }
                              })
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p className={s.openCollection}>Open Collection</p>
                <Button
                  aria-label="Add to Cart"
                  type="button"
                  className={s.button}
                  onClick={addToCart}
                  loading={loading}
                  disabled={!variant && product.options.length > 0}
                >
                  <div>
                    ADD TO CART
                    <p className={s.buttonSubTitle}>FIAT & CRYPTO</p>
                  </div>
                </Button>
              </div>
              {isOriginal() ? (
                <ProductDetailTabs description={product.description} />
              ) : (
                <DefiProductDetailTabs
                  description={product.description}
                  title={product.name}
                />
              )}
            </section>
          </div>
          {/* {process.env.COMMERCE_WISHLIST_ENABLED && (
            <WishlistButton
              className={s.wishlistButton}
              productId={product.id}
              variant={product.variants[0]! as any}
            />
          )} */}
        </div>
      </Container>
    </>
  )
}

export default ProductView
