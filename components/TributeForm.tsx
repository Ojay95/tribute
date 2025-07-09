'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { saveTribute } from '@/lib/tribute-storage';
import { Heart, Send } from 'lucide-react';

export default function TributeForm() {
  const [fullName, setFullName] = useState('');
  const [tribute, setTribute] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !tribute.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await saveTribute({
      fullName: fullName.trim(),
      tribute: tribute.trim(),
    });
    
    setFullName('');
    setTribute('');
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const remainingChars = 1500 - tribute.length;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-white/10 backdrop-blur-md border border-white/20">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-gray-400" />
          Share Your Tribute
        </CardTitle>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">
          Share a memory, story, or message to honor Uncle Robert's legacy
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Thank You
            </h3>
            <p className="text-gray-300">
              Your tribute has been added to the wall. It means so much to the family.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-white">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="tribute" className="text-sm font-medium text-white">
                  Your Tribute
                </Label>
                <span className={`text-xs ${remainingChars < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                  {remainingChars} characters remaining
                </span>
              </div>
              <Textarea
                id="tribute"
                value={tribute}
                onChange={(e) => setTribute(e.target.value)}
                placeholder="Share your memories, stories, or thoughts about Uncle Robert..."
                required
                className="w-full min-h-[120px] resize-none bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                maxLength={1500}
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting || !fullName.trim() || !tribute.trim() || remainingChars < 0}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Tribute
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}