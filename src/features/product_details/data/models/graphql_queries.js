// ─── Product Details GraphQL Queries ───────────────────────────────────────
// Mirrors Flutter's ProductDetailsRemoteDataSource query logic

/**
 * Shared fragment for product details — all the fields we need.
 */
export const PRODUCT_DETAILS_FRAGMENT = `
  items {
    __typename uid id name sku stock_status
    small_image { url }
    price_range {
      minimum_price {
        regular_price { value currency }
        final_price { value currency }
        discount { amount_off percent_off }
      }
    }
    description { html }
    media_gallery { url label }
    rating_summary
    review_count
    reviews { items { summary text created_at nickname average_rating } }
  }
`;

/**
 * Query product by SKU (filter-based).
 */
export const productBySkuQuery = (sku) =>
  `query { products(filter: { sku: { eq: "${sku}" } }) { ${PRODUCT_DETAILS_FRAGMENT} } }`;

/**
 * Query product by search (fallback for numeric IDs or when SKU filter fails).
 */
export const productSearchQuery = (term) =>
  `query { products(search: "${term}") { ${PRODUCT_DETAILS_FRAGMENT} } }`;
