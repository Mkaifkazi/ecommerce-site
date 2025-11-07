import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiFacebook, FiTwitter, FiInstagram, FiYoutube,
  FiMail, FiPhone, FiMapPin, FiCreditCard
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4 gradient-text">Luxe Store</h3>
            <p className="text-white/70 mb-4 text-sm">
              Your destination for premium products and exceptional shopping experience.
              Quality you can trust, delivered with care.
            </p>
            <div className="flex space-x-3">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <FiFacebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <FiTwitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <FiInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all"
              >
                <FiYoutube className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-white/70 hover:text-white transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white/70 hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-white/70 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70">Help Center</li>
              <li className="text-white/70">Track Order</li>
              <li className="text-white/70">Returns & Exchanges</li>
              <li className="text-white/70">Shipping Info</li>
              <li className="text-white/70">Privacy Policy</li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to get special offers and updates
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50" />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-purple-900 font-semibold py-2.5 rounded-xl hover:bg-white/90 transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-white/70">
              <FiPhone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <FiMail className="w-4 h-4" />
              <span>support@luxestore.com</span>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <FiMapPin className="w-4 h-4" />
              <span>123 Shopping St, NY 10001</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 mb-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2 text-white/50 text-sm">
              <FiCreditCard className="w-5 h-5" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-3">
              {['Visa', 'Mastercard', 'PayPal', 'Amex'].map((method) => (
                <div
                  key={method}
                  className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/50 text-sm"
        >
          <p>© {currentYear} Luxe Store. All rights reserved.</p>
          <p className="mt-1">Crafted with care for an exceptional shopping experience</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
