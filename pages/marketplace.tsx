import { Layout } from '@components/common'
import React, { useEffect, useState } from 'react'
import { Grid, GridContainer, Hero, Container } from '@components/ui'
import { ProductCard, ProductItem, Collection } from '@components/product'
import TextContent from '@components/ui/TextContent'
import Banner from '@components/ui/Banner'
import StackedCard from '@components/ui/StackedCard'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'
import getAllCollections from '@framework/product/get-all-collections'

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
  const onSelectCard = (index: number) => {
    setCardTextIndex(index)
  }

  return (
    <>
      <Banner>
        <Container>
          <TextContent onSelectText={onSelectCard} />
          <StackedCard index={cardTextIndex} />
        </Container>
      </Banner>
      <Container>
        <GridContainer>
          {collections.slice(0, 5).map((collection, i) => (
            <Collection
              key={collection.id}
              collection={collection}
              imgProps={{
                width: 540,
                height: 540,
              }}
            />
          ))}
        </GridContainer>
      </Container>
    </>
  )
}

Home.Layout = Layout
