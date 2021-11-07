import Checkout from '@components/checkout'
import { CheckoutLayout } from '@components/common/Layout'

export default function CheckoutCart() {
  return (
    <div className="bg-black text-white">
      <Checkout />
    </div>
  )
}

CheckoutCart.Layout = CheckoutLayout
