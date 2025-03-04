"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
    state: any, 
    form: FormData, 
    pitch: string,
) => {
    // Extract session
    const session = await auth();

    // If user is not authenticated return error
    if(!session) 
        return parseServerActionResponse({ 
            error: 'Not signed in', 
            status: "ERROR"
        });
    
    // Destructure all values from form
    const  { title, description, category, link } = Object.fromEntries(
        // We only want to keep the pitch
        Array.from(form).filter(([key]) => key !== 'pitch'),
    );

    // Generate slug for pitch using slugify //npm install slugify
    const slug = slugify(title as string, { lower: true, strict: true});

    // Create startup
    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
        };

        // Write to sanity client
        const result = await writeClient.create( {_type: "startup", ...startup});

        return parseServerActionResponse( {
            ...result,
            error: "",
            status: 'SUCCESS',

        })

    } catch (error) {
        console.log(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR"
        });
    }
}