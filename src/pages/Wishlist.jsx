import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart, clearCart } = useStore();

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.error('Removed from wishlist');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(product => {
      addToCart(product);
    });
    toast.success(`${wishlist.length} items moved to cart!`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-md mx-auto"
        >
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
              <FiHeart className="w-12 h-12 text-purple-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">
            Save items you love for later. Start adding products to your wishlist!
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
        </p>
      </motion.div>

      <div className="flex justify-end mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleMoveAllToCart}
          className="btn-primary flex items-center space-x-2"
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>Move All to Cart</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card relative group"
          >
            {/* Remove Button */}
            <motion.button
              onClick={() => handleRemove(product.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
            >
              <FiX className="w-5 h-5" />
            </motion.button>

            <Link to={`/product/${product.id}`}>
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-6 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-10 group-hover:text-purple-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-2xl font-bold gradient-text mb-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>

            {/* Add to Cart Button */}
            <div className="px-4 pb-4">
              <motion.button
                onClick={() => handleAddToCart(product)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <FiShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
