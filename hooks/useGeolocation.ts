import { useState } from 'react';

interface Coordinates {
    lat: number;
    lng: number;
}

export function useGeolocation() {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getLocation = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Tarayıcınız konum servisini desteklemiyor.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLoading(false);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError("Haritada size en yakın eczaneyi bulabilmemiz için konum iznine ihtiyacımız var.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setError("Konum bilginize şu anda ulaşılamıyor.");
                        break;
                    case error.TIMEOUT:
                        setError("Konum isteği zaman aşımına uğradı, lütfen tekrar deneyin.");
                        break;
                    default:
                        setError("Konum alınırken bilinmeyen bir hata oluştu.");
                        break;
                }
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return { coordinates, error, loading, getLocation };
}
