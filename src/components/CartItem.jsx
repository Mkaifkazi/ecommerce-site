import { useStore } from '../store/useStore';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useStore();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
        <p className="text-lg font-bold text-gray-900 mt-2">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        <span className="w-12 text-center font-semibold text-gray-900">{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 p-2 transition-colors"
        title="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
