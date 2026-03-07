import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative mt-auto border-t bg-slate-50">
            <div className="container mx-auto px-4 py-8 max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl flex flex-col items-center gap-4 text-center">
                <p className="text-sm text-slate-500 font-medium">
                    © {new Date().getFullYear()} Nöbetçi Eczane. Tüm Hakları Saklıdır.
                </p>
                <p className="text-xs text-slate-400 max-w-md">
                    Bu sayfada yer alan bilgiler yalnızca bilgilendirme amaçlıdır. Hastalıkların teşhis veya tedavisinde kullanılamaz. En doğru bilgi için lütfen doktorunuza veya eczacınıza danışınız.
                </p>

                {/* Gizli Admin Linki */}
                <Link
                    href="/admin"
                    className="absolute bottom-2 right-4 text-[10px] text-slate-300 hover:text-slate-400 transition-colors"
                >
                    admin
                </Link>
            </div>
        </footer>
    );
}
