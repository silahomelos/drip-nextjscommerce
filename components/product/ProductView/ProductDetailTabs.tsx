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

const ProductDetailTabs: FC = () => {
  return (
    <div className={s.tabSection}>
      <Tabs>
        <Tab title="REP YOUR DRIP">
          <div>
            We are seeking a logo and graphic designer. I really like your
            resume and hope we can cooperate. Also, mention the word bingo to
            prove that you read the entire e requirement for the job.
          </div>
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
                        <p>UNIQUE Memetic ERc1155 NFT</p>
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
            <div className={s.tabListContentTitle}> MORE ABOUT DIGI-FIZZY </div>
            <div className={s.tabListContentTitle}> SHIPPING & RETURNS</div>
            <div className={s.tabListContentTitle}> TERMS OF USE </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default ProductDetailTabs
