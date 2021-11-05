import React, { FC } from 'react'
import classnames from 'classnames'
import styles from './styles.module.scss'
import { Filters } from '@components/ui'

interface Props {
  className?: string
  isHomePage?: boolean
  filter: string
  setFilter(value: string): void
  setSortBy(sort: string): void
}

const HeroBar: FC<Props> = ({ className, isHomePage = false, filter, setFilter, setSortBy }) => {
  const classes = classnames(styles.wrapper, className);
  return (
    <div className={[classes, isHomePage ? styles.isHomePage : ''].join(' ')}>
      {isHomePage
        ? <div className={styles.viewAllFashion}>
            <a href='' target='_blank'>
              {`VIEW ALL FASHION >`}
            </a>
          </div>
        : <div className={styles.leftPane}>
            Can't Find What You're Looking For?
            <span>{' '}Get<br/>
            <a href="https://designers.digitalax.xyz/getdressed/" target="_blank"> Bespoke Dressed Here.</a></span>
          </div>
      }
      {setFilter ? <div className={styles.filter}>
        <Filters filter={filter} filterChange={setFilter} sortByChange={setSortBy} />
      </div> : null}
    </div>
  )
}

export default HeroBar
