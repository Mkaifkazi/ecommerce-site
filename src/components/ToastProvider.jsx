import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #c026d3 0%, #d946ef 100%)',
          color: '#fff',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(192, 38, 211, 0.3)',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#fff',
            secondary: '#c026d3',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
