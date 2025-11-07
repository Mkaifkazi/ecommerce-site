import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import OptimizedImage from './OptimizedImage';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  // Generate rating between 4.0-5.0
  const rating = (4 + Math.random()).toFixed(1);

  // Calculate discount (10-30%)
  const discountPercent = Math.floor(Math.random() * 20) + 10;
  const hasDiscount = product.price > 50;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title.substring(0, 30)}... added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (isWishlisted) {
      toast.error('Removed from wishlist');
    } else {
      toast.success('Added to wishlist!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="card group block relative">
        {/* Discount Badge */}
        {hasDiscount && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 left-3 z-10 badge-discount"
          >
            -{discountPercent}%
          </motion.div>
        )}

        {/* Wishlist Button */}
        <motion.button
          onClick={handleToggleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-pink-500 text-white'
              : 'bg-white/80 text-gray-700 hover:bg-pink-500 hover:text-white'
          }`}
        >
          <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Image Container */}
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 relative">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-6"
              wrapperClassName="w-full h-full"
            />
          </motion.div>

          {/* Quick View Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4"
          >
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold shadow-lg"
            >
              <FiEye className="w-4 h-4" />
              <span>Quick View</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-purple-600 font-bold uppercase tracking-wider mb-1">
            {product.category}
          </p>

          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-10 group-hover:text-purple-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-orange-400 text-orange-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-600 font-medium">
              {rating} ({Math.floor(Math.random() * 200) + 50})
            </span>
          </div>

          {/* Price and Cart */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  ${(product.price * (1 + discountPercent / 100)).toFixed(2)}
                </span>
              )}
            </div>

            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-2xl hover:shadow-purple-500/50"
              style={{ backgroundSize: '200% 100%' }}
              title="Add to cart"
            >
              <FiShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
