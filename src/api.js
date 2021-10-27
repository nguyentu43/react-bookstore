import { request } from './graphqlClient';

export function login(variables) {
  return request(
    'query($email: String!, $password: String!){token: login(email: $email, password: $password)}',
    variables
  );
}

export function register(variables) {
  return request(
    'mutation($input: RegisterData!){token: register(input: $input)}',
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
    'mutation ($input: CartItemData!){cart: addCartItem(input: $input){id, name, price, slug, discount, quantity, images{secure_url}}}',
    variables
  );
}

export function removeItemFromCart(variables) {
  return request(
    'mutation ($productID: ID!){cart: removeCartItem(productID: $productID){id, name, price, slug, discount, quantity, images{secure_url}}}',
    variables
  );
}

export function fetchProduct(variables) {
  return request(
    'query ($slug: String!){product: getProduct(slug: $slug){id, price, ratings{id, title, user{id, name}, comment, rate, createdAt} images{public_id, secure_url},discount,description,name, slug, authors{id, name}, category{id, name, parent{id, name, parent{id, name}}}}}',
    variables
  );
}

export function fetchProducts(variables) {
  return request(
    'query ($search: String, $offset: Int, $limit: Int){products: getProducts(search: $search, offset: $offset, limit: $limit){id, price, images{public_id, secure_url},discount,description,name, slug, authors{id, name}, category{id, name, parent{id, name, parent{id, name}}}}}',
    variables
  );
}

export function fetchRecommendationProducts(variables) {
  return request(
    'query ($offset: Int=0, $limit: Int=10){products: getRecommendationProducts(offset: $offset, limit: $limit){id, price, images{public_id, secure_url},discount,description,name, slug, authors{id, name}, category{id, name, parent{id, name, parent{id, name}}}}}',
    variables
  );
}

export function fetchCategories() {
  return request(
    'query {categories: getCategories{id, name, icon, children{id, name, icon, children{id}}, parent{id, name}}}'
  );
}

export function addCategory(variables) {
  return request(
    'mutation($input: CategoryData){result: addCategory(input: $input){id}}',
    variables
  );
}

export function updateCategory(variables) {
  return request(
    'mutation($id: ID, $input: CategoryData){result: updateCategory(id: $id, input: $input){id}}',
    variables
  );
}

export function removeCategory(variables) {
  return request(
    'mutation($id: ID){result:removeCategory(id: $id)}',
    variables
  );
}

export function addAuthor(variables) {
  return request(
    'mutation($input: AuthorData){result: addAuthor(input: $input){id}}',
    variables
  );
}

export function updateAuthor(variables) {
  return request(
    'mutation($id: ID, $input: AuthorData){result: updateAuthor(id: $id, input: $input){id}}',
    variables
  );
}

export function removeAuthor(variables) {
  return request('mutation($id: ID){result:removeAuthor(id: $id)}', variables);
}

export function fetchAuthors() {
  return request(
    'query {authors:getAuthors{id, name, avatar, books, description}}'
  );
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
    'query($total: Int!){code: getPaymentCode(total: $total)}',
    variables
  );
}

export function fetchUsers() {
  return request('query{users: getUsers{id, name, email, isAdmin}}');
}

export function addUser(variables) {
  return request(
    'mutation($input: UserData!){result: addUser(input: $input){id}}',
    variables
  );
}

export function updateUser(variables) {
  return request(
    'mutation($id: ID!, $input: UserData!){result: updateUser(id: $id, input: $input){id}}',
    variables
  );
}

export function removeUser(variables) {
  return request('mutation($id: ID!){result: removeUser(id: $id)}', variables);
}

export function addProduct(variables) {
  return request(
    'mutation($input: ProductData!){result: addProduct(input: $input){id}}',
    variables
  );
}

export function updateProduct(variables) {
  return request(
    'mutation($id: ID!, $input: ProductData!){result: updateProduct(id: $id, input: $input){id}}',
    variables
  );
}

export function removeProduct(variables) {
  return request(
    'mutation($id: ID!){result: removeProduct(id: $id)}',
    variables
  );
}

export function fetchOrders() {
  return request(
    'query{orders: getOrders{id, name, address, total, status, user{email, id, name},phone, createdAt, items{id, name, price, discount, quantity, images{secure_url}}}}'
  );
}

export function checkout(variables) {
  return request(
    'mutation($input: OrderData!){order: checkout(input: $input){id, status}}',
    variables
  );
}

export function addOrder(variables) {
  return request(
    'mutation($input: OrderData!, $userID: ID){order: addOrder(input: $input, userID: $userID){id, status}}',
    variables
  );
}

export function updateOrder(variables) {
  return request(
    'mutation($input: OrderData!, $id: ID!){result: updateOrder(input: $input, id: $id){id, status}}',
    variables
  );
}

export function removeOrder(variables) {
  return request('mutation($id: ID!){result: removeOrder(id: $id)}', variables);
}

export function uploadImages(variables) {
  return request(
    `
      mutation($files: [Upload!], $urls: String) {
        uploadImages(files: $files, urls: $urls) {
          public_id
        }
      }
    `,
    variables
  );
}

export function deleteImages(variables) {
  return request(
    `
      mutation($public_ids: [String!]) {
        removeImages(public_ids: $public_ids)
      }
    `,
    variables
  );
}

export function addRating(variables) {
  return request(
    `
      mutation($input: RatingData, $userID: ID!, $productID: ID!) {
        addRating(input: $input, userID: $userID, productID: $productID){
          title, rate, comment
        }
      }
    `,
    variables
  );
}

export function updateRating(variables) {
  return request(
    `
      mutation($input: RatingData, $userID: ID!, $id: ID!) {
        updateRating(input: $input, userID: $userID, id: $id){
          title, rate, comment
        }
      }
    `,
    variables
  );
}

export function removeRating(variables) {
  return request(
    `
      mutation($id: ID!) {
        removeRating(id: $id)
      }
    `,
    variables
  );
}

export function fetchImages(variables) {
  return request(
    `query ($cursor: String){
      getImages(cursor: $cursor) {
        list {
          secure_url
          public_id
        }
        next_cursor
      }
    }`,
    variables
  );
}

export function getDashboardData(variables) {
  return request(
    `
      query($year: Int){
        data:getDashboardData(year: $year)
      }
    `,
    variables
  );
}

export function logout() {
  localStorage.removeItem('token');
}
