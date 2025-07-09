'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import TributeCard from '@/components/TributeCard';
import { getTributes, Tribute } from '@/lib/tribute-storage';
import { Heart, Users, MessageCircle } from 'lucide-react';

export default function WallOfTribute() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTributes = async () => {
      const stored = await getTributes();
      setTributes(stored);
      setLoading(false);
    };
    
    loadTributes().catch(console.error);
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadTributes().catch(console.error);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from the same page
    window.addEventListener('tributeAdded', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('tributeAdded', handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-12 w-12 border-4 border-amber-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-600/10 to-gray-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-gray-500/10 to-gray-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10">
      <Navigation />
      
      {/* Header Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-xl">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Wall of Tribute
          </h1>
          
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            A collection of heartfelt memories and tributes celebrating the life 
            and legacy of Uncle Robert. Each message represents a life he touched 
            and a heart he filled with love.
          </p>
          
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300">
            <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-gray-400" />
              <span className="font-medium">{tributes.length} Tributes</span>
            </div>
            <div className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-gray-400" />
              <span className="font-medium">Infinite Love</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tributes Grid */}
        <section className="pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {tributes.length > 0 ? (
              <div className="columns-1 sm:columns-2 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
              {tributes.map((tribute, index) => (
                <TributeCard
                  key={tribute.id}
                  tribute={tribute}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-12 w-12 text-gray-400" />
              </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                No Tributes Yet
              </h3>
                <p className="text-gray-300 mb-6">
                Be the first to share a memory or tribute.
              </p>
              <a
                href="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-medium rounded-md transition-all duration-200 shadow-lg"
              >
                <Heart className="h-4 w-4 mr-2" />
                Share a Tribute
              </a>
            </div>
          )}
        </div>
      </section>
      </div>
    </div>
  );
}