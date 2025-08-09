import type { CollectionEntry } from "astro:content";

export interface SimilarPost {
  slug: string;
  data: CollectionEntry<"posts">["data"];
  similarity: number;
}

export function findSimilarPosts(
  currentPost: CollectionEntry<"posts">,
  allPosts: CollectionEntry<"posts">[],
  limit: number = 3
): SimilarPost[] {
  if (!currentPost || !allPosts || allPosts.length === 0) {
    return [];
  }

  const currentTags = currentPost.data.tags || [];
  const currentCategory = currentPost.data.category;

  // Filter out the current post and draft posts
  const otherPosts = allPosts.filter(post => 
    post.slug !== currentPost.slug && 
    !post.data.draft
  );

  if (otherPosts.length === 0) {
    return [];
  }

  // Calculate similarity scores
  const similarPosts = otherPosts.map(post => {
    let similarity = 0;
    const postTags = post.data.tags || [];

    // Category match gives high score
    if (post.data.category === currentCategory) {
      similarity += 3;
    }

    // Tag matches
    const commonTags = currentTags.filter(tag => 
      postTags.includes(tag)
    );
    similarity += commonTags.length;

    // If no similarity found, give a small random score for variety
    if (similarity === 0) {
      similarity = Math.random() * 0.5;
    }

    return {
      slug: post.slug,
      data: post.data,
      similarity
    };
  });

  // Sort by similarity and limit results
  return similarPosts
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}