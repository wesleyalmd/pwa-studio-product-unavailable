import { gql } from '@apollo/client';
import { ProductDetailsFragment } from '@magento/peregrine/lib/talons/RootComponents/Product/productDetailFragment.gql';

export const GET_CUSTOM_PRODUCT_DETAIL_QUERY = gql`
  query getProductDetailForProductPage($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        id
        stock_status
        ...ProductDetailsFragment
      }
    }
  }
  ${ProductDetailsFragment}
`;
