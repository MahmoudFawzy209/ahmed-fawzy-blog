import { client } from "@/lib/sanity";
import HomeClient from "@/components/HomeClient";
import { postsData } from "@/data/postsData";
import { authorData } from "@/data/authorData";

// Fetch posts and author dynamically, with local file fallbacks
async function getPortfolioData() {
  try {
    const isProjectIdConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";
    
    if (!isProjectIdConfigured) {
      return { posts: postsData, author: authorData };
    }

    const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      category,
      readingTime,
      mainImage
    }`;
    
    const authorQuery = `*[_type == "author"][0] {
      name,
      title,
      bio,
      avatar,
      email,
      socials,
      values
    }`;

    const [posts, author] = await Promise.all([
      client.fetch(postsQuery),
      client.fetch(authorQuery)
    ]);

    return {
      posts: posts && posts.length > 0 ? posts : postsData,
      author: author ? author : authorData
    };
  } catch (error) {
    console.error("Failed to fetch Sanity data, falling back to local files:", error);
    return { posts: postsData, author: authorData };
  }
}

export default async function Home() {
  const { posts, author } = await getPortfolioData();
  return <HomeClient posts={posts} author={author} />;
}
