import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'
import TextContent from '@components/ui/TextContent'
import Banner from '@components/ui/Banner'
import Container from '@components/ui/Container'
import StackedCard from '@components/ui/StackedCard'
import shortid from 'shortid'

import { getConfig } from '@framework/api'
import getProduct from '@framework/product/get-product'
import getAllPages from '@framework/common/get-all-pages'
import getAllProductPaths from '@framework/product/get-all-product-paths'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      pages,
      product,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          products.forEach((product) => {
            arr.push(`/${locale}/product${product.node.path}`)
          })
          return arr
        }, [])
      : products.map((product) => `/product${product.node.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cardTextIndex, setCardTextIndex] = useState(0)
  const [randomStr, setRandomStr] = useState('')
  const router = useRouter()
  const contentEl = useRef(null)
  const sticker1 = [
    'Rep Your Style IRL',
    'Crossover the DigiFizzy Realms',
    'Unlockable NFTs',
    'DeCo',
    'Hybrid Fashion',
  ]
  const onSelectCard = (index: number) => {
    setCardTextIndex(index)
    setRandomStr(shortid.generate())
  }

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <>
      <Banner>
        <Container>
          <div className="contentContainer">
            <div className="content" ref={contentEl}>
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
              <img
                className="content__img"
                src="/images/my_nft.jpg"
                alt="Some image"
              />
            </div>
          </div>
          <TextContent onSelectText={onSelectCard} />
          <StackedCard
            index={cardTextIndex}
            random={randomStr}
            contentRef={contentEl}
          />
        </Container>
      </Banner>
      <ProductView product={product as any} />
    </>
  )
}

Slug.Layout = Layout
