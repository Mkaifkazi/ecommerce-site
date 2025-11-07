import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiHeart, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useStore } from '../store/useStore';

const Navbar = () => {
  const { user, logout, getCartCount, wishlist, searchQuery, setSearchQuery } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 shadow-xl sticky top-0 z-50 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
              >
                <FiShoppingCart className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold text-white text-shadow hidden sm:block">
                Luxe Store
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="md:hidden text-white hover:text-white/80 transition-colors"
              >
                <FiSearch className="w-6 h-6" />
              </button>

              <Link
                to="/wishlist"
                className="relative text-white hover:text-white/80 transition-colors group"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <FiHeart className="w-6 h-6" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              <Link
                to="/cart"
                className="relative text-white hover:text-white/80 transition-colors group"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <FiShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm"
                  >
                    <FiUser className="w-5 h-5" />
                    <span className="font-medium">{user.username}</span>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <FiUser className="w-4 h-4" />
                            <span>My Profile</span>
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <FiLogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-xl hover:bg-white/90 transition-all shadow-lg"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-white/80 transition-colors"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {(showSearch || isMenuOpen) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden pb-4"
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20"
            >
              <div className="px-4 py-4 space-y-3">
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between text-white hover:text-white/80 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <FiHeart className="w-5 h-5" />
                    <span className="font-medium">Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between text-white hover:text-white/80 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <FiShoppingCart className="w-5 h-5" />
                    <span className="font-medium">Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUser className="w-5 h-5" />
                      <span className="font-medium">Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors py-2 w-full"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block bg-white text-purple-600 font-semibold py-2 px-4 rounded-xl text-center hover:bg-white/90 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
