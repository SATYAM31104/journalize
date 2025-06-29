"use server";
import { unstable_cache } from "next/cache";

export async function getPixabayImage(query) {
    try {
        const res = await fetch(
            `https://pixabay.com/api?q=${query}&key=${process.env.PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
        );
        const data = await res.json();
        return data.hits[0]?.largeImageURL || null;
    } catch (error) {
        console.error("Pixabay API Error:", error);
        return null;
    }
}

export const getDailyPrompts= unstable_cache(
    async()=>{
        try{
            const response= await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
            const data= await response.json();
            return data.slip.advice;
        }   
        catch (error) {
            console.error("Error fetching daily prompts:", error);
            return [];
        }
    },["daily-prompts"],
    {
        revalidate:86400, // 24 hours in seconds
        tags: ["daily-prompts"],
    }
);