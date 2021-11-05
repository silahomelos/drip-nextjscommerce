import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import s from './ProductView.module.scss'

import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, useUI } from '@components/ui'

import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'

import { getVariant, SelectedOptions } from '../helpers'

import ImageCard from './ImageCard'
import InfoCard from './InfoCard'
import PriceTag from '../PriceTag'

import { getDripMarketplaceOfferById } from 'services/api.service'
import digitalaxApi from 'services/digitalaxApi.service'
import { useMain } from 'context'

const fetchTokenUri = async (tokenUri: string) => {
  return fetch(tokenUri)
    .then((res) => res.json())
    .then((res) => {
      return res
    })
}

const reviseUrl = (url: string) => {
  if (url?.includes('gateway.pinata')) {
    return url.replace('gateway.pinata', 'digitalax.mypinata');
  }
  return url
}


interface Props {
  className?: string
  children?: any
  product: Product
}

interface Designer {
  id: number
  image: string
  description: string
  name: string
  instagram?: string
  twitter?: string
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  const { openSidebar, openModal, setModalView } = useUI()
  const [designer, setDesigner] = useState<Designer>({
    id: 0,
    image: '',
    description: '',
    name: '',
  })
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({
    color: null,
    size: null,
  })

  const { user, account, monaPrice } = useMain()
  const [loveCount, setLoveCount] = useState(0)
  const [viewCount, setViewCount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [soldAmount, setSoldAmount] = useState(0)
  const [rarity, setRarity] = useState('')
  const [garmentChildren, setGarmentChildren] = useState([])
  const [isFetchedViewCount, setIsFetchedViewCount] = useState(false)

  const [curImgIndex, setCurImgIndex] = useState(0)
  const { asPath } = useRouter()

  const productId = asPath.split('/')[2]
  const collectionId = productId.split('-')[1]

  // Select the correct variant based on choices
  const variant = getVariant(product, choices)

  const handleOnclick = (i: number) => {
    setCurImgIndex(i)
  }

  useEffect(() => {
    const fetchDripInfo = async () => {
      const {
        dripMarketplaceOffer,
      } = await getDripMarketplaceOfferById(collectionId)
      console.log('dripMarketplaceOffer: ', dripMarketplaceOffer)

      setTotalAmount(dripMarketplaceOffer.garmentCollection?.garments?.length)
      setSoldAmount(dripMarketplaceOffer.amountSold)
      setRarity(dripMarketplaceOffer.garmentCollection?.rarity)
      const children: any = []

      if (dripMarketplaceOffer.garmentCollection?.garments[0].children.length) {
        dripMarketplaceOffer.garmentCollection?.garments[0].children.forEach(async (child: any) => {
          const info = await fetchTokenUri(child.tokenUri)
          children.push({
            ...info,
            id: child.id.split('-')[1]
          })
        })
      }

      setGarmentChildren(children)
      console.log('garmentChildren: ', children.length)
      // setDesigner(dripMarketplaceOffer.designer)
    }

    fetchDripInfo()

    const fetchViews = async () => {
      const viewData = await digitalaxApi.getViews('product', productId)
      setLoveCount(viewData && viewData[0] && viewData[0].loves ? viewData[0].loves.length : 0)
      setViewCount(viewData && viewData[0] && viewData[0].viewCount ? viewData[0].viewCount : 0)
      setIsFetchedViewCount(true)
    };

    const addViewCount = async () => {
      const data = await digitalaxApi.addView('product', productId)
      if (data) {
        setViewCount(data.viewCount)
      }
    }

    fetchViews()
    addViewCount()
  }, [])

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

  const addLove = async () => {
    const data = await digitalaxApi.addLove(account, user.randomString, 'product', productId);
    if (data && data['success']) {
      setLoveCount(loveCount + 1)
    }
  };

  const onClickLove = () => {
    addLove()
  }

  const onBespokeBtn = () => {
    setModalView('BESPOKE_VIEW')
    openModal()
  }

  useEffect(() => {}, [])

  console.log('product: ', product)

  return (
    <>
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
          <div className={s.productName}>
            {product.name}
          </div>
          <div className={s.mainBody}>
            <div className={s.leftSide}>
              <div className={cn(s.productDisplay, 'fit')}>
                <div className={s.sliderContainer}>
                  <div className={s.bodyWrapper}>
                    <ProductSlider key={product.id} imageId={curImgIndex} onSlide={setCurImgIndex}>
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
              </div>

              <div className={s.openCollectionButtonWrapper}>
                  <Button
                    aria-label="Add to Cart"
                    type="button"
                    className={s.button}
                    onClick={addToCart}
                    loading={loading}
                    disabled={!variant && product.options.length > 0}
                  >
                    <img src={`/images/black_update/gray_button2.png`} />
                    <div className={s.title}>
                      ADD TO CART
                    </div>
                  </Button>
                </div>

              <div className={s.previewImages}>
                {product.images.map((image, i) => (
                  <div key={image.url} className={[s.previewImg, i == curImgIndex ? s.selected : ''].join(' ')}>
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

              {
              garmentChildren?.length && (
                <>
                  <div className={s.childrenDescription}>
                    Open Source{' '}
                    <a href="https://designers.digitalax.xyz/fractional/" target="_blank">
                      Fractional Garment Ownership
                    </a>
                  </div>
                  <div className={s.childrenWrapper}>
                    {garmentChildren.map((child: any, index: number) => {
                      return (
                        <a
                          href={`https://opensea.io/assets/matic/0x567c7b3364ba2903a80ecbad6c54ba8c0e1a069e/${child.id}`}
                          target="_blank"
                          key={index}
                        >
                          {child.image_url ? (
                            <img src={reviseUrl(child.image_url)} />
                          ) : child.animation_url ? (
                            <video muted autoPlay loop>
                              <source src={reviseUrl(child.animation_url)} />
                            </video>
                          ) : null}
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className={s.sidebar}>
              <section>
                <div className={s.amount}>
                  {soldAmount} of {totalAmount}
                  <div className={s.helper}>
                    <span className={s.questionMark}>?</span>
                    <span className={s.description} >
                      Shipping takes approx 2 weeks. International can be longer.
                    </span>
                  </div>
                </div>
                <div className={s.lovesWrapper}>
                  <button type="button" className={s.loveButton} onClick={onClickLove}>
                    <img src="/images/like_icon.png" />
                  </button>

                  <div className={s.likeCount}>
                    {loveCount}
                    <span>LOVES</span>
                  </div>
                  <img src="/images/view_icon.png" />
                  <div className={s.viewCount}>
                    {viewCount}
                    <span>VIEWS</span>
                  </div>
                </div>
                <div className={s.productAttrs}>
                  {product.options?.sort((a, b) => {
                    const nameA = a.displayName
                    const nameB = b.displayName
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  }).map((opt) => (
                    <div className="pb-4 pr-6" key={opt.displayName}>
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
                  {/* <p className={s.openCollection}>Open Collection</p>
                   */}
                  <InfoCard
                    borderColor='white'
                    boxShadow2='inset 0px 0px 10px 10px rgba(255, 255, 255, 0.47)'
                    mainColor='rgba(95, 95, 95, 0.47)'
                  >
                    <div className={s.infoCard}>
                      <div className={s.skinName}>
                        <div className={s.text}> {rarity} </div>
                      </div>
                      <div className={s.description}>{product?.description}</div>
                    </div>
                  </InfoCard>
                </div>
                <div className={s.buttonWrapper}>
                  <PriceTag
                    backImageSrc='/images/black_update/gray_button3.png'
                    withoutDollarSign={true}
                    monaPrice={`${(monaPrice * Number(price.replaceAll('$', ''))).toFixed(2)}`}
                    dollarPrice={price}
                    description={'SALE PRICE'}
                  />
                </div>

                <button type="button" className={s.bespokeBtn} onClick={onBespokeBtn}>
                  Want something more Bespoke?
                </button>
                <a href="https://staking.digitalax.xyz/" target="_blank">
                  <button type="button" className={s.stakeBtn}>
                    STAKE YOUR FASHION FOR $MONA YIELD
                  </button>
                </a>
              </section>
            </div>
          </div>
        </div>
      </Container>
      {designer && (
        <>
          <section className={s.designerSection}>
            <video autoPlay loop muted className={s.video}>
              <source src="/images/designer-bg.mp4" type="video/mp4" />
            </video>
            <Container>
              <div className={s.designerBody}>
                <div className={s.title}> designer </div>
                <div className={s.data}>
                  <ImageCard imgUrl={designer.image} />
                  <div className={s.infoWrapper}>
                    <InfoCard>
                      <div className={s.name}> {designer.name} </div>
                      <div className={s.description}>
                        {designer.description}
                      </div>
                    </InfoCard>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </>
      )}
    </>
  )
}

export default ProductView
