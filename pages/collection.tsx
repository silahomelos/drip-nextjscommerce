import cn from 'classnames'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Container, GridContainer } from '@components/ui'
import { ProductItem } from '@components/product'

import { getConfig } from '@framework/api'
import useSearch from '@framework/product/use-search'
import getAllPages from '@framework/common/get-all-pages'
import getSiteInfo from '@framework/common/get-site-info'

import rangeMap from '@lib/range-map'

// TODO(bc) Remove this. This should come from the API
import getSlug from '@lib/get-slug'

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import { Product } from '@commerce/types'

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

  const activeCategory = categories.find(
    (cat) => getSlug(cat.path) === category
  )
  console.log(asPath)
  const { data } = useSearch({
    // TODO: Shopify - Fix this type
    categoryId: activeCategory?.entityId as any,
    // TODO: Shopify - Fix this typ
  })

  return (
    <Container>
      <GridContainer>
        {data &&
          data.products.slice(0, 5).map((product, i) => (
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
  )
}

Collectionpage.Layout = Layout
