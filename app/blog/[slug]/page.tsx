import { mockBlogPosts } from "@/lib/mock-blog";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import ReactMarkdown from 'react-markdown';

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = mockBlogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        return {
            title: "Makale Bulunamadı | Nöbetçi Eczane",
        };
    }

    return {
        title: `${post.title} | Nöbetçi Eczane Blog`,
        description: post.summary,
    };
}

// Generate static params for build time optimization
export async function generateStaticParams() {
    return mockBlogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: PageProps) {
    const post = mockBlogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="mx-auto max-w-3xl pb-16 pt-8">
            {/* Back Link */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8"
            >
                <ArrowLeft className="h-4 w-4" />
                Blog'a Dön
            </Link>

            {/* Header */}
            <header className="space-y-6 text-center md:text-left mb-10">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-slate-500">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                        <User className="h-4 w-4" />
                        {post.author}
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-[21/9] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-sm mb-12">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content - Using Tailwind Typography */}
            <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
}
