import { FC } from 'react'
import Link from 'next/link'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import NavbarRoot from './NavbarRoot'
import s from './Navbar.module.scss'

const Navbar: FC = () => (
  <NavbarRoot>
    <Container>
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className={`${s.navLeft} flex items-center`}>
          <div className={s.branding}>
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <span className={`${s.brand} text--uppercase fw-normal`}>
                  Digitalax{' '}
                </span>
                <span className={s.subBrand}>The Digital Fashion Engine</span>
              </a>
            </Link>
          </div>
          <nav className={`${s.navItems} hidden ml-6 space-x-4 lg:block`}>
            <Link href="/search">
              <a className={s.link}>SUIT UP IN YOUR GAME SKINS</a>
            </Link>
            <Link href="/search?q=clothes">
              <a className={s.link}>OG MARKETPLACE</a>
            </Link>
            <Link href="/search?q=accessories">
              <a className={s.link}>GLOBAL DESIGNER NETWORK</a>
            </Link>
            <Link href="/search?q=shoes">
              <a className={s.link}>TOKEN SWAP </a>
            </Link>
            <Link href="/search?q=shoes">
              <a className={s.link}>MATIC-ETH BRIDGE </a>
            </Link>
          </nav>
        </div>

        <div className="flex justify-end">
          <UserNav />
        </div>
      </div>
    </Container>
  </NavbarRoot>
)

export default Navbar
