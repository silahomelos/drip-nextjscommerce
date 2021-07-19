import type { Product } from '@commerce/types'

export type SelectedOptions = {
  size?: string | null
  color: string | null
}

export function getVariant(product: Product, opts: SelectedOptions) {
  const selectedOpts = { ...opts }
  if (
    !product.variants.find((variant) =>
      variant.options.find(
        (option) => option.displayName.toLowerCase() === 'size'
      )
    )
  ) {
    delete selectedOpts.size
  }
  const variant = product.variants.find((variant) => {
    return Object.entries(selectedOpts).every(([key, value]) =>
      variant.options.find((option) => {
        if (
          option.__typename === 'MultipleChoiceOption' &&
          option.displayName.toLowerCase() === key.toLowerCase()
        ) {
          return option.values.find((v) => v.label.toLowerCase() === value)
        }
      })
    )
  })
  return variant
}
