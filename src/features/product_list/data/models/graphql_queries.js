// ─── Product GraphQL Queries ───────────────────────────────────────────────
// Mirrors Flutter's ProductGraphQLQueries class

/**
 * Product type fragment — handles all Magento concrete types.
 * Mirrors Flutter's _productFragment.
 */
const PRODUCT_FIELDS = `
  uid id name sku stock_status
  small_image { url }
  price_range {
    minimum_price {
      regular_price { value currency }
      final_price { value currency }
      discount { amount_off percent_off }
    }
  }
`;

export const PRODUCT_FRAGMENT = `
  __typename
  ... on SimpleProduct { ${PRODUCT_FIELDS} }
  ... on ConfigurableProduct { ${PRODUCT_FIELDS} }
  ... on BundleProduct { ${PRODUCT_FIELDS} }
  ... on GroupedProduct { ${PRODUCT_FIELDS} }
  ... on VirtualProduct { ${PRODUCT_FIELDS} }
`;

/**
 * Builds a products query with category filter, sort, and pagination.
 * Mirrors Flutter's ProductGraphQLQueries.query().
 */
export const productsQuery = ({
  categoryId,
  sortField = 'position',
  sortDirection = 'ASC',
  page = 1,
  pageSize = 20,
}) => `{
  products(
    filter: { category_id: { eq: "${categoryId}" } }
    sort: { ${sortField}: ${sortDirection} }
    currentPage: ${page}
    pageSize: ${pageSize}
  ) {
    total_count
    items { ${PRODUCT_FRAGMENT} }
    aggregations {
      attribute_code label
      options { label value count }
    }
  }
}`;
