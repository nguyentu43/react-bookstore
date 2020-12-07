import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost/graphql';
const graphQLClient = new GraphQLClient(endpoint);

const token = localStorage.getItem('token');
if(token){
  graphQLClient.setHeader('authorization', 'Bearer ' + token);
}

export default graphQLClient;