import React from 'react'
import ProductTopBanner from '@components/common/ProductTopBanner'
import { Footer, Layout, TextSlider } from '@components/common'

export default function ShippingAndReturns() {
  return (
    <div className="">
      <ProductTopBanner showSlider={false} />
      <div className="container mx-auto my-10 mb-80">
        <h1 className="text-white text-6xl font-bold my-10">
          {' '}
          Shipping and Returns.{' '}
        </h1>
        <div
          className="text-white text-xl font-normal"
          style={{ fontFamily: 'Inter' }}
        >
          FLAT RATE US DOMESTIC AND WORLDWIDE shipping rates apply.
          <br />
          <br />
          FLAT Rate of usd$10 for us domestic orders and usd$15 for
          international shipping.
          <br />
          <br />
          There is a 14 day return window UPON DELIVERY. Please email
          drip@digitalax.xyz with a valid reason for your return.
          <br />
          <br />
          VALID REASONS include; missing or damaged items (please include a
          photo).
          <br />
          <br />
          IF YOU HAVE ALREADY CLAIMED YOUR 1155 MEME NFT THEN RETURNS ARE NO
          LONGER VALID FOR THAT SAME ITEM.
        </div>
      </div>
    </div>
  )
}

ShippingAndReturns.Layout = Layout
