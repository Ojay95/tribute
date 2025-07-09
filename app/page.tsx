"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import TributeForm from "@/components/TributeForm";
import Footer from "@/components/Footer";
import { initializeMockData } from "@/lib/tribute-storage";
import { Heart, Star, Sparkles } from "lucide-react";

export default function Home() {
    useEffect(() => {
        initializeMockData().catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-600/10 to-gray-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-gray-500/10 to-gray-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-br from-gray-400/10 to-gray-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                <Navigation />

                {/* Hero Section */}
                <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Content Side */}
                            <div className="text-center lg:text-left order-2 lg:order-1">
                                <div className="flex justify-center lg:justify-start mb-6">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                                        <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                                    </div>
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                                    In Loving Memory of
                                    <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
                                        Chief Adewale Idowu Adejumo
                                    </span>
                                </h1>

                                <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                                    The massive gap created in our hearts can never be filled but we are thankful to God
                                    for his mercy towards us, the grace through his life and wonderful
                                    memories left for us.
                                </p>

                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20">
                                    <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-2">
                                        <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 flex-shrink-0" />
                                        <span className="text-sm sm:text-base lg:text-lg font-medium text-white text-center">
                                            Survived by his amiable wife, Abiodun Antonia Adejumo (fondly called ‘Bola’)
                                            and five beautiful children, Adesola, Adetunji, Adewole, Adekoyejo and
                                            Oluwadamilola; and the granddaughter he so doted over, Jadesolaoluwa.
                                        </span>
                                        <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 flex-shrink-0" />
                                    </div>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="order-1 lg:order-2 flex justify-center">
                                <div className="relative max-w-md w-full">
                                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-100 to-pink-100 w-full relative">
                                        <img
                                            src="/WhatsApp Image 2025-07-08 at 23.10.45_24f76b0b.jpg"
                                            alt="Uncle Robert - A loving memory"
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gray-400/20 rounded-full blur-xl"></div>
                                    <div className="absolute -bottom-6 -left-6 w-20 h-20 sm:w-32 sm:h-32 bg-gray-300/15 rounded-full blur-2xl"></div>

                                    {/* Memorial badge */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-lg border border-white/50">
                                        <div className="flex items-center justify-center space-x-3">
                                            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800 flex-shrink-0" />
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                                    Forever Remembered
                                                </p>
                                                <p className="text-gray-600 text-xs sm:text-sm">1952 - 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tribute Form Section */}
                <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="flex justify-center mb-4">
                                <Sparkles className="h-8 w-8 text-gray-300" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                                Share Your Memories
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                                Help us celebrate Uncle Robert's life by sharing your favorite memories, stories, or the
                                impact he had on your life. Every tribute adds to the beautiful tapestry of his legacy.
                            </p>
                        </div>

                        <TributeForm />
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
