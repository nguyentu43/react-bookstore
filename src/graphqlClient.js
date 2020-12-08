import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'http://localhost/graphql';
const graphQLClient = new GraphQLClient(endpoint);


const token = localStorage.getItem('token');
if(token){
  graphQLClient.setHeader('authorization', 'Bearer ' + token);
}

export default graphQLClient;

export function request(query, variables){
  return graphQLClient.request(gql`${query}`, variables);
}