"use server";

import { mockPharmacies } from './mock-data';
import { Pharmacy, CollectApiResponse } from '@/types';

const API_KEY = "apikey 5prCX8oWf4p60GQEb1fA97:0BUL0mpXl7HVhlr0TgYW3W";
const BASE_URL = "https://api.collectapi.com/health/dutyPharmacy";

export async function getPharmacies(city: string, district?: string): Promise<Pharmacy[]> {
    const normalizedCity = city.toLowerCase();
    const normalizedDistrict = district ? district.toLowerCase() : undefined;

    const getMockFallback = () => {
        return mockPharmacies.filter(p => {
            const matchCity = p.city.toLowerCase() === normalizedCity;
            if (normalizedDistrict) {
                return matchCity && p.district.toLowerCase() === normalizedDistrict;
            }
            return matchCity;
        });
    };

    try {
        const url = district ? `${BASE_URL}?ilce=${district}&il=${city}` : `${BASE_URL}?il=${city}`;

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

        const pharmacies: Pharmacy[] = data.result.map((apiItem: any) => {
            let latitude = 0;
            let longitude = 0;

            if (apiItem.loc) {
                const parts = apiItem.loc.split(',');
                if (parts.length === 2) {
                    latitude = parseFloat(parts[0].trim());
                    longitude = parseFloat(parts[1].trim());
                }
            }

            return {
                id: Math.random().toString(36).substr(2, 9),
                name: apiItem.name,
                address: apiItem.address,
                phone: apiItem.phone,
                latitude,
                longitude,
                city: normalizedCity,
                district: apiItem.dist ? apiItem.dist.toLowerCase() : normalizedDistrict
            };
        });

        return pharmacies;
    } catch (error) {
        console.error("Error fetching pharmacies from CollectAPI:", error);
        return getMockFallback();
    }
}
