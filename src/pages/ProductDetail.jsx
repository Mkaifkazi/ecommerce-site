import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHeart, FiShoppingCart, FiMinus, FiPlus, FiChevronLeft,
  FiStar, FiTruck, FiShield, FiRefreshCw
} from 'react-icons/fi';
import api from '../services/api';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import OptimizedImage from '../components/OptimizedImage';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // Mock sizes
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: 'Nov 1, 2025',
      comment: 'Absolutely love this product! The quality exceeded my expectations and shipping was fast.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      date: 'Oct 28, 2025',
      comment: 'Great value for the price. Would definitely recommend to others.'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      rating: 5,
      date: 'Oct 25, 2025',
      comment: 'Perfect! Exactly as described. Will be ordering again soon.'
    }
  ];

  const rating = (4 + Math.random()).toFixed(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await api.fetchProduct(id);
      setProduct(data);

      // Load related products
      const allProducts = await api.fetchProducts();
      const related = allProducts
        .filter(p => p.category === data.category && p.id !== data.id)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} item(s) added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (isWishlisted) {
      toast.error('Removed from wishlist');
    } else {
      toast.success('Added to wishlist!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-pink-400 opacity-20"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-red-600 text-center"
        >
          <p className="text-lg font-semibold">Error loading product</p>
          <p className="text-sm mt-2">{error || 'Product not found'}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
      >
        <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
      </motion.div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold mb-6 group"
      >
        <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </motion.button>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="glass-card p-8 aspect-square">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full"
            >
              <OptimizedImage
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
                wrapperClassName="w-full h-full"
              />
            </motion.div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-white/70 backdrop-blur-sm rounded-xl p-3 border-2 transition-all ${
                  selectedImage === index
                    ? 'border-purple-600 shadow-lg'
                    : 'border-transparent hover:border-purple-300'
                }`}
              >
                <OptimizedImage
                  src={product.image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-contain"
                  wrapperClassName="w-full h-full"
                  showSkeleton={false}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <span className="inline-block badge-primary mb-3 uppercase text-xs">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(rating)
                        ? 'fill-orange-400 text-orange-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">{rating} ({reviews.length} reviews)</span>
            </div>

            <p className="text-5xl font-bold gradient-text mb-6">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Size Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Size
            </label>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-xl font-semibold transition-all ${
                    selectedSize === size
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/70 backdrop-blur-sm text-gray-700 border border-purple-200 hover:border-purple-400'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-xl bg-white/70 backdrop-blur-sm border border-purple-200 hover:border-purple-400 flex items-center justify-center transition-all"
              >
                <FiMinus className="w-5 h-5" />
              </motion.button>
              <span className="w-20 text-center text-2xl font-bold text-gray-900">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-xl bg-white/70 backdrop-blur-sm border border-purple-200 hover:border-purple-400 flex items-center justify-center transition-all"
              >
                <FiPlus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleWishlist}
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                isWishlisted
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 border border-purple-200 hover:bg-pink-500 hover:text-white'
              }`}
            >
              <FiHeart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FiTruck className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Free Shipping</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FiShield className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Secure Payment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <FiRefreshCw className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Easy Returns</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-orange-400 text-orange-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetail;
