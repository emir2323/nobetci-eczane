"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, User } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import ReactMarkdown from "react-markdown";
import { getBlogPosts } from "@/lib/blog-store";
import { BlogPost } from "@/lib/mock-blog";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

    useEffect(() => {
        const posts = getBlogPosts();
        const found = posts.find((p) => p.slug === slug);
        setPost(found ?? null);
    }, [slug]);

    if (post === undefined) {
        // Loading state
        return (
            <div className="mx-auto max-w-4xl pb-12 pt-6 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
                Yükleniyor...
            </div>
        );
    }

    if (post === null) {
        return (
            <div className="mx-auto max-w-4xl pb-12 pt-6 px-4 sm:px-6 lg:px-8 text-center text-slate-600">
                <h1 className="text-2xl font-bold mb-4">Yazı Bulunamadı</h1>
                <Link href="/blog" className="text-blue-600 hover:underline">Blog'a Dön</Link>
            </div>
        );
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

            {/* Body Content — ReactMarkdown with prose */}
            <div className="prose prose-slate prose-lg md:prose-xl max-w-none break-words prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 leading-relaxed text-slate-700">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Bottom Ad */}
            <AdSlot type="footer" className="mt-12" />
        </article>
    );
}
