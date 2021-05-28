import { FC, useState } from 'react'
import s from './ProductView.module.scss'

import { Tabs, Tab } from '@components/ui'
import ProductDetailSlider from './ProductDetailSlider'

const memeImages = [
  '/productDetails/1.png',
  '/productDetails/2.png',
  '/productDetails/3.png',
  '/productDetails/4.png',
  '/productDetails/5.png',
  '/productDetails/6.png',
  '/productDetails/7.png',
  '/productDetails/8.png',
  '/productDetails/9.png',
  '/productDetails/10.png',
  '/productDetails/11.png',
  '/productDetails/12.png',
  '/productDetails/13.png',
  '/productDetails/14.png',
  '/productDetails/15.png',
  '/productDetails/16.png',
  '/productDetails/17.png',
  '/productDetails/18.png',
  '/productDetails/19.png',
  '/productDetails/20.png',
  '/productDetails/21.png',
  '/productDetails/22.png',
  '/productDetails/23.png',
  '/productDetails/24.png',
  '/productDetails/25.png',
  '/productDetails/26.png',
  '/productDetails/27.png',
]

interface Props {
  description: string
}

const ProductDetailTabs: FC<Props> = ({ description }) => {
  return (
    <div className={s.tabSection}>
      <Tabs>
        <Tab title="REP YOUR DRIP">
          <div>{description}</div>
          <br />
          <hr />
          <br />
          <div className={s.tabContentWrapper}>
            <div className="hidden md:block">
              <div className={s.arrowWrapper}>
                <span className={s.clock}> ⏱ </span>
                <div className={s.arrow} />
              </div>
              <div className={s.tabListContent}>
                <div className={s.leftTab}>
                  <h3 className={s.tabListContentTitle}>WHAT WE GET NOW</h3>
                  <div className={s.tabListContentItems}>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>Apparel</p>
                      </div>
                    </div>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>Proof of Uniqueness on Each Item</p>
                      </div>
                    </div>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>Inventory Claim Ticket</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.rightTab}>
                  <h3 className={s.tabListContentTitle}>LATER</h3>
                  <div className={s.tabListContentItems}>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>UNIQUE Memetic ERC1155 NFT</p>
                      </div>
                      <div className={s.tabListContentItemSub}>
                        When Inventory is claimed
                      </div>
                    </div>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>DYNAMIC NFT</p>
                      </div>
                      <div className={s.tabListContentItemSub}>
                        4-6 Weeks After Launch
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block md:hidden text-center">
              <div className={s.arrowWrapperMobile}>
                <span className={s.clock}> ⏱ </span>
                <div className={s.arrow} />
              </div>
              <div className={s.tabListContentMobile}>
                <div className={s.leftTab}>
                  <h3 className={`${s.tabListContentTitle} mb-12`}>
                    WHAT WE GET NOW
                  </h3>
                  <div className={s.tabListContentItems}>
                    <div className={s.tabListContentItems}>
                      <div className={s.tabListContentItemWrapper}>
                        <div className={s.tabListContentItem}>
                          <p>Apparel</p>
                        </div>
                      </div>
                      <div className={s.tabListContentItemWrapper}>
                        <div className={s.tabListContentItem}>
                          <p>Proof of Uniqueness on Each Item</p>
                        </div>
                      </div>
                      <div className={s.tabListContentItemWrapper}>
                        <div className={s.tabListContentItem}>
                          <p>Inventory Claim Ticket</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.rightTab}>
                  <h3 className={`${s.tabListContentTitle} mb-4`}>LATER</h3>
                  <div className={s.tabListContentItems}>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>UNIQUE Memetic ERc1155 NFT</p>
                        <div className={s.tabListContentItemSub}>
                          When Inventory is claimed
                        </div>
                      </div>
                    </div>
                    <div className={s.tabListContentItemWrapper}>
                      <div className={s.tabListContentItem}>
                        <p>DYNAMIC NFT</p>
                        <div className={s.tabListContentItemSub}>
                          4-6 Weeks After Launch
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${s.bottomArrow} w-full flex justify-center h-12`}
                >
                  <div className={`${s.arrow} w-2 relative h-full`} />
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab title="Memes for the Metaverse">
          <ProductDetailSlider content={memeImages} />
          <hr className="my-6" />
          <div className="flex justify-between">
            <a
              target="_blank"
              href="https://blog.digitalax.xyz/digitalax-x-polygon-take-on-fashion-sustainability-mass-adoption-w-the-first-real-digifizzy-dcd814bd7a42"
              className={s.tabListContentTitle}
            >
              <span className={s.desktop}>MORE ABOUT DIGI-FIZZY</span>
              <span className={s.mobile}> ABOUT </span>
            </a>
            <a
              target="_blank"
              href="https://blog.digitalax.xyz/from-memes-to-the-metaverse-3900ee517a25"
              className={s.tabListContentTitle}
            >
              <span className={s.desktop}>MEMES + METAVERSE</span>
              <span className={s.mobile}> METAVERSE </span>
            </a>
            <a
              target="_blank"
              href="https://blog.digitalax.xyz/counter-propaganda-memetic-patches-hybrid-digital-physical-fashion-nft-drip-launch-ea725cef4f2e"
              className={s.tabListContentTitle}
            >
              <span className={s.desktop}>MEMETIC PATCHES</span>
              <span className={s.mobile}>MEMES</span>
            </a>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default ProductDetailTabs
