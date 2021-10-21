import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useEffect, useState } from 'react'
import s from './ProductView.module.scss'

import { Swatch, ProductSlider } from '@components/product'
import { Button, Container, useUI } from '@components/ui'

import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem, useCart, useRemoveItem } from '@framework/cart'

import { getVariant, SelectedOptions } from '../helpers'
import DefiProductDetailTabs from './DefiProductDetailTabs'
import ProductDetailTabs from './ProductDetailTabs'
import Web3ProductDetailTabs from './Web3ProductDetailTabs'
import ProductTopBanner from '@components/common/ProductTopBanner'
import { useRouter } from 'next/router'
import { setProductId, setVariantId, useMain } from 'context'
import ImageCard from './ImageCard'
import InfoCard from './InfoCard'
import FashionList from './FashionLIst'
import { getDigitalaxGarmentV2CollectionById } from 'services/api.service'
import { TextSlider } from '@components/common'
import LookProductDetailTabs from './LookProductDetailsTabs'
import GlitchProductDetailTabs from './GlitchProductDetailTabs'

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
  const fashionData = [
    {
      title: 'DeFi Staking Functionality',
      description: `All NFTs can be staked in the DIGITALAX NFT Staking Contracts on Polygon for $MONA yield. This forms part of the broader Fashion x DeFi merger that DIGITALAX has undertaken to bring greater utility to metaversal fashion and also welcome multitudes more into web3 and DeFi. 

      What if you could earn more from what you wear? Wear to DeFi lets you put your fashion to work for you. We are melting the centralised exploitative crown to weave the fabric of a generative ecosystem.            
      `,
    },
    {
      title: 'Fractional Garment ERC-1155 Open Source Pattern',
      description: `Fractional Garment Ownership (FGO) sets forth the standard and dress code for the manufacture of digital fashion along the content supply chain. FGO leverages ERC Protocol standards across the Ethereum Blockchain and Polygon (Matic Network) for breaking down a master ERC-721 digital garment into its programmable and composable ERC-1155 elements of materials, patterns and textures.

      Here, we are using a variant on the ERC-998 standard, where each ERC-721 token can hold a balance of ERC-1155 NFTs. We coin this respectively the Parent and Child NFTs. This allows for other designers to leverage off of the open source digital libraries, incorporating the patterns, materials and textures into their master garments.`,
    },
    {
      title: '3D Model File Included',
      description: `All of the DIGITALAX digital fashion garment and accessory ERC-721 NFTs are backed by the underlying 3D model FBX file, stored in IPFS. This forms part of the platform’s broader pursuit for decentralising content distribution and access to it. The FBX file is one of the most popular and widely used 3D data interchange formats between 3D editors and game engines. There are still efficiency problems that exist with it, which DIGITALAX is working to solve through it’s DASH File Format architecture. `,
    },
  ]
  const [curImgIndex, setCurImgIndex] = useState(0)
  const { asPath } = useRouter()

  const collectionId = asPath.split('/')[2].split('-')[1]

  // Select the correct variant based on choices
  const variant = getVariant(product, choices)

  const handleOnclick = (i: number) => {
    setCurImgIndex(i)
  }

  useEffect(() => {
    const fetchDesignerInfo = async () => {
      const {
        digitalaxGarmentV2Collection,
      } = await getDigitalaxGarmentV2CollectionById(collectionId)
      console.log({ digitalaxGarmentV2Collection })
      setDesigner(digitalaxGarmentV2Collection.designer)
    }

    fetchDesignerInfo()
  }, [])

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

  const openDigifizzyWeb3FashionPage = () => {
    window.open('https://digifizzy.xyz/magazines/4/45/', '_blank')
  }

  const isOriginal = () => {
    return (
      asPath.includes('marketplace') ||
      asPath.includes('minecraft') ||
      asPath.includes('metameme')
    )
  }

  const isWeb3Url = () => {
    return asPath.includes('web3')
  }

  const isGlitch = () => {
    return asPath.includes('glitch')
  }

  const isLookUrl = () => {
    return asPath.includes('look')
  }

  const isDefiUrl = () => {
    return !(isLookUrl() || isOriginal() || isWeb3Url() || isGlitch())
  }

  useEffect(() => {}, [])

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
                <div className={s.openCollectionButtonWrapper}>
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
                  {isWeb3Url() && (
                    <Button
                      aria-label="Read More"
                      type="button"
                      className={s.web3ExtraButton}
                      onClick={openDigifizzyWeb3FashionPage}
                    >
                      <div>
                        Your NFT COntains more web3 fashion treasures! CHECK
                        HERE!
                      </div>
                    </Button>
                  )}
                </div>
                {isOriginal() && (
                  <ProductDetailTabs description={product.description} />
                )}
                {isWeb3Url() && (
                  <Web3ProductDetailTabs
                    description={product.description}
                    title={'About this NFT. '}
                  />
                )}
                {isLookUrl() && <LookProductDetailTabs />}
                {isGlitch() && <GlitchProductDetailTabs />}
                {isDefiUrl() && (
                  <DefiProductDetailTabs
                    description={product.description}
                    title={product.name}
                  />
                )}
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
      {designer ? (
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
          <FashionList fashionData={fashionData} />
        </>
      ) : (
        <TextSlider black />
      )}
    </>
  )
}

export default ProductView
