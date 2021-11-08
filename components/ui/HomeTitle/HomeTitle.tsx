import React from 'react'
import { useRouter } from 'next/router'
import s from './HomeTitle.module.scss'

type Props = {
  pageType?: number,
}

const HomeContent: React.FC<Props> = ({ pageType = 'collection' }) => {
  const { asPath } = useRouter()

  return (
    <div className={s.homeTitleContainer}>
      {
        <div className={s.titleWrapper}>
          <div className={s.title}>
            PHYSICAL INDIE <br />WEB3 FASHION
          </div>
          <div className={s.subTitle}>
            Powered by the <a href='https://designers.digitalax.xyz/global/' target='_self'>Global Designer Network</a> on Polygon Network.
          </div>
        </div>
      }
    </div>
  )
}

export default HomeContent
