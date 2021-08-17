import { gql } from 'graphql-request'

export const PAYABLE_TOKEN_REQUEST = gql`
  query payableTokenReport($id: ID) {
    payableTokenReport(id: $id) {
      id
      payload
      timestamp
    }
  }
`

export const DRIP_MARKETPLACE_PURCHASE_HISTORES = gql`
  query dripMarketplacePurchaseHistories($orderId: Int) {
    dripMarketplacePurchaseHistories(where: { orderId: $orderId }) {
      id
      orderId
      buyer
    }
  }
`

export const DIGITALAX_GARMENT_V2_COLLECTION_BY_ID = gql``
