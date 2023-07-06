/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBdBTest = /* GraphQL */ `
  query GetBdBTest($id: ID!) {
    getBdBTest(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBdBTests = /* GraphQL */ `
  query ListBdBTests(
    $filter: ModelBdBTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBdBTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
