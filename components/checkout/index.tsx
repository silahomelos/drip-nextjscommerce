import { FC, useEffect, useState } from 'react'
import { Button, useUI } from '@components/ui'
import { useCart, useRemoveItem } from 'framework/shopify/cart'
import usePrice from '@commerce/product/use-price'
import { CartItem } from '@components/cart'
import { setBuyNowStatus, useMain } from 'context'
import { purchaseOrder } from 'services/order.service'
import router from 'next/router'
import { setWeb3Provider } from 'services/web3-provider.service'

interface Props {}

const Checkout: FC<Props> = () => {
  const { data, isLoading, isEmpty } = useCart()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [province, setProvince] = useState('')
  const [code, setCode] = useState('')
  const [valid, setValid] = useState<Array<string>>([])
  const { dispatch, account, crypto, cryptoPrice, buyNowStatus } = useMain()
  const { closeSidebar, setModalView, openModal } = useUI()
  const removeItem = useRemoveItem()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: shipPrice } = usePrice(
    data && {
      amount: Number(data.totalPrice - data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )

  const onValidate = () => {
    const validations = []
    if (!email.length) {
      validations.push('email')
    }
    if (!firstName.length) {
      validations.push('firstName')
    }
    if (!lastName.length) {
      validations.push('lastName')
    }
    if (!address1.length) {
      validations.push('address1')
    }
    if (!city.length) {
      validations.push('city')
    }
    if (!country.length) {
      validations.push('country')
    }
    if (!province.length) {
      validations.push('province')
    }
    if (!code.length) {
      validations.push('code')
    }

    if (
      email.length &&
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
      )
    ) {
      validations.push('emailInValid')
    }

    return validations
  }

  const getIdFromUrl = (url: string) => {
    const nodes = url.split('/')
    return nodes[nodes.length - 1]
  }

  const getCollectionId = (url: string) => {
    const path = url.split('/products/')[1]
    return parseInt(path.split('-')[1])
  }

  const onConfirm = async () => {
    const validations = onValidate()
    if (validations.length) {
      setValid(validations)
    } else {
      setModalView('CRYPTO_OPTIONS_VIEW')
      openModal()
    }
  }

  useEffect(() => {
    const order = async () => {
      // setWeb3Provider(wallet)
      const { order } = await (
        await fetch('/api/order', {
          method: 'POST',
          body: JSON.stringify({
            email,
            lineItems: data?.lineItems.map((item) => ({
              title: item.name,
              quantity: item.quantity,
              price: item.variant.price,
              product_id: getIdFromUrl(atob(item.productId)),
              variant_id: getIdFromUrl(atob(item.variantId)),
              variant_title: item.variant.name,
              sku: item.variant.sku,
            })),
            shipping_address: {
              address1: address1,
              address2: address2,
              city: city,
              country: country,
              first_name: firstName,
              last_name: lastName,
              province: province,
              zip: code,
            },
            total: data?.totalPrice,
            subTotal: data?.subtotalPrice,
          }),
        })
      ).json()
      const { id, order_number } = order
      const promises = []

      try {
        const { promise, unsubscribe } = await purchaseOrder({
          account,
          orderNumber: order_number,
          crypto,
          cryptoPrice: (data?.lineItems[0].variant.price || 0) * cryptoPrice,
          collectionId: getCollectionId(data?.lineItems[0].path || ''),
          shippingPrice: 0,
        })
        promise
          .then((hash) => {
            removeItem((data?.lineItems || [])[0])
            dispatch(setBuyNowStatus(2))
            unsubscribe()
          })
          .catch((error) => {
            console.log(error)
            dispatch(setBuyNowStatus(3))
            unsubscribe()
            throw error
          })
      } catch (err) {
        dispatch(setBuyNowStatus(3))
        console.log(err)
        throw err
      }

      /* this is for multi items  */

      // await Promise.all(
      //   data?.lineItems.map(async (item) => {
      //     for (let i = 0; i < item.quantity; i += 1) {
      //       const res = purchaseOrder({
      //         account,
      //         orderNumber: order_number,
      //         orderId: id,
      //         crypto,
      //         cryptoPrice: item.variant.price / cryptoPrice,
      //         collectionId: getCollectionId(item.path),
      //         shippingPrice: 0,
      //       })
      //       promises.push(res)
      //     }
      //   }) || []
      // )
    }

    if (buyNowStatus === 1) {
      order()
    }
  }, [buyNowStatus])

  return (
    <div className="container mx-auto h-screen">
      <div className="flex h-full">
        <div className="w-3/5 p-10">
          <div className="uppercase text-3xl">digitalax drip</div>
          <div className="flex flex-col space-y-3 mb-5">
            <h1 className="text-lg"> Contact information </h1>
            <div className="w-full">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="grid-email"
              />
              {valid.includes('emailInValid') ? (
                <span className="text-red-500 text-xs italic">
                  Email is not valid.
                </span>
              ) : null}
              {valid.includes('email') ? (
                <span className="text-red-500 text-xs italic">
                  Please fill out this field.
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col space-y-3 mb-5">
            <h1 className="text-lg"> Shipping address </h1>
            <div className="w-full flex space-x-2">
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                  id="grid-first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {valid.includes('firstName') ? (
                  <span className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                  id="grid-last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {valid.includes('lastName') ? (
                  <span className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
            </div>
            <div className="w-full">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="grid-address"
              >
                Address1
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                id="grid-address"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              {valid.includes('address1') ? (
                <span className="text-red-500 text-xs italic">
                  Please fill out this field.
                </span>
              ) : null}
            </div>
            <div className="w-full">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="grid-address"
              >
                Address2
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                id="grid-address"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                id="grid-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {valid.includes('city') ? (
                <span className="text-red-500 text-xs italic">
                  Please fill out this field.
                </span>
              ) : null}
            </div>
            <div className="w-full flex space-x-2">
              <div className="w-1/3">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="grid-country"
                >
                  Country
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                  id="grid-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {valid.includes('country') ? (
                  <span className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
              <div className="w-1/3">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="grid-province"
                >
                  Province
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                  id="grid-province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
                {valid.includes('province') ? (
                  <span className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
              <div className="w-1/3">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold"
                  htmlFor="grid-code"
                >
                  Postal code
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 leading-tight"
                  id="grid-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {valid.includes('code') ? (
                  <span className="text-red-500 text-xs italic">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <Button variant="slim" onClick={onConfirm}>
            Confirm Shipping Address
          </Button>
        </div>
        <div className="w-2/5 bg-gray-100 p-10 flex flex-col space-3 h-full">
          <ul className="py-6 flex-grow overflow-auto space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-2 border-b border-accents-2">
            {data?.lineItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                currencyCode={data?.currency.code!}
              />
            ))}
          </ul>
          <hr />
          <div className="flex items-center justify-between py-1">
            <span className="font-bold">Sub Total</span>
            <span>
              {' '}
              {subTotal}{' '}
              {cryptoPrice ? (
                <>({(cryptoPrice * Number(data?.subtotalPrice)).toFixed(2)})</>
              ) : null}{' '}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="font-bold">Ship Price</span>
            <span>
              {' '}
              {shipPrice}
              {cryptoPrice ? (
                <>
                  (
                  {(
                    cryptoPrice *
                    (Number(data?.totalPrice) - Number(data?.subtotalPrice))
                  ).toFixed(2)}
                  )
                </>
              ) : null}
            </span>
          </div>
          <hr />
          <div className="flex items-center justify-between py-1">
            <span className="font-bold">Total</span>
            <span className="text-2xl">
              {total}
              {cryptoPrice ? (
                <>({(cryptoPrice * Number(data?.totalPrice)).toFixed(2)})</>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
