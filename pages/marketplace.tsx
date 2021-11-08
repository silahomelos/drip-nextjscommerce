import { Layout } from '@components/common'
import React, { useState, useRef } from 'react'
import { GridContainer, Container } from '@components/ui'
import { Collection } from '@components/product'
import shortid from 'shortid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'
import getAllCollections from '@framework/product/get-all-collections'
import useSearch from '@framework/product/use-search'

import ProductTopBanner from '@components/common/ProductTopBanner'

import { getDripMarketplaceOffers } from 'services/api.service'
import { filterProducts } from '@lib/filter'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    // variables: { first: 12 },
    config,
    preview,
  })

  const { categories: collections } = await getAllCollections({
    config,
  })

  const {
    dripMarketplaceOffers,
  } = await getDripMarketplaceOffers()
  
  const { categories, brands } = await getSiteInfo({ config, preview })

  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products: products,
      collections: collections,
      categories,
      dripMarketplaceOffers,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  collections,
  dripMarketplaceOffers,
  brands,
  categories,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cardTextIndex, setCardTextIndex] = useState(0)
  const [randomStr, setRandomStr] = useState('')


  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('')


  const contentEl = useRef(null)
  const sticker1 = [
    'Rep Your Style IRL',
    'Crossover the DigiFizzy Realms',
    'Unlockable NFTs',
    'DeCo',
    'Hybrid Fashion',
  ]
  const order = [
    'glitched',
    'look',
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

  const getPrice = (product: any) => {
    return Number(product.price?.value) * Number(product.amountSold)
  }
  
  const getAmountSold = (product: any) => {
    return Number(product.amountSold)
  }
  
  const getStartTime = (product: any) => {
    return product.startTime
  }

  const wrappedCollections = collections.map(item => {
    const { data } = useSearch({  
      categoryId: item?.id as any,
    })

    const wrappedProducts = data?.products.map(item => {
      const collectionId = item?.slug?.split('-')[1]
      if (collectionId) {
        const foundDripItem = dripMarketplaceOffers.find((dripItem: any) => dripItem?.id === collectionId)
        
        if (foundDripItem && foundDripItem != undefined) {
          return {
            ...item,
            amountSold: foundDripItem.amountSold,
            startTime: foundDripItem.startTime,
            endTime: foundDripItem.endTime,
            rarity: foundDripItem.garmentCollection?.rarity
          }
        }
      }
      
      return item
    })

    return {
      ...item,
      totalSold: wrappedProducts?.map(item => getPrice(item)).reduce((a, b) => a + b),
      amountSold: wrappedProducts?.map(item => getAmountSold(item)).reduce((a, b) => a + b),
      startTime: wrappedProducts?.map(item => getStartTime(item)).reduce((a, b) => a > b ? a : b),
      products: wrappedProducts
    }
  })

  const filteredProducts = filterProducts([...wrappedCollections], filter, sortBy, true) || [];
  console.log('collections: ', collections)
  console.log('dripMarketplaceOffers: ', dripMarketplaceOffers)
  return (
    <>
      <ProductTopBanner showFilterbar filter={filter} setFilter={setFilter} setSortBy={setSortBy} />
      <Container>
        <GridContainer>
          {filteredProducts.map((collection) => {
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
