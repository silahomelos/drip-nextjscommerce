import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import type { LineItem } from '@framework/types'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/customer/use-customer'
import { Avatar } from '@components/common'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import { useMain } from 'context'

interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const { account } = useMain()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item} onClick={toggleSidebar}>
            <Bag />
            {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
          </li>
          {/* {process.env.COMMERCE_WISHLIST_ENABLED && (
            <li className={s.item}>
              <Link href="/wishlist">
                <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                  <Heart />
                </a>
              </Link>
            </li>
          )} */}
          {account ? (
            <li className={s.item}>
              <DropdownMenu />
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
