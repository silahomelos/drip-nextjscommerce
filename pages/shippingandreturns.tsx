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
          FLAT RATE US DOMESTIC AND WORLDWIDE Shipping Rates apply.
          <br />
          <br />
          Flat Rate of USD$10 for US Domestic Orders and USD$15 for
          International Shipping.
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
          IF YOU HAVE ALREADY CLAIMED YOUR 1155 NFT THEN RETURNS ARE NO
          LONGER VALID FOR THAT SAME ITEM. All instructions for NFT claiming will be sent over email. 
        </div>
      </div>
    </div>
  )
}

ShippingAndReturns.Layout = Layout
