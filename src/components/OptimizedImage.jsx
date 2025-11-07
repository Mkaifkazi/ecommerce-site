import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  showSkeleton = true,
  skeletonClassName = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={`relative ${wrapperClassName}`}>
      {/* Loading Skeleton */}
      {isLoading && showSkeleton && (
        <div className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${skeletonClassName}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Image not available</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
