import Link from 'next/link';
import { ShieldAlert, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 mb-6">
                <ShieldAlert className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
                Sayfa Bulunamadı
            </h1>
            <p className="text-lg text-slate-600 max-w-md mb-8">
                Aradığınız sayfaya veya eczaneye şu anda ulaşılamıyor. Link kırık olabilir veya sayfa kaldırılmış olabilir.
            </p>
            <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-slate-800 hover:-translate-y-0.5"
            >
                <Home className="h-5 w-5" />
                Anasayfaya Dön
            </Link>
        </div>
    );
}
