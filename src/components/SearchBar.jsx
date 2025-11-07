import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useStore();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative flex items-center transition-all duration-300 ${
          isFocused
            ? 'ring-2 ring-primary-500 shadow-lg'
            : 'shadow-sm'
        } rounded-full bg-white`}
      >
        <FiSearch className="absolute left-4 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search products..."
          className="w-full pl-12 pr-12 py-3 bg-transparent rounded-full outline-none text-gray-900 placeholder-gray-400"
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchBar;
