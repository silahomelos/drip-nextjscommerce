import { FC, useState } from 'react'
import s from './ProductView.module.scss'

import { Tabs, Tab } from '@components/ui'
import ProductDetailSlider from './ProductDetailSlider'

const memeImages = [
  '/productDetails/Digital_Fashion_Anti_Fast_Fashion.png',
  '/productDetails/Digital_Fashion_Democratizing_Design.png',
  '/productDetails/Digital_Fashion_Haute_Couture_4u.png',
  '/productDetails/Exploitation_in_Esports_Fan-Based_Digital_Labor copy.png',
  '/productDetails/Exploitation_in_Esports_Rosterpocalypse copy.png',
  '/productDetails/Exploitation_in_Esports_Underpaid_Freelancers copy.png',
  '/productDetails/Exploitation_in_Fashion_End_User_Clutter.png',
  '/productDetails/Exploitation_in_Fashion_Fast_Fashion_Slow_Death.png',
  '/productDetails/Exploitation_in_Fashion_Sweatshops.png',
  '/productDetails/Exploitation_in_Fashion_Upholding_Patriarchy.png',
  '/productDetails/Exploitation_in_Gaming_Crunch_Time.png',
  '/productDetails/Exploitation_in_Gaming_Discrimination.png',
  '/productDetails/Exploitation_in_Gaming_Layoffs.png',
  '/productDetails/Exploitation_in_Gaming_Sexism.png',
  '/productDetails/Exploitation_in_Gaming_Starving_Creator_No_More.png',
  '/productDetails/Player_Creator_Economies_Casual_Esports.png',
  '/productDetails/Player_Creator_Economies_Digital_Economy copy.png',
  '/productDetails/Player_Creator_Economies_Layer3_Web3 copy.png',
  '/productDetails/Skin_Game_Gambling_Casino_Fortress.png',
  '/productDetails/Skin_Game_Gambling_Global_Offensive.png',
  '/productDetails/Skin_Game_Gambling_Loot_Box_Gambling.png',
  '/productDetails/Skin_Game_Gambling_Skincoin.png',
  '/productDetails/Skin_Game_Gambling_Slot_Machine_Logic.png',
  '/productDetails/Skin_Game_Gambling_Whaling.png',
  '/productDetails/Sustainability_Green_NFTs.png',
  '/productDetails/Sustainability_Post_Materialism.png',
  '/productDetails/Sustainablity_Basic_Income.png',
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
        <Tab title="MORE INFORMATION">
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
