import { MapPin, Phone, Navigation, MessageCircle } from "lucide-react";
import { Pharmacy } from "@/types";

interface PharmacyCardProps {
    pharmacy: Pharmacy;
    isDuty?: boolean; // Nöbetçi olduğunu belirtmek için (şimdilik hepsi nöbetçi varsayalım)
}

export function PharmacyCard({ pharmacy, isDuty = true }: PharmacyCardProps) {
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;

    const whatsappText = `🏥 Nöbetçi Eczane: ${pharmacy.name}
📍 Adres: ${pharmacy.address}
📞 Telefon: ${pharmacy.phone}
🗺️ Yol Tarifi: ${googleMapsLink}`;

    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

    return (
        <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-slate-300">
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold tracking-tight text-slate-900">
                            {pharmacy.name}
                        </h3>
                        {pharmacy.distance && (
                            <p className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                📍 {pharmacy.distance} km uzaklıkta (Kuş Uçuşu)
                            </p>
                        )}
                    </div>
                    {isDuty && (
                        <span className="relative flex h-8 shrink-0 items-center justify-center rounded-full bg-red-50 px-3 text-xs font-bold text-red-600 ring-1 ring-inset ring-red-600/20">
                            <span className="absolute -right-1 -top-1 flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                            </span>
                            Nöbetçi
                        </span>
                    )}
                </div>

                <div className="mt-5 space-y-3">
                    <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                        <p className="text-sm font-medium leading-relaxed text-slate-600">
                            {pharmacy.address}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 shrink-0 text-slate-400" />
                        <p className="text-sm font-medium text-slate-600">
                            {pharmacy.phone}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-slate-100 bg-slate-50 p-4">
                <a
                    href={`tel:${pharmacy.phone.replace(/\s+/g, "")}`}
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-2 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                    <Phone className="h-5 w-5 sm:h-4 sm:w-4" />
                    <span>Ara</span>
                </a>
                <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-2 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <Navigation className="h-5 w-5 sm:h-4 sm:w-4" />
                    <span>Yol Tarifi</span>
                </a>
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                >
                    <MessageCircle className="h-5 w-5 sm:h-4 sm:w-4" />
                    <span>Paylaş</span>
                </a>
            </div>
        </div>
    );
}
