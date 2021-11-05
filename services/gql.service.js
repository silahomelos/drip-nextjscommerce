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

export const DIGITALAX_GARMENT_V2_COLLECTION_BY_ID = gql`
  query digitalaxGarmentV2Collection($id: ID!) {
    digitalaxGarmentV2Collection(id: $id) {
      id
      garments(first: 1000) {
        id
        name
        image
        animation
        description
        tokenUri
        primarySalePrice
        children {
          id
          tokenUri
        }
      }
      designer {
        id
        description
        name
        instagram
        twitter
        image
      }
      developer {
        id
        name
        description
        image
      }
    }
  }
`

export const DRIP_MARKETPLACE_OFFER_BY_ID = gql`
  query dripMarketplaceOffer($id: ID!) {
    dripMarketplaceOffer(id: $id) {
      id
      startTime
      endTime
      amountSold
      garmentCollection {
        id
        rarity
        garments(first: 1000) {
          id
          name
          image
          animation
          description
          tokenUri
          primarySalePrice
          children {
            id
            tokenUri
          }
        }
        designer {
          id
          description
          name
          instagram
          twitter
          image
        }
        developer {
          id
          name
          description
          image
        }
      }
    }
  }
`

export const DRIP_MARKETPLACE_OFFERS = gql`
  query dripMarketplaceOffers {
    dripMarketplaceOffers (first: 1000) {
      id
      startTime
      endTime
      amountSold
      garmentCollection {
        id
        garmentAuctionID
        rarity
        garments {
          id
          owner
          image
          name
          children {
            id
            childId
            tokenUri
          }
        }
      }
    }
  }
`
