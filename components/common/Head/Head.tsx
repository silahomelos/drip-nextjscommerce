import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import config from '@config/seo.json'

const Head: FC = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
        <link
          rel="preload"
          href="/fonts/Animosa-Regular.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Roboto-Blod.ttf"
          as="font"
          crossOrigin=""
        />
        <script src="/js/TweenMax.min.js"></script>
      </NextHead>
    </>
  )
}

export default Head
