import { request } from './graphqlClient';

export function login(variables) {
  return request(
    'query($email: String!, $password: String!){token: login(email: $email, password: $password)}',
    variables
  );
}

export function register(variables) {
  return request(
    'mutation($input: UserData){token: register(input: $input)}',
    variables
  );
}

export function requestResetPassword(variables) {
  return request(
    'mutation($email: String!){result: requestResetPassword(email: $email)}',
    variables
  );
}

export function verifyTokenAndResetPassword(variables) {
  return request(
    'mutation($token: String!, $password: String!){result: verifyTokenAndResetPassword(token: $token, password: $password)}',
    variables
  );
}

export function fetchUserInfo() {
  return request(
    'query{user: getUserInfo{name, isAdmin, email, id} cart:getUserCart{id, name, price, slug, discount, quantity, images{secure_url}}}'
  );
}

export function fetchUserOrder() {
  return request(
    'query{orders: getUserOrders{id, name, address, total, status,  phone, createdAt, items{id, name, price, discount, quantity, images{secure_url}}}}'
  );
}

export function addItemToCart(variables) {
  return request(
    'mutation ($input: CartItemData!){cart: addCartItem(input: $input){id, name, price, slug, discount, quantity, images}}',
    variables
  );
}

export function removeItemFromCart(variables) {
  return request(
    'mutation ($productID: ID!){cart: removeCartItem(productID: $productID){id, name, price, slug, discount, quantity, images}}',
    variables
  );
}

export function fetchProduct(variables) {
  return request(
    'query ($slug: String!){product: getProduct(slug: $slug){id, price, images{public_id, secure_url},discount,description,name, slug, authors{id, name}, category{id, name, parent{id, name, parent{id, name}}}}}',
    variables
  );
}

export function fetchProducts(variables) {
  return request(
    'query ($search: String, $offset: Int, $limit: Int){products: getProducts(search: $search, offset: $offset, limit: $limit){id, price, images{public_id, secure_url},discount,description,name, slug, authors{id, name}, category{id, name, parent{id, name, parent{id, name}}}}}',
    variables
  );
}

export function fetchCategories() {
  return request(
    'query {categories: getCategories{id, name, icon, children{id, name, icon, children{id}}, parent{id, name}}}'
  );
}

export function fetchAuthors() {
  return request('query {authors:getAuthors{id, name, avatar, books}}');
}

export function addWishlist(variables) {
  return request('mutation ($id: ID){result:addWishlist(id: $id)}', variables);
}

export function removeWishlist(variables) {
  return request(
    'mutation ($id: ID){result:removeWishlist(id: $id)}',
    variables
  );
}

export function getWishlist() {
  return request(
    'query{products: getWishlist{id, name, images{secure_url, public_id}, price, discount}}'
  );
}

export function getPaymentCode(variables) {
  return request(
    'query($total: Float!){code: getPaymentCode(total: $total)}',
    variables
  );
}

export function addOrder(variables) {
  return request(
    'mutation($input: OrderData!, $userID: ID){order: addOrder(input: $input, userID: $userID){id, status}}',
    variables
  );
}

export function logout() {
  localStorage.removeItem('token');
}
