// ─── Category GraphQL Queries ──────────────────────────────────────────────
// Mirrors Flutter's CategoryGraphQLQueries class

/**
 * Fetches all root categories with their children (sidebar items).
 */
export const CATEGORIES_QUERY = `
  query {
    categories {
      items {
        children {
          id uid name image
          children { id uid name image }
        }
      }
    }
  }
`;

/**
 * Fetches a specific category by UID with its sub-categories.
 */
export const categoryByIdQuery = (uid) => `
  query {
    categories(filters: { category_uid: { eq: "${uid}" } }) {
      items {
        uid id name
        children {
          uid id name image
          children { uid id name image }
        }
      }
    }
  }
`;

/**
 * Fetches categories with dynamic filters.
 */
export const categoryWithFiltersQuery = (filterString) => `
  query {
    categories(${filterString}) {
      items {
        uid name
        children { uid name image }
        products {
          items { uid name sku small_image { url } }
        }
      }
    }
  }
`;
