"use client";

let supabase: any = null;

// Dynamically import supabase only on client side
const getSupabase = async () => {
    if (typeof window === "undefined") return null;

    if (!supabase) {
        const { supabase: sb } = await import("./supabase");
        supabase = sb;
    }
    return supabase;
};
export interface Tribute {
    timestamp(timestamp: any): import("react").ReactNode;
    id: string;
    full_name: string;
    tribute: string;
    created_at: string;
    updated_at?: string;
}

// For backward compatibility with existing code
export interface LegacyTribute {
    id: string;
    fullName: string;
    tribute: string;
    timestamp: number;
}

const STORAGE_KEY = "tributes";

// Convert Supabase tribute to legacy format for existing components
const convertToLegacyFormat = (tribute: Tribute): LegacyTribute => ({
    id: tribute.id,
    fullName: tribute.full_name,
    tribute: tribute.tribute,
    timestamp: new Date(tribute.created_at).getTime(),
});

// Convert legacy format to Supabase format
const convertFromLegacyFormat = (
    tribute: Omit<LegacyTribute, "id" | "timestamp">
): Omit<Tribute, "id" | "created_at"> => ({
    full_name: tribute.fullName,
    tribute: tribute.tribute,
});

export const getTributes = async (): Promise<LegacyTribute[]> => {
    try {
        const sb = await getSupabase();
        if (!sb) return getLocalTributes();

        const { data, error } = await sb.from("tributes").select("*").order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching tributes:", error);
            // Fallback to localStorage
            return getLocalTributes();
        }

        return data ? data.map(convertToLegacyFormat) : [];
    } catch (error) {
        console.error("Error connecting to Supabase:", error);
        // Fallback to localStorage
        return getLocalTributes();
    }
};

// Fallback localStorage functions
const getLocalTributes = (): LegacyTribute[] => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveTribute = async (tribute: Omit<LegacyTribute, "id" | "timestamp">): Promise<void> => {
    try {
        const sb = await getSupabase();
        if (!sb) {
            saveLocalTribute(tribute);
            return;
        }

        const supabaseTribute = convertFromLegacyFormat(tribute);

        const { error } = await sb.from("tributes").insert([supabaseTribute]);

        if (error) {
            console.error("Error saving tribute:", error);
            // Fallback to localStorage
            saveLocalTribute(tribute);
            return;
        }

        // Dispatch custom event for real-time updates
        window.dispatchEvent(new CustomEvent("tributeAdded"));
    } catch (error) {
        console.error("Error connecting to Supabase:", error);
        // Fallback to localStorage
        saveLocalTribute(tribute);
    }
};

const saveLocalTribute = (tribute: Omit<LegacyTribute, "id" | "timestamp">): void => {
    const tributes = getLocalTributes();
    const newTribute: LegacyTribute = {
        ...tribute,
        id: Date.now().toString(),
        timestamp: Date.now(),
    };

    tributes.unshift(newTribute);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tributes));

    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent("tributeAdded"));
};

export const deleteTribute = async (id: string): Promise<void> => {
    try {
        const sb = await getSupabase();
        if (!sb) {
            deleteLocalTribute(id);
            return;
        }

        const { error } = await sb.from("tributes").delete().eq("id", id);

        if (error) {
            console.error("Error deleting tribute:", error);
            // Fallback to localStorage
            deleteLocalTribute(id);
            return;
        }
    } catch (error) {
        console.error("Error connecting to Supabase:", error);
        // Fallback to localStorage
        deleteLocalTribute(id);
    }
};

const deleteLocalTribute = (id: string): void => {
    const tributes = getLocalTributes();
    const filtered = tributes.filter((tribute) => tribute.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const initializeMockData = async (): Promise<void> => {
    try {
        const sb = await getSupabase();
        if (!sb) {
            initializeLocalMockData();
            return;
        }

        // Check if we have any tributes in Supabase
        const { data, error } = await sb.from("tributes").select("id").limit(1);

        if (error) {
            console.error("Error checking tributes:", error);
            // Fallback to localStorage initialization
            initializeLocalMockData();
            return;
        }

        // If we have tributes in Supabase, don't initialize mock data
        if (data && data.length > 0) return;

        // Initialize mock data in Supabase
        const mockTributes = [
            {
                full_name: "Sarah Johnson",
                tribute:
                    "Uncle Robert was one of the most generous and kind-hearted people I've ever known. His laughter could fill a room, and his wisdom guided our family through both joyful and challenging times. He taught me the value of hard work and the importance of treating everyone with respect. His stories about his adventures as a young man always inspired me to live life to the fullest. Though he may be gone, his spirit lives on in all the lives he touched.",
            },
            {
                full_name: "Michael Chen",
                tribute:
                    "I had the privilege of working alongside Robert for over fifteen years. He was not just a colleague but a mentor and friend. His dedication to excellence and his ability to bring out the best in everyone around him was truly remarkable. He had a way of making even the most stressful days feel manageable with his calm presence and encouraging words. The office will never be the same without his positive energy.",
            },
            {
                full_name: "Emily Rodriguez",
                tribute:
                    "Uncle Robert was the heart of our family gatherings. His famous barbecue skills and his ability to make everyone feel welcome created memories that will last a lifetime. He was always there when we needed him, whether it was fixing something around the house or simply listening when we needed to talk. His love for his family was evident in everything he did.",
            },
            {
                full_name: "David Thompson",
                tribute:
                    "Robert was my neighbor for twenty years, and I couldn't have asked for a better one. He was always ready to lend a helping hand, whether it was shoveling snow or watching over the house while we were away. His garden was the pride of the neighborhood, and he generously shared his vegetables with everyone. He embodied the spirit of community and friendship.",
            },
            {
                full_name: "Lisa Martinez",
                tribute:
                    "As Robert's nurse during his final months, I witnessed his incredible strength and grace. Despite his illness, he remained optimistic and caring, always asking about my family and making jokes to lighten the mood. His courage in facing his challenges inspired everyone who knew him. He taught me that true strength comes from the heart.",
            },
            {
                full_name: "James Wilson",
                tribute:
                    "Robert was my fishing buddy for over thirty years. We shared countless early mornings on the lake, and some of my best memories were made during those peaceful hours. He taught me patience, not just in fishing but in life. His stories and wisdom made every trip an adventure. I'll miss our conversations and his infectious enthusiasm for life.",
            },
        ];

        const { error: insertError } = await sb.from("tributes").insert(mockTributes);

        if (insertError) {
            console.error("Error inserting mock data:", insertError);
            // Fallback to localStorage
            initializeLocalMockData();
        }
    } catch (error) {
        console.error("Error connecting to Supabase:", error);
        // Fallback to localStorage
        initializeLocalMockData();
    }
};

const initializeLocalMockData = (): void => {
    const existing = getLocalTributes();
    if (existing.length > 0) return;

    const mockTributes: LegacyTribute[] = [
        {
            id: "1",
            fullName: "Sarah Johnson",
            tribute:
                "Uncle Robert was one of the most generous and kind-hearted people I've ever known. His laughter could fill a room, and his wisdom guided our family through both joyful and challenging times. He taught me the value of hard work and the importance of treating everyone with respect. His stories about his adventures as a young man always inspired me to live life to the fullest. Though he may be gone, his spirit lives on in all the lives he touched.",
            timestamp: Date.now() - 86400000,
        },
        {
            id: "2",
            fullName: "Michael Chen",
            tribute:
                "I had the privilege of working alongside Robert for over fifteen years. He was not just a colleague but a mentor and friend. His dedication to excellence and his ability to bring out the best in everyone around him was truly remarkable. He had a way of making even the most stressful days feel manageable with his calm presence and encouraging words. The office will never be the same without his positive energy.",
            timestamp: Date.now() - 172800000,
        },
        {
            id: "3",
            fullName: "Emily Rodriguez",
            tribute:
                "Uncle Robert was the heart of our family gatherings. His famous barbecue skills and his ability to make everyone feel welcome created memories that will last a lifetime. He was always there when we needed him, whether it was fixing something around the house or simply listening when we needed to talk. His love for his family was evident in everything he did.",
            timestamp: Date.now() - 259200000,
        },
        {
            id: "4",
            fullName: "David Thompson",
            tribute:
                "Robert was my neighbor for twenty years, and I couldn't have asked for a better one. He was always ready to lend a helping hand, whether it was shoveling snow or watching over the house while we were away. His garden was the pride of the neighborhood, and he generously shared his vegetables with everyone. He embodied the spirit of community and friendship.",
            timestamp: Date.now() - 345600000,
        },
        {
            id: "5",
            fullName: "Lisa Martinez",
            tribute:
                "As Robert's nurse during his final months, I witnessed his incredible strength and grace. Despite his illness, he remained optimistic and caring, always asking about my family and making jokes to lighten the mood. His courage in facing his challenges inspired everyone who knew him. He taught me that true strength comes from the heart.",
            timestamp: Date.now() - 432000000,
        },
        {
            id: "6",
            fullName: "James Wilson",
            tribute:
                "Robert was my fishing buddy for over thirty years. We shared countless early mornings on the lake, and some of my best memories were made during those peaceful hours. He taught me patience, not just in fishing but in life. His stories and wisdom made every trip an adventure. I'll miss our conversations and his infectious enthusiasm for life.",
            timestamp: Date.now() - 518400000,
        },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTributes));
};
