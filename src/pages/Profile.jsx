import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiShoppingBag, FiMapPin, FiSettings, FiPackage } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  // Mock order data
  const orders = [
    {
      id: 'ORD-001',
      date: 'Nov 5, 2025',
      status: 'Delivered',
      total: 299.99,
      items: 3,
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 'ORD-002',
      date: 'Nov 3, 2025',
      status: 'In Transit',
      total: 159.50,
      items: 2,
      statusColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'ORD-003',
      date: 'Oct 28, 2025',
      status: 'Processing',
      total: 89.99,
      items: 1,
      statusColor: 'text-orange-600 bg-orange-100'
    }
  ];

  // Mock saved addresses
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      address: '456 Office Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false
    }
  ];

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-md mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Please Log In</h2>
          <p className="text-gray-600 mb-8">You need to be logged in to view your profile</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'orders', label: 'Order History', icon: FiShoppingBag },
    { id: 'addresses', label: 'Saved Addresses', icon: FiMapPin },
    { id: 'settings', label: 'Account Settings', icon: FiSettings }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-600">Manage your profile and orders</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="glass-card p-6">
            {/* User Info */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiUser className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full mt-6 btn-secondary text-sm"
            >
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Order History */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <FiPackage className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${order.statusColor}`}>
                        {order.status}
                      </span>
                      <p className="text-lg font-bold gradient-text">${order.total.toFixed(2)}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-secondary text-sm py-2 px-4"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Saved Addresses */}
          {activeTab === 'addresses' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-sm"
                >
                  Add New Address
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {addresses.map((address, index) => (
                  <motion.div
                    key={address.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 relative"
                  >
                    {address.isDefault && (
                      <span className="absolute top-4 right-4 badge-primary text-xs">
                        Default
                      </span>
                    )}
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FiMapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{address.type}</h3>
                        <p className="text-sm text-gray-600">{address.name}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      <p>{address.address}</p>
                      <p>{address.city}, {address.state} {address.zipCode}</p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 btn-secondary text-xs py-2"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 btn-outline text-xs py-2"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Account Settings */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={user.username}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="input-field"
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
