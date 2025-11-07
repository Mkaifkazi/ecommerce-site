import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      cart: [],
      wishlist: [],
      searchQuery: '',
      selectedCategory: 'all',
      priceRange: [0, 1000],
      sortBy: 'default',

      setUser: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      setPriceRange: (range) => set({ priceRange: range }),

      setSortBy: (sortBy) => set({ sortBy }),

      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const exists = wishlist.find(item => item.id === product.id);

        if (exists) {
          set({ wishlist: wishlist.filter(item => item.id !== product.id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId);
      },

      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter(item => item.id !== productId) });
      },
    }),
    {
      name: 'luxe-store-storage',
    }
  )
);
