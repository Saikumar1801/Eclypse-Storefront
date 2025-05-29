import React from 'react';

const SkeletonProductCard: React.FC = () => {
  return (
    <div
      className="bg-brand-white rounded-lg shadow-card overflow-hidden animate-pulse
                 hover:scale-[1.02] hover:shadow-lg transition-transform duration-300 relative"
      aria-label="Loading product"
      role="status"
      aria-live="polite"
    >
      {/* Image Skeleton with gradient shimmer */}
      <div className="aspect-[3/4] w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                        animate-shimmer"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category Skeleton */}
        <div className="h-3 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                          animate-shimmer"></div>
        </div>

        {/* Name Skeleton: Two lines with different widths */}
        <div className="space-y-2">
          <div className="h-4 rounded-lg w-3/4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                            animate-shimmer"></div>
          </div>
          <div className="h-4 rounded-lg w-1/2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                            animate-shimmer"></div>
          </div>
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center space-x-3">
          <div className="h-3 rounded-full w-20 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                            animate-shimmer"></div>
          </div>
          <div className="h-3 rounded-full w-10 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                            animate-shimmer"></div>
          </div>
        </div>

        {/* Price Skeleton */}
        <div className="h-5 rounded-full w-1/4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                          animate-shimmer"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-9 rounded-md w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                          animate-shimmer"></div>
        </div>
      </div>

      {/* Shimmer Animation Keyframes */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
          background-size: 200% 100%;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default SkeletonProductCard;