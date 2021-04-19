const getSiteCollectionsQuery = /* GraphQL */ `
  query getSiteCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            originalSrc
            altText
            width
            height
          }
        }
      }
    }
  }
`
export default getSiteCollectionsQuery
