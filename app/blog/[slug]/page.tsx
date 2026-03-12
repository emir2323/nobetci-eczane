import { mockBlogPosts } from "@/lib/mock-blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, User } from "lucide-react";
import { Metadata } from "next";
import AdSlot from "@/components/AdSlot";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const post = mockBlogPosts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
        return {
            title: "Yazı Bulunamadı | Nöbetçi Eczane",
        };
    }

    return {
        title: `${post.title} | Nöbetçi Eczane Blog`,
        description: post.summary,
        keywords: post.keywords ? post.keywords.split(',').map(k => k.trim()) : undefined,
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    const post = mockBlogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="mx-auto max-w-full overflow-x-hidden md:max-w-4xl pb-12 pt-6 px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-8">
                <Link
                    href="/blog"
                    className="group inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                >
                    <ChevronLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Blog'a Dön
                </Link>
            </div>

            {/* Header Content */}
            <header className="mb-10 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                    {post.title}
                </h1>

                <AdSlot type="header" className="mb-6" />

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                    </span>
                    <span className="hidden sm:inline-block text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {post.author}
                    </span>
                </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12 aspect-video w-full overflow-hidden rounded-3xl bg-slate-100 shadow-sm border border-slate-200">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Body Content */}
            <div 
                className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 leading-relaxed text-slate-700 break-words"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Bottom Ad */}
            <AdSlot type="footer" className="mt-12" />
        </article>
    );
}
