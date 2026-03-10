"use client";

import { useState, useEffect } from "react";
import { Search, Map as MapIcon, ChevronDown, Navigation, AlertCircle } from "lucide-react";
import { PharmacyCard } from "@/components/ui/PharmacyCard";
import { getPharmacies } from "@/lib/api-service";
import { useGeolocation } from "@/hooks/useGeolocation";
import { calculateDistance, slugify } from "@/lib/utils";
import { Pharmacy } from "@/types";
import { useRouter } from "next/navigation";
import turkeyData from "@/lib/turkey-data.json";

export default function Home() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [districtsOfCity, setDistrictsOfCity] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Pharmacy[]>([]);
  const [filterMode, setFilterMode] = useState<'form' | 'location'>('form');
  const router = useRouter();

  const { coordinates, error: locationError, loading: locationLoading, getLocation } = useGeolocation();

  // Update districts list when city changes
  useEffect(() => {
    if (city) {
      const selectedCityData = turkeyData.find(c => slugify(c.name) === city);
      if (selectedCityData) {
        setDistrictsOfCity(selectedCityData.districts);
        // Reset district if the new city doesn't have the currently selected district
        if (!selectedCityData.districts.some(d => slugify(d) === district)) {
          setDistrict("");
        }
      } else {
        setDistrictsOfCity([]);
      }
    } else {
      setDistrictsOfCity([]);
    }
  }, [city, district]);



  useEffect(() => {
    if (coordinates && filterMode === 'location') {
      const fetchNearestPharmacies = async () => {
        try {
          setIsSearching(true);
          // 1. Reverse Geocoding
          const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.lat}&longitude=${coordinates.lng}&localityLanguage=tr`);
          const geoData = await geoRes.json();

          let userCity = slugify(geoData.principalSubdivision || "istanbul");
          let userDistrict = slugify(geoData.city || geoData.locality || "kadikoy");

          // API ve arayüz uyumu için bazı düzeltmeler (örn: "İstanbul" -> "istanbul")
          if (userCity.includes('istanbul')) userCity = 'istanbul';

          // 2. Fetch Real Pharmacies
          const pharmacies = await getPharmacies(userCity, userDistrict);

          // 3. Map and Sort Distances
          const pharmaciesWithDistance = pharmacies.map(p => ({
            ...p,
            distance: calculateDistance(coordinates.lat, coordinates.lng, p.latitude, p.longitude)
          })).sort((a, b) => (a.distance || 0) - (b.distance || 0));

          setResults(pharmaciesWithDistance);
        } catch (error) {
          console.error("Bulunduğunuz konumdaki eczaneler getirilirken bir hata oluştu:", error);
        } finally {
          setIsSearching(false);
        }
      };

      fetchNearestPharmacies();
    }
  }, [coordinates, filterMode]);

  const handleFormSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!city || !district) {
      alert("Lütfen arama yapmadan önce geçerli bir İl ve İlçe seçiniz.");
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      const citySlug = slugify(city);
      const districtSlug = slugify(district);
      router.push(`/${citySlug}/${districtSlug}-nobetci-eczane`);
    }, 400);
  };

  const handleFindNearest = () => {
    setFilterMode('location');
    getLocation();
  };

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-8 md:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600 mb-6 border border-red-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
          Türkiye Geneli Canlı Nöbetçi Eczaneler
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900 max-w-3xl">
          En Yakın Nöbetçi
          <span className="text-red-500 block mt-2">Eczaneyi Bulun</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed">
          İhtiyacınız olduğunda 81 ilde nöbetçi eczanelere saniyeler içinde ulaşın.
          Şu an açık olanları haritada görüntüleyin, tek tıkla arayın.
        </p>

        {/* Location Button */}
        <div className="mt-10">
          <button
            onClick={handleFindNearest}
            disabled={locationLoading}
            className="group flex items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {locationLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-white" />
            ) : (
              <Navigation className="h-5 w-5 text-emerald-400 group-hover:animate-bounce" />
            )}
            Bana En Yakın Eczaneyi Bul
          </button>
          {locationError && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {locationError}
            </p>
          )}
        </div>

        <div className="relative mt-12 w-full max-w-4xl">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-50/50 px-4 text-sm font-medium text-slate-400">
              Veya İl/İlçe Seçin
            </span>
          </div>
        </div>

        {/* Search Widget */}
        <div className="w-full max-w-4xl mt-12 bg-white rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleFormSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <label htmlFor="city" className="sr-only">İl Seçin</label>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500">
                <MapIcon className="h-5 w-5" />
              </div>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none rounded-2xl bg-slate-50 border-0 py-4 pl-12 pr-10 text-base font-medium text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-red-500 cursor-pointer"
              >
                <option value="" disabled>İl Seçiniz</option>
                {turkeyData.map((c) => (
                  <option key={c.name} value={slugify(c.name)}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>

            <div className="relative flex-1 group">
              <label htmlFor="district" className="sr-only">İlçe Seçin</label>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-red-500">
                <MapIcon className="h-5 w-5" />
              </div>
              <select
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full appearance-none rounded-2xl bg-slate-50 border-0 py-4 pl-12 pr-10 text-base font-medium text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-red-500 cursor-pointer"
              >
                <option value="" disabled>İlçe Seçiniz</option>
                {districtsOfCity.map((d) => (
                  <option key={d} value={slugify(d)}>
                    {d}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-70 sm:w-auto"
            >
              {isSearching ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Eczane Bul
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="pt-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {filterMode === 'location' ? (
                <span>Size Yakın Eczaneler</span>
              ) : (
                <><span className="capitalize">{city}</span>, <span className="capitalize">{district}</span></>
              )}
            </h2>
            <p className="text-slate-500 mt-1">
              {filterMode === 'location' ? "Konumunuza en yakın olanlar listeleniyor" : "Şu an nöbetçi olan eczaneler"}
            </p>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-4 text-slate-400">
              <MapIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-2 text-sm font-semibold text-slate-900">Eczane bulunamadı</h3>
            <p className="mt-1 text-sm text-slate-500">
              {filterMode === 'location'
                ? "Konumunuza yakın nöbetçi eczane bulunamadı."
                : "Seçtiğiniz lokasyonda şu an için nöbetçi eczane kaydı bulunmuyor."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
