import { mockBlogPosts, BlogPost } from "./mock-blog";

const STORAGE_KEY = "blog-posts";

export function getBlogPosts(): BlogPost[] {
    if (typeof window === "undefined") return mockBlogPosts;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored) as BlogPost[];
        }
    } catch {
        // ignore parse errors
    }
    return mockBlogPosts;
}

export function saveBlogPosts(posts: BlogPost[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
