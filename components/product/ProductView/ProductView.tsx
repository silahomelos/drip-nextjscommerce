import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useState } from 'react'
import s from './ProductView.module.scss'

import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, Text, useUI, Tabs, Tab } from '@components/ui'

import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'

import { getVariant, SelectedOptions } from '../helpers'
import WishlistButton from '@components/wishlist/WishlistButton'

interface Props {
  className?: string
  children?: any
  product: Product
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({
    size: null,
    color: null,
  })
  const [curImgIndex, setCurImgIndex] = useState(0)
  const [isTab, setIsTab] = useState(false)
  const [tabContent, setTabContent] = useState(() => {
    try {
      setIsTab(true)
      return JSON.parse(product.description)
    } catch (e) {
      setIsTab(false)
      return product.description
    }
  })

  // Select the correct variant based on choices
  const variant = getVariant(product, choices)

  const handleOnclick = (i: number) => {
    setCurImgIndex(i)
  }

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
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
                  <img src={product.images[0].url} alt="" />
                </div>
                <p>Chamila Hetti</p>
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
                Buy Now
              </Button>
            </div>

            {/* descripton section */}
            {!isTab && <div className={s.flatDescription}>{tabContent}</div>}

            <div className={s.tabSection}>
              <Tabs>
                {isTab &&
                  tabContent.map((tabItem: any) => {
                    return (
                      <Tab title={tabItem.title}>
                        <div>{tabItem.description}</div>
                        <br />
                        <hr />
                        <br />
                        <div className={s.tabListContent}>
                          <div>
                            <h3 className={s.tabListContentTitle}>PHYSICAL</h3>
                            {tabItem.physical &&
                              tabItem.physical.map((list: string) => {
                                return <li>{list}</li>
                              })}
                          </div>
                          <div>
                            <h3 className={s.tabListContentTitle}>DIGITAL</h3>
                            {tabItem.digital &&
                              tabItem.digital.map((dlist: string) => {
                                return <li>{dlist}</li>
                              })}
                          </div>
                        </div>
                      </Tab>
                    )
                  })}
              </Tabs>
            </div>
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
  )
}

export default ProductView
