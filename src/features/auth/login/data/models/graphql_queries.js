/**
 * GraphQLQueries.js
 * Mirrors Flutter's GraphQLQueries class.
 */
class GraphQLQueries {
  static instance = new GraphQLQueries();

  // 🔐 LOGIN MUTATION
  get loginMutation() {
    return `
      mutation GenerateCustomerToken($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
          token
        }
      }
    `;
  }

  // 👤 CUSTOMER QUERY
  get customerQuery() {
    return `
      query GetCustomer {
        customer {
          id
          firstname
          lastname
          email
          date_of_birth
          gender
          is_subscribed
          addresses {
            firstname
            lastname
            street
            city
            region {
              region_code
              region
            }
            postcode
            country_code
            telephone
          }
        }
      }
    `;
  }

  // 📦 CUSTOMER ORDERS QUERY
  get customerOrders() {
    return `
      query GetCustomerOrders($pageSize: Int = 20, $currentPage: Int = 1) {
        customer {
          orders(pageSize: $pageSize, currentPage: $currentPage) {
            total_count
            items {
              id
              order_number
              created_at
              status
              grand_total
              total_item_count
              items {
                product_name
                product_sku
                product_sale_price {
                  value
                  currency
                }
                quantity_ordered
              }
            }
          }
        }
      }
    `;
  }
}

export default GraphQLQueries.instance;
