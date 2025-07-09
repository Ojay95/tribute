"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import TributeCard from "@/components/TributeCard";
import { getTributes, deleteTribute, initializeMockData, Tribute } from "@/lib/tribute-storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Trash2, RefreshCw, AlertTriangle, Users } from "lucide-react";

export default function AdminPage() {
    const [tributes, setTributes] = useState<Tribute[]>([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmReset, setShowConfirmReset] = useState(false);

    const loadTributes = async () => {
        const stored = await getTributes();
        // Map LegacyTribute[] to Tribute[]
        const tributes: Tribute[] = stored.map((t: any) => ({
            ...t,
            full_name: t.full_name ?? `${t.first_name ?? ""} ${t.last_name ?? ""}`.trim(),
            created_at: t.created_at ?? new Date().toISOString(),
        }));
        setTributes(tributes);
        setLoading(false);
    };

    useEffect(() => {
        loadTributes().catch(console.error);
    }, []);

    const handleDelete = async (id: string) => {
        await deleteTribute(id);
        await loadTributes();
    };

    const handleResetMockData = async () => {
        localStorage.removeItem("tributes");
        await initializeMockData();
        await loadTributes();
        setShowConfirmReset(false);
    };

    const handleClearAll = async () => {
        localStorage.removeItem("tributes");
        await loadTributes();
    };

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
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
                            <div className="flex items-center justify-center lg:justify-start">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-xl mr-4">
                                    <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <div className="text-center lg:text-left">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                                        Admin Panel
                                    </h1>
                                    <p className="text-gray-300 mt-1 text-sm sm:text-base">
                                        Manage tributes and website content
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center lg:justify-end space-x-2 text-gray-300">
                                <Users className="h-5 w-5 text-gray-400" />
                                <span className="font-medium">{tributes.length} Total Tributes</span>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                            <Card className="shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base sm:text-lg flex items-center text-white">
                                        <RefreshCw className="h-5 w-5 mr-2 text-blue-600" />
                                        Reset Mock Data
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs sm:text-sm text-gray-300 mb-4">
                                        Restore the original mock tributes for demonstration purposes.
                                    </p>
                                    <Button
                                        onClick={() => setShowConfirmReset(true)}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                                    >
                                        Reset to Mock Data
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base sm:text-lg flex items-center text-white">
                                        <Trash2 className="h-5 w-5 mr-2 text-red-600" />
                                        Clear All Tributes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs sm:text-sm text-gray-300 mb-4">
                                        Remove all tributes from the website. This action cannot be undone.
                                    </p>
                                    <Button onClick={handleClearAll} variant="destructive" className="w-full">
                                        Clear All
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base sm:text-lg flex items-center text-white">
                                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                                        Data Storage
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs sm:text-sm text-gray-300 mb-4">
                                        All data is stored locally in your browser. Data will persist until cleared.
                                    </p>
                                    <div className="text-xs text-gray-400 bg-white/10 p-2 rounded">
                                        Storage: Browser Local Storage
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Confirmation Modal */}
                        {showConfirmReset && (
                            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                                <Card className="max-w-md w-full shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-lg text-white">
                                            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                                            Confirm Reset
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-300 mb-6 text-sm sm:text-base">
                                            This will replace all current tributes with the original mock data. Any new
                                            tributes will be lost. Are you sure you want to continue?
                                        </p>
                                        <div className="flex space-x-3">
                                            <Button
                                                onClick={() => setShowConfirmReset(false)}
                                                variant="outline"
                                                className="flex-1"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleResetMockData}
                                                className="flex-1 bg-gray-600 hover:bg-gray-700"
                                            >
                                                Reset Data
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </section>

                {/* Tributes Management */}
                <section className="pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center lg:text-left">
                            Manage Tributes
                        </h2>

                        {tributes.length > 0 ? (
                            <div className="columns-1 sm:columns-2 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
                                {tributes.map((tribute, index) => (
                                    <TributeCard
                                        key={tribute.id}
                                        tribute={tribute}
                                        onDelete={handleDelete}
                                        showDelete={true}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Trash2 className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No Tributes to Manage</h3>
                                <p className="text-gray-300 mb-6">There are currently no tributes in the system.</p>
                                <Button
                                    onClick={() => setShowConfirmReset(true)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white"
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Load Mock Data
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
