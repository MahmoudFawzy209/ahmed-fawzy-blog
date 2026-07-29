import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim().replace(/['"]/g, "");
// Sanity Project IDs can only contain lowercase letters, numbers, and dashes.
const isValidProjectId = /^[a-z0-9-]+$/.test(projectId) && projectId !== "your-project-id" && projectId !== "your_project_id_here";

export const client = isValidProjectId 
  ? createClient({
      projectId,
      dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim().replace(/['"]/g, ""),
      apiVersion: "2024-03-11",
      useCdn: true, // true for fast edge CDN delivery
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

// Helper function to build dynamic image URLs from Sanity image assets
export function urlFor(source) {
  if (!source || !builder) return "";
  try {
    return builder.image(source).url();
  } catch (error) {
    console.warn("Failed to generate image URL from Sanity asset, returning empty string:", error);
    return "";
  }
}
