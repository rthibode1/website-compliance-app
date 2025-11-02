// -----------------------------------------------------------------------------
// ✅ Stubbed blog post loader for Firebase / production builds
// Purpose: Disables content-collections dependency that causes build errors
// -----------------------------------------------------------------------------

import type { Post } from "@marketing/blog/types";

/**
 * Returns an empty array of posts (no content-collections dependency)
 */
export async function getAllPosts(): Promise<Post[]> {
  return [];
}

/**
 * Returns null for any slug lookup
 */
export async function getPostBySlug(
  slug: string,
  options?: { locale?: string }
): Promise<Post | null> {
  return null;
}
