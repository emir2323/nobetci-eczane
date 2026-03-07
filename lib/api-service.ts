import { Pharmacy } from "@/types";
import { mockPharmacies } from "@/lib/mock-data";

/**
 * Belirtilen il ve ilçe için nöbetçi eczaneleri mock veriden çeker
 * Vercel Server-side Exception hatalarını tamamen önlemek için
 * her türlü harici bağımlılık, fetch işlemi veya gecikme temizlenmiştir.
 */
export async function getPharmacies(city: string, district?: string): Promise<Pharmacy[]> {
    return mockPharmacies.filter((p) => {
        const cityMatch = p.city.toLowerCase() === city.toLowerCase();
        const districtMatch = district ? p.district.toLowerCase() === district.toLowerCase() : true;
        return cityMatch && districtMatch;
    });
}
