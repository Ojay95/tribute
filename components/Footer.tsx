'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex justify-center items-center">
            <Heart className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-lg font-bold text-white">
              Forever in Our Hearts
            </span>
            <Heart className="h-6 w-6 text-gray-400 ml-2" />
          </div>
          <div className="text-center sm:text-right">
            <p className="text-gray-400 text-sm">
              Created with love by the family and friends of Uncle Robert
            </p>
            <p className="text-gray-500 text-xs mt-1">
              © 2024 Memorial Website. All memories preserved with love.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}