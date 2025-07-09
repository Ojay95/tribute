"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Users, Settings } from "lucide-react";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16 sm:py-0">
                    <Link href="/" className="flex items-center space-x-2 mb-4 sm:mb-0">
                        <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                        <span className="text-lg sm:text-xl font-bold text-white text-center sm:text-left">
                            In Memory of Chief Adewale Idowu Adejumo
                        </span>
                    </Link>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                        <Link
                            href="/"
                            className={`inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                pathname === "/"
                                    ? "bg-gray-500/20 text-gray-300"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <Heart className="h-4 w-4" />
                            <span>Home</span>
                        </Link>

                        <Link
                            href="/wall"
                            className={`inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                pathname === "/wall"
                                    ? "bg-gray-500/20 text-gray-300"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <Users className="h-4 w-4" />
                            <span>Wall of Tribute</span>
                        </Link>

                        <Link
                            href="/admin"
                            className={`inline-flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                pathname === "/admin"
                                    ? "bg-gray-500/20 text-gray-300"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span>Admin</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
