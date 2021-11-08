import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import type { LineItem } from '@framework/types'
import useCart from '@framework/cart/use-cart'
import { Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import { setFromSignin, useMain } from 'context'

interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const { toggleSidebar, openModal, setModalView } = useUI()
  const { user, dispatch } = useMain()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  const signIn = () => {
    dispatch(setFromSignin(true))
    setModalView('CRYPTO_SIGNUP_VIEW')
    openModal()
  }

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          {user?.username ? (
            <li className={s.item}>
              <DropdownMenu />
            </li>
          ) : (
            <li className={s.item}>
              <button type="button" onClick={signIn} className={s.signinBtn}>
                {' '}
                sign in{' '}
              </button>
            </li>
          )}
          <li className={s.item} onClick={toggleSidebar}>
            <Bag className={s.cart} />
            {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
