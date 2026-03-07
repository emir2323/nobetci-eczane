export interface Pharmacy {
    id: string;
    name: string;
    address: string;
    phone: string;
    latitude: number;
    longitude: number;
    distance?: number;
    city: string;
    district: string;
}

// CollectAPI veya benzeri servislerden dönen ham veri modeli örneği
export interface CollectApiPharmacyData {
    name: string;
    dist: string;
    address: string;
    phone: string;
    loc: string; // "latitude,longitude" formatında virgülle ayrılmış
}

export interface CollectApiResponse {
    success: boolean;
    result: CollectApiPharmacyData[];
}
