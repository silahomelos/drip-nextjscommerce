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
  query dripMarketplacePurchaseHistories($orderId: Number) {
    dripMarketplacePurchaseHistories(where: { orderId: $orderId }) {
      id
      orderId
      buyer
    }
  }
`
