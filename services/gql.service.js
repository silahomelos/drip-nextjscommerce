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
