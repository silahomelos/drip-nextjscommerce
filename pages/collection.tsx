import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@components/common'
import { Container, GridContainer } from '@components/ui'
import { ProductItem } from '@components/product'
import Banner from '@components/ui/Banner'
import StackedCard from '@components/ui/StackedCard'
import SliderTicker from '@components/common/SliderTicker'
import TextContent from '@components/ui/TextContent'
import shortid from 'shortid'

import { getConfig } from '@framework/api'
import useSearch from '@framework/product/use-search'
import getAllPages from '@framework/common/get-all-pages'
import getSiteInfo from '@framework/common/get-site-info'

// TODO(bc) Remove this. This should come from the API
import getSlug from '@lib/get-slug'

import { useSearchMeta } from '@lib/search'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const { categories, brands } = await getSiteInfo({ config, preview })
  return {
    props: {
      pages,
      categories,
      brands,
    },
  }
}

export default function Collectionpage({
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const router = useRouter()
  const { asPath } = router
  const { category } = useSearchMeta(asPath)

  const [cardTextIndex, setCardTextIndex] = useState(0)
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

  const activeCategory = categories.find(
    (cat) => getSlug(cat.path) === category
  )
  console.log(asPath)
  const { data } = useSearch({
    // TODO: Shopify - Fix this type
    categoryId: activeCategory?.entityId as any,
    // TODO: Shopify - Fix this typ
  })

  const [countProductGroup, setCountProductGroup] = useState<Array<number>>()
  const [randomStr, setRandomStr] = useState('')
  const contentEl = useRef(null)

  useEffect(() => {
    let arr = new Array<number>(0)
    if (data && data.products) {
      for (let i = 0; i < data.products.length / 4; i++) {
        arr.push(i)
      }
    }
    setCountProductGroup(arr)
  }, [data])

  return (
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
      {countProductGroup &&
        countProductGroup.map((item, index) => (
          <div>
            <SliderTicker sliderList={sticker1} />
            <Container>
              <GridContainer>
                {data &&
                  data.products
                    .slice(index * 4, (index + 1) * 4)
                    .map((product, i) => (
                      <ProductItem
                        key={product.id}
                        product={product}
                        imgProps={{
                          width: 540,
                          height: 540,
                        }}
                      />
                    ))}
              </GridContainer>
            </Container>
          </div>
        ))}
      <SliderTicker sliderList={sticker1} />
    </>
  )
}

Collectionpage.Layout = Layout
