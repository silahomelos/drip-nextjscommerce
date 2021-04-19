import { CollectionEdge } from '../schema'
import { getConfig, ShopifyConfig } from '../api'
import getAllCollectionsQuery from '../utils/queries/get-all-collections-query'

type ReturnType = {
  categories: Array<any>
}

const getAllCollections = async (options?: {
  variables?: any
  config: ShopifyConfig
  preview?: boolean
}) => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllCollectionsQuery, { variables })
  const edges = data.collections?.edges ?? []

  const categories = edges.map(
    ({
      node: { id: entityId, title: name, handle, description, image },
    }: CollectionEdge) => ({
      entityId,
      name,
      path: `/${handle}`,
      description,
      image,
    })
  )

  return {
    categories,
  }
}

export default getAllCollections
