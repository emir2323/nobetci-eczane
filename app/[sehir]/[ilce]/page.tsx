import { calculateDistance } from "@/lib/utils";
import { getPharmacies } from "@/lib/api-service";
import { PharmacyCard } from "@/components/ui/PharmacyCard";
import { Map as MapIcon, ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';
import AdSlot from "@/components/AdSlot";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ sehir: string; ilce: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const sehir = resolvedParams.sehir.charAt(0).toUpperCase() + resolvedParams.sehir.slice(1);
    const rawIlce = resolvedParams.ilce.replace(/-nobetci-eczane/g, '');
    const displayIlce = rawIlce.charAt(0).toUpperCase() + rawIlce.slice(1);

    return {
        title: `${displayIlce} Nöbetçi Eczaneleri (${sehir}) | En Yakın Eczane`,
        description: `${sehir} ili ${displayIlce} ilçesindeki en yakın nöbetçi eczaneler, adres, telefon ve yol tarifi bilgileri. ${displayIlce} nöbetçi eczane listesi.`,
        keywords: `${displayIlce.toLowerCase()} nöbetçi eczane, ${sehir.toLowerCase()} nöbetçi eczaneler, ${displayIlce.toLowerCase()} en yakın eczane, gece açık eczane ${displayIlce.toLowerCase()}`,
    };
}

export default async function DistrictPharmaciesPage({ 
    params,
    searchParams 
}: { 
    params: Promise<{ sehir: string; ilce: string }>;
    searchParams?: Promise<{ lat?: string; lng?: string }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = searchParams ? await searchParams : {};

    // Gelen yönlendirme parametreleri 
    const sehir = resolvedParams.sehir;
    const rawIlce = resolvedParams.ilce;
    const ilce = rawIlce.replace(/-nobetci-eczane/g, '');

    let pharmacies = await getPharmacies(sehir, ilce);

    const latStr = resolvedSearchParams.lat;
    const lngStr = resolvedSearchParams.lng;

    if (latStr && lngStr) {
        const userLat = parseFloat(latStr);
        const userLng = parseFloat(lngStr);

        if (!isNaN(userLat) && !isNaN(userLng)) {
            pharmacies = await Promise.all(
                pharmacies.map(async (pharmacy) => {
                    if (pharmacy.latitude && pharmacy.longitude) {
                        try {
                            // OSRM coordinates format: longitude,latitude
                            const response = await fetch(
                                `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${pharmacy.longitude},${pharmacy.latitude}?overview=false`,
                                { signal: AbortSignal.timeout(3000), cache: 'no-store' }
                            );
                            if (!response.ok) throw new Error("OSRM API error");
                            const data = await response.json();
                            
                            if (data.routes && data.routes.length > 0) {
                                // Distance is in meters, convert to km
                                const distanceInMeters = data.routes[0].distance;
                                const distance = Number((distanceInMeters / 1000).toFixed(1));
                                return { ...pharmacy, distance };
                            }
                        } catch (error) {
                            // Fallback to Haversine if OSRM fails
                            const fallbackDistance = calculateDistance(userLat, userLng, pharmacy.latitude, pharmacy.longitude);
                            return { ...pharmacy, distance: fallbackDistance };
                        }
                    }
                    return pharmacy;
                })
            );

            // Sort by distance ascending
            pharmacies.sort((a, b) => {
                if (a.distance === undefined && b.distance === undefined) return 0;
                if (a.distance === undefined) return 1;
                if (b.distance === undefined) return -1;
                return a.distance - b.distance;
            });
        }
    }

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
