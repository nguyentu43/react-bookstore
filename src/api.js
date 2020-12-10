import { request } from './graphqlClient';

export function login(variables) {
  return request(
    'query($email: String!, $password: String!){token: login(email: $email, password: $password)}',
    variables
  );
}

export function fetchUserInfo() {
  return request(
    'query{user: getUserInfo{name, isAdmin, email, id} cart:getUserCart{id, name, price, slug, discount, quantity, images}}'
  );
}

export function addItemToCart(variables){
    return request(
        'mutation ($input: CartItemData!){cart: addCartItem(input: $input){id, name, price, slug, discount, quantity, images}}',
        variables
    );
}

export function removeItemFromCart(variables){
    return request(
        'mutation ($productID: ID!){cart: removeCartItem(productID: $productID){id, name, price, slug, discount, quantity, images}}',
        variables
    );
}

export function fetchProduct(variables){
    return request(
        'query ($slug: String!){product: getProduct(slug: $slug){id, price, images{public_id, secure_url},discount,description,name, slug, authors{id, name}, category{id, name, parent{id, name, parent{id, name}}}}}',
        variables
    );
}

export function fetchProducts(variables){
    return request(
        'query ($search: String, $offset: Int, $limit: Int){products: getProducts(search: $search, offset: $offset, limit: $limit){id, price, images{public_id, secure_url},discount,description,name, slug, authors{id, name}, category{id, name, parent{id, name, parent{id, name}}}}}',
        variables
    );
}

export function fetchCategories(){
    return request(
        'query {categories: getCategories{id, name, icon, children{id, name, icon}, parent{id, name}}}'
    )
}

export function fetchAuthors(){
    return request(
        'query {authors:getAuthors{id, name, avatar, books}}'
    )
}

export function logout(){
    localStorage.removeItem('token');
}