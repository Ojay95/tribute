'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tribute } from '@/lib/tribute-storage';
import { Heart, Trash2 } from 'lucide-react';

interface TributeCardProps {
  tribute: Tribute;
  onDelete?: (id: string) => void;
  showDelete?: boolean;
  index?: number;
}

export default function TributeCard({ tribute, onDelete, showDelete = false, index = 0 }: TributeCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Gradient colors for variety
  const gradients = [
    'from-gray-500 to-gray-700',
    'from-gray-600 to-gray-800',
    'from-gray-400 to-gray-600',
    'from-gray-700 to-gray-900',
    'from-gray-500 to-gray-800',
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl break-inside-avoid mb-6 sm:mb-8 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                {tribute.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-medium">
                {formatDate(tribute.timestamp)}
              </p>
            </div>
          </div>
          
          {showDelete && onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(tribute.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-full"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className={`w-full h-1 bg-gradient-to-r ${gradient} rounded-full mb-4 opacity-60`}></div>
        
        <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
          {tribute.tribute}
        </p>
      </CardContent>
    </Card>
  );
}