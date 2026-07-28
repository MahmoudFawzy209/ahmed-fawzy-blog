export interface Author {
  _id: string;
  name: string;
  slug: string;
  avatar: string; // URL for the avatar image
  bio: string;    // Brief biography
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  count?: number; // Post count in mock data
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  body: string; // HTML content for simplicity (can represent PortableText HTML in future)
  mainImage: string; // URL for the main cover image
  readingTime: string; // Estimated reading time (e.g., "5 دقائق")
  author: Author;
  categories: Category[];
  isFeatured?: boolean;
  relatedPosts?: string[]; // IDs of related posts
}
