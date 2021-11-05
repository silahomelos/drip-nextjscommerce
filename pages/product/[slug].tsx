import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { ProductView } from '@components/product'

import { getConfig } from '@framework/api'
import getProduct from '@framework/product/get-product'
import getAllPages from '@framework/common/get-all-pages'
import getAllProductPaths from '@framework/product/get-all-product-paths'
import ProductTopBanner from '@components/common/ProductTopBanner'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })
  console.log('this is before fetching all pages')
  const { pages } = await getAllPages({ config, preview })
  console.log('this is after fetching all pages!!!')
  const { product } = await getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  console.log('this is after fetching product!!!!!')

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
  console.log('this is after product paths')
  const { products } = await getAllProductPaths()
  console.log('this is after product paths !!!!!!!!')
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
  const router = useRouter()

  console.log('-- product: ', product)

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <>
      <ProductView product={product as any} />
    </>
  )
}

Slug.Layout = Layout
