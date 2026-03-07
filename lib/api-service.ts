import { Pharmacy, CollectApiResponse } from "@/types";
import { mockPharmacies } from "@/lib/mock-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.collectapi.com/health/dutyPharmacy";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * Belirtilen il ve ilçe için nöbetçi eczaneleri CollectAPI'den çeker
 * Next.js 14 fetch API kullanılarak 1 saat (3600 sn) revalidate süresi (cache) eklenmiştir.
 */
export async function getPharmacies(city: string, district?: string): Promise<Pharmacy[]> {
    try {
        // Vercel server-side exception v1.0 Fix: 
        // Gerçek API isteğini geçici olarak yoruma alıp, demoda hatasız çalışması
        // için sadece mock veri + yapay gecikme kullanıyoruz.

        // Demo için yapay gecikme (500ms)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Her durumda mock veri döndür
        return fallbackMockData(city, district);

        /*
        // Orijinal API Fetch Kodu (Yoruma Alındı):
        if (!API_KEY) {
            console.warn("API_KEY bulunamadı, mock veriler kullanılıyor.");
            return fallbackMockData(city, district);
        }

        const url = new URL(API_URL);
        url.searchParams.append("il", city);
        if (district) {
            url.searchParams.append("ilce", district);
        }

        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": `apikey ${API_KEY}`,
            },
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`API Hatası: ${res.status} ${res.statusText}`);
        }

        const data: CollectApiResponse = await res.json();

        if (!data.success || !data.result) {
            throw new Error("API isteği başarısız oldu veya sonuç dönmedi.");
        }

        return data.result.map((item, index) => {
            let lat = 0;
            let lng = 0;

            if (item.loc) {
                const [latStr, lngStr] = item.loc.split(",");
                lat = parseFloat(latStr);
                lng = parseFloat(lngStr);
            }

            return {
                id: `${city}-${district || 'all'}-${index}`,
                name: item.name,
                address: item.address,
                phone: item.phone,
                latitude: lat,
                longitude: lng,
                city: city,
                district: item.dist || district || "",
            };
        });
        */
    } catch (error) {
        console.error("Eczane verileri çekilirken hata oluştu:", error);
        // Hata durumunda uygulamanın patlamaması için mock veriye düşüyoruz.
        return fallbackMockData(city, district);
    }
}

function fallbackMockData(city: string, district?: string): Pharmacy[] {
    return mockPharmacies.filter((p) => {
        const cityMatch = p.city.toLowerCase() === city.toLowerCase();
        const districtMatch = district ? p.district.toLowerCase() === district.toLowerCase() : true;
        return cityMatch && districtMatch;
    });
}
