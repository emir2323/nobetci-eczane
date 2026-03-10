import { mockPharmacies } from './mock-data';
import { Pharmacy, CollectApiResponse } from '@/types';

const API_KEY = "apikey 5prCX8oWf4p60GQEb1fA97:0BUL0mpXl7HVhlr0TgYW3W";
const BASE_URL = "https://api.collectapi.com/health/dutyPharmacy";

export async function getPharmacies(city: string, district: string): Promise<Pharmacy[]> {
    const normalizedCity = city.toLowerCase();
    const normalizedDistrict = district.toLowerCase();

    const getMockFallback = () => {
        return mockPharmacies.filter(p =>
            p.city.toLowerCase() === normalizedCity &&
            p.district.toLowerCase() === normalizedDistrict
        );
    };

    try {
        const url = `${BASE_URL}?ilce=${district}&il=${city}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "authorization": API_KEY,
                "content-type": "application/json"
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`CollectAPI fetch failed with status: ${response.status}`);
            return getMockFallback();
        }

        const data: CollectApiResponse = await response.json();

        if (!data || !data.success || !Array.isArray(data.result)) {
            console.error("CollectAPI returned unsuccessful or malformed response", data);
            return getMockFallback();
        }

        const pharmacies: Pharmacy[] = data.result.map((item, index) => {
            let latitude = 0;
            let longitude = 0;

            if (item.loc) {
                const parts = item.loc.split(',');
                if (parts.length === 2) {
                    latitude = parseFloat(parts[0].trim());
                    longitude = parseFloat(parts[1].trim());
                }
            }

            return {
                id: `${normalizedCity}-${normalizedDistrict}-${index}-${Date.now()}`,
                name: item.name,
                address: item.address,
                phone: item.phone,
                latitude,
                longitude,
                city: normalizedCity,
                district: item.dist ? item.dist.toLowerCase() : normalizedDistrict
            };
        });

        return pharmacies;
    } catch (error) {
        console.error("Error fetching pharmacies from CollectAPI:", error);
        return getMockFallback();
    }
}
