import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.REACT_APP_END_POINT;
const graphQLClient = new GraphQLClient(endpoint);

const token = localStorage.getItem('token');
if (token) {
  graphQLClient.setHeader('authorization', 'Bearer ' + token);
}

export default graphQLClient;

export function request(query, variables) {
  return graphQLClient.request(
    gql`
      ${query}
    `,
    variables
  );
}

export function rawRequest(query, variables) {
  return graphQLClient.rawRequest(
    gql`
      ${query}
    `,
    variables
  );
}
