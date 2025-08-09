
import type { CollectionEntry } from "astro:content";

export interface SimilarPost {
  slug: string;
  data: CollectionEntry<"posts">["data"];
  similarity: number;
}

export function findSimilarPosts(
  currentPost: CollectionEntry<"posts">,
  allPosts: CollectionEntry<"posts">[],
  maxResults: number = 3
): SimilarPost[] {
  const currentTags = currentPost.data.tags || [];
  const currentCategory = currentPost.data.category;
  
  const similarPosts = allPosts
    .filter(post => post.slug !== currentPost.slug) // Exclude current post
    .filter(post => !post.data.draft) // Exclude draft posts
    .map(post => {
      let similarity = 0;
      const postTags = post.data.tags || [];
      
      // Calculate tag similarity (weight: 2 points per matching tag)
      const matchingTags = currentTags.filter(tag => postTags.includes(tag));
      similarity += matchingTags.length * 2;
      
      // Calculate category similarity (weight: 3 points for same category)
      if (currentCategory && post.data.category === currentCategory) {
        similarity += 3;
      }
      
      return {
        slug: post.slug,
        data: post.data,
        similarity
      };
    })
    .filter(post => post.similarity > 0) // Only include posts with some similarity
    .sort((a, b) => {
      // Sort by similarity score first, then by publication date
      if (b.similarity !== a.similarity) {
        return b.similarity - a.similarity;
      }
      return new Date(b.data.published).getTime() - new Date(a.data.published).getTime();
    })
    .slice(0, maxResults);
    
  return similarPosts;
}
