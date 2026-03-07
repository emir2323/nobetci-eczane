import axios from 'axios';
import { Pharmacy } from '@/types';

// API entegrasyonu için yardımcı fonksiyon mocks
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
    timeout: 10000,
});

export const fetchPharmacies = async (city: string, district: string): Promise<Pharmacy[]> => {
    // Gerçekte: const response = await apiClient.get('/pharmacies', { params: { city, district }});
    // return response.data;

    // Şimdilik mock dönecek (ileride uygulanacak)
    return [];
};
