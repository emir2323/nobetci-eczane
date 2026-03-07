import { mockPharmacies } from './mock-data';
import { Pharmacy } from '@/types';

// Basit, düz fonksiyon. Async bile olmasın garanti olsun.
export function getPharmacies(city: string, district: string): Pharmacy[] {
    const normalizedCity = city.toLowerCase();
    const normalizedDistrict = district.toLowerCase();

    // Mock data içinden filtrele
    return mockPharmacies.filter(p =>
        p.city.toLowerCase() === normalizedCity &&
        p.district.toLowerCase() === normalizedDistrict
    );
}
