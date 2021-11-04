import cn from 'classnames'
import { FC, useRef, useState, useEffect } from 'react'
import s from './DropdownMenu.module.css'
import { Avatar } from '@components/common'
import ClickOutside from '@lib/click-outside'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import { setAccount, setChainId, setUser, setWallet, useMain } from 'context'
import { disconnectWallet } from 'services/network.service'
import { toast } from 'react-toastify'

interface DropdownMenuProps {
  open?: boolean
}

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  const [display, setDisplay] = useState(false)
  const { dispatch, wallet, account } = useMain()
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>

  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [display])

  const logout = async () => {
    try {
      disconnectWallet(wallet)
      dispatch(setWallet())
      dispatch(setAccount())
      dispatch(setChainId())
      dispatch(setUser(null))
      window.localStorage.removeItem('ACCOUNT')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('CHAIN_ID')
      window.localStorage.removeItem('CRYPTO_OPTION')
      window.localStorage.removeItem('WALLET')
    } catch (err) {
      toast.error((err as any).message)
    }
  }

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div>
        <button
          className={s.avatarButton}
          onClick={() => setDisplay(!display)}
          aria-label="Menu"
        >
          <div className="flex items-center space-x-2">
            <Avatar />
            <span>{account?.slice(0, 7)}...</span>
          </div>
        </button>
        {display && (
          <ul className={s.dropdownMenu} ref={ref}>
            <li>
              <a
                className={cn(s.link, 'border-t border-accents-2 mt-4')}
                onClick={() => logout()}
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </ClickOutside>
  )
}

export default DropdownMenu
