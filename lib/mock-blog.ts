export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    imageUrl: string;
    date: string;
    author: string;
    keywords?: string;
}

export const mockBlogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Bağışıklık Sisteminizi Güçlendirmenin 5 Doğal Yolu",
        slug: "bagisiklik-sisteminizi-guclendirmenin-5-dogal-yolu",
        summary: "Havaların soğumasıyla birlikte hastalıklara karşı vücut direncinizi artıracak en etkili doğal yöntemler.",
        content: `
# Bağışıklık Sisteminizi Güçlendirmenin Doğal Yolları

Kış aylarının yaklaşmasıyla birlikte vücut direncimizi artırmak her zamankinden daha önemli hale geldi. İşte bağışıklığınızı güçlendirecek 5 basit ama etkili yol:

1. **Yeterli ve Kaliteli Uyku:** Her gece 7-8 saat düzenli uyumak, vücudun kendini yenilemesi için şarttır.
2. **C Vitamini Tüketimi:** Portakal, mandalina, kivi gibi meyvelerin yanı sıra yeşil biber ve brokoli harika C vitamini kaynaklarıdır.
3. **Bol Su İçin:** Vücuttaki toksinlerin atılması için günde en az 2-2.5 litre su içmeyi ihmal etmeyin.
4. **Düzenli Egzersiz:** Haftada en az 150 dakika orta tempolu yürüyüş veya egzersiz, kan dolaşımınızı hızlandırarak savunma hücrelerinizin etkinliğini artırır.
5. **D Vitamini Takviyesi:** Güneşin az yüzünü gösterdiği kış günlerinde, doktor kontrolünde D vitamini takviyesi almak hayati öneme sahip olabilir.

*Sağlıklı günler dileriz.*
    `,
        imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80",
        date: "12 Kasım 2023",
        author: "Uzm. Ecz. Ayşe Yılmaz"
    },
    {
        id: "2",
        title: "Ağrı Kesicileri Kullanırken Nelere Dikkat Etmeliyiz?",
        slug: "agri-kesicileri-kullanirken-nelere-dikkat-etmeliyiz",
        summary: "Bilinçsiz ağrı kesici kullanımı mide ve böbreklere zarar verebilir. Doğru kullanım için bilmeniz gerekenler.",
        content: `
# Ağrı Kesici Kullanım Rehberi

Günlük hayatta sıkça başvurduğumuz ağrı kesiciler, masum görünmekle birlikte yanlış kullanıldığında ciddi sağlık sorunlarına yol açabilir.

## Dikkat Edilmesi Gereken Temel Kurallar

- **Aç Karnına İçmeyin:** Özellikle NSAİİ grubu (İbuprofen vb.) ağrı kesiciler mide zarını tahriş edebilir. Mutlaka tok karnına veya bir bardak süt ile alınmalıdır.
- **Dozu Aşmayın:** Prospektüste belirtilen günlük maksimum dozu kesinlikle geçmeyin.
- **Sürekli Kullanımdan Kaçının:** Ağrı kesiciler tedavi edici değil, semptom gidericidir. Ağrınız 3-4 günden uzun sürüyorsa mutlaka bir hekime başvurun.
- **Etkileşimlere Dikkat:** Başka ilaçlar kullanıyorsanız, olası etkileşimler için **mutlaka eczacınıza danışın**.

Eczanelerimizde size en uygun ve güvenli seçeneği bulmak için her zaman yanınızdayız.
    `,
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
        date: "05 Ekim 2023",
        author: "Ecz. Mustafa Kemal"
    },
    {
        id: "3",
        title: "Evde Bulunması Gereken İlk Yardım Malzemeleri",
        slug: "evde-bulunmasi-gereken-ilk-yardim-malzemeleri",
        summary: "Olası kazalara karşı evinizdeki ecza dolabında mutlaka bulunması gereken temel sağlık malzemeleri listesi.",
        content: `
# Acil Durumlar İçin Ev Ecza Dolabı

Küçük kazalar her an başımıza gelebilir. Hazırlıklı olmak, paniği önler ve hızlı müdahale hayat kurtarabilir. Evinizdeki ecza dolabında şunların bulunduğundan emin olun:

### Temel Malzemeler
* Yara bandı (Farklı boyutlarda)
* Steril sargı bezi ve gazlı bez
* Antiseptik solüsyon (Baticon vb.)
* Yanık merhemi
* Ateş ölçer (Termometre)
* Elastik sargı bandajı
* Makas ve cımbız

### Basit İlaçlar
* Parasetamol bazlı ağrı kesici ve ateş düşürücüler
* Alerji merhemleri (Böcek sokmalarına karşı)

**Önemli Not:** Ecza dolabınızı yılda en az iki kez kontrol edin ve tarihi geçmiş ürünleri eczanenize teslim ederek güvenle imha edilmesini sağlayın. Çöpe atmayın!
    `,
        imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80",
        date: "22 Eylül 2023",
        author: "Dr. Zeynep Can"
    }
];
