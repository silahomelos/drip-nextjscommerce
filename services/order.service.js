import { API_TOKEN } from '@framework/const'

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const ACCESS_TOKEN = process.env.NEXT_SHOPIFY_ACCESS_TOKEN
const SECRET_ACCESS_KEY = process.env.NEXT_SHOPIFY_SECRET_ACCESS_KEY
const API_URL = `https://${ACCESS_TOKEN}:${SECRET_ACCESS_KEY}@${STORE_DOMAIN}/admin/api/2021-04/orders.json`

export const createDraftOrder = async (
  email,
  items,
  total,
  subTotal,
  shipping_address
) => {
  try {
    console.log(shipping_address)
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        order: {
          email,
          line_items: items,
          shipping_address,
          subtotal_price: subTotal,
          total_price: total,
          currency: 'USD',
        },
      }),
    })

    return res
  } catch (err) {
    throw err
  }
}
