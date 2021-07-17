import { API_TOKEN } from '@framework/const'
import { contracts, tokens } from '../constants'
import {
  getDripMarketplaceContract,
  getTokenContract,
} from './contract.service'

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
    const res = await (
      await fetch(API_URL, {
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
            financial_status: 'authorized',
            currency: 'USD',
          },
        }),
      })
    ).json()

    return res
  } catch (err) {
    throw err
  }
}

export const purchaseOrder = async ({
  account,
  chainId,
  orderNumber,
  orderId,
  collectionId,
  crypto,
  cryptoPrice,
  shippingPrice,
}) => {
  const contract = await getDripMarketplaceContract(chainId)
  const dripMarketplaceAddress = contracts.DRIP_MARTKETPLACE.address[chainId]

  if (crypto !== 'matic') {
    const tokenContract = await getTokenContract(crypto)
    await tokenContract.methods
      .approve(dripMarketplaceAddress, 20000000000)
      .send({ from: account })
  }

  try {
    const listener = contract.methods
      .buyOffer(
        collectionId,
        tokens[crypto].address,
        orderNumber,
        shippingPrice
      )
      .send({ from: account, value: cryptoPrice * 1e18 })

    const promise = new Promise((resolve, reject) => {
      listener.on('error', (error) => reject(error))
    })
    return promise
  } catch (err) {
    console.log(err)
    throw err
  }
}
