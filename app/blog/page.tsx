"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, User } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-store";
import { BlogPost } from "@/lib/mock-blog";

export default function BlogListPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        setPosts(getBlogPosts());
    }, []);

    return (
        <div className="space-y-10 pb-12">
            {/* Page Header */}
            <div className="text-center md:text-left pt-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Sağlık <span className="text-blue-600">Köşesi</span>
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                    Uzman eczacılarımızdan sağlıklı yaşam ipuçları, doğru ilaç kullanımı ve güncel medikal gelişmeler.
                </p>
            </div>

            {/* Blog Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-slate-300">
                        <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5" />
                                        {post.author}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                    {post.summary}
                                </p>
                            </div>
                            <div className="mt-6 flex items-center text-sm font-semibold text-blue-600">
                                Devamını Oku
                                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
