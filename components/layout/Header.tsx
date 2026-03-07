"use client";

import Link from 'next/link';
import { Pill, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
                            <Pill className="h-6 w-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors">
                            Nöbetçi Eczane
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                            Anasayfa
                        </Link>
                        <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                            Blog
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-white px-4 py-4 space-y-3 shadow-lg">
                    <Link
                        href="/"
                        className="block w-full rounded-xl bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Anasayfa
                    </Link>
                    <Link
                        href="/blog"
                        className="block w-full rounded-xl bg-slate-50 px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Blog
                    </Link>
                </div>
            )}
        </header>
    );
}
