import { getPharmacies } from "@/lib/api-service";
import { PharmacyCard } from "@/components/ui/PharmacyCard";
import { Map as MapIcon, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';
import AdSlot from "@/components/AdSlot";



export async function generateMetadata({ params }: { params: Promise<{ sehir: string; ilce: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const sehir = resolvedParams.sehir.charAt(0).toUpperCase() + resolvedParams.sehir.slice(1);
    const rawIlce = resolvedParams.ilce.replace(/-nobetci-eczane/g, '');
    const displayIlce = rawIlce.charAt(0).toUpperCase() + rawIlce.slice(1);

    return {
        title: `${displayIlce} Nöbetçi Eczaneleri, ${sehir} | Nöbetçi Eczane`,
        description: `${sehir} ili ${displayIlce} ilçesindeki güncel nöbetçi eczaneler. Adres, telefon ve yol tarifi bilgileriyle hemen görüntüleyin.`,
    };
}

export default async function DistrictPharmaciesPage({ params }: { params: Promise<{ sehir: string; ilce: string }> }) {
    const resolvedParams = await params;

    // Gelen yönlendirme parametreleri 
    const sehir = resolvedParams.sehir;
    const rawIlce = resolvedParams.ilce;
    const ilce = rawIlce.replace(/-nobetci-eczane/g, '');

    const pharmacies = await getPharmacies(sehir, ilce);

    const displaySehir = sehir.charAt(0).toUpperCase() + sehir.slice(1);
    const displayIlce = ilce.charAt(0).toUpperCase() + ilce.slice(1);

    return (
        <div className="space-y-8 pb-12">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm font-medium text-slate-500 pt-4" aria-label="Breadcrumb">
                <Link href="/" className="flex items-center hover:text-red-600 transition-colors">
                    <Home className="h-4 w-4 mr-1" />
                    Anasayfa
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                <span className="capitalize">{displaySehir}</span>
                <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
                <span className="capitalize text-slate-900">{displayIlce}</span>
            </nav>

            <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
                    <span className="capitalize text-red-600">{displayIlce}</span> Nöbetçi Eczaneleri
                </h1>
                <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                    Şu an açık olan nöbetçi eczaneler listelenmektedir. {displaySehir} ili, {displayIlce} ilçesi için sonuçlar:
                </p>
            </div>

            <AdSlot type="header" className="my-6" />

            {pharmacies.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 mb-4 text-slate-400">
                        <MapIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Kayıtlı nöbetçi eczane bulunamadı</h3>
                    <p className="mt-2 text-base text-slate-500 max-w-md mx-auto">
                        {displaySehir} / {displayIlce} bölgesinde şu an için bir nöbetçi eczane kaydına ulaşılamadı. Farklı bir ilçe aramayı deneyebilirsiniz.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex mt-6 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
                    >
                        Yeni Arama Yap
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pharmacies.map((pharmacy) => (
                        <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
                    ))}
                </div>
            )}

            <AdSlot type="footer" className="mt-8" />
        </div>
    );
}
