import { Layout } from '@components/common'
import React, { useEffect, useState, useRef } from 'react'
import { Grid, GridContainer, Hero, Container } from '@components/ui'
import { ProductCard, ProductItem, Collection } from '@components/product'
import TextContent from '@components/ui/TextContent'
import Banner from '@components/ui/Banner'
import StackedCard from '@components/ui/StackedCard'
import SliderTicker from '@components/common/SliderTicker'
import shortid from 'shortid'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'
import getAllCollections from '@framework/product/get-all-collections'
import ProductTopBanner from '@components/common/ProductTopBanner'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories: collections } = await getAllCollections({
    config,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      collections,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  collections,
  brands,
  categories,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cardTextIndex, setCardTextIndex] = useState(0)
  const [randomStr, setRandomStr] = useState('')
  const contentEl = useRef(null)
  const sticker1 = [
    'Rep Your Style IRL',
    'Crossover the DigiFizzy Realms',
    'Unlockable NFTs',
    'DeCo',
    'Hybrid Fashion',
  ]
  const order = [
    'web3',
    'Instadapp',
    'Bancor',
    'Maker',
    'Aave',
    'Pickle',
    'Force',
    'Polygon',
    'Opyn',
    'Poap',
    'Ruler',
    'Rari',
    'Fei',
    'Meta-Meme',
    'Minecraft',
  ]
  const onSelectCard = (index: number) => {
    setCardTextIndex(index)
    setRandomStr(shortid.generate())
  }

  return (
    <>
      <ProductTopBanner showSlider />
      <Container>
        <GridContainer>
          {order.map((item) => {
            const collection: any = collections.find((collection) =>
              collection.name.toLocaleLowerCase().includes(item.toLowerCase())
            )
            if (!collection) return <> </>
            return (
              <Collection
                key={collection.id}
                collection={collection}
                imgProps={{
                  width: 540,
                  height: 540,
                }}
              />
            )
          })}
        </GridContainer>
      </Container>
    </>
  )
}

Home.Layout = Layout
