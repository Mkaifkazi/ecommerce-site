const BASE_URL = 'https://fakestoreapi.com';

class ApiService {
  async fetchProducts() {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }

  async fetchProduct(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  }

  async fetchCarts() {
    const response = await fetch(`${BASE_URL}/carts`);
    if (!response.ok) throw new Error('Failed to fetch carts');
    return response.json();
  }

  async fetchCart(id) {
    const response = await fetch(`${BASE_URL}/carts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  }

  async fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  }

  async fetchUser(id) {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  }

  async login(username, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  }
}

export default new ApiService();
