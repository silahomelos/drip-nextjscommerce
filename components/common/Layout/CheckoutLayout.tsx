import { CommerceProvider } from '@framework'
import { defaultPageProps } from '@lib/defaults'
import type { Page } from '@framework/common/get-all-pages'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'

interface Props {
  pageProps: {
    pages?: Page[]
    commerceFeatures: Record<string, boolean>
  }
}

const CheckoutLayout: FC<Props> = ({
  children,
  pageProps: { commerceFeatures, ...pageProps },
}) => {
  const { locale = 'en-US', pathname, asPath } = useRouter()

  return (
    <CommerceProvider locale={locale}>
      <Navbar />
      {children}
      <Footer pages={pageProps.pages} />
    </CommerceProvider>
  )
}

export default CheckoutLayout
