"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockBlogPosts, BlogPost } from "@/lib/mock-blog";
import { FileText, LogOut, Plus, Home, Edit, Trash2, MapPin, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [activeTab, setActiveTab] = useState("makaleler");

    // State for Fake CRUD
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newImage, setNewImage] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newKeywords, setNewKeywords] = useState("");

    const [gaId, setGaId] = useState("");
    const [adCode1, setAdCode1] = useState("");
    const [adCode2, setAdCode2] = useState("");

    useEffect(() => {
        setIsClient(true);
        // Basit güvenlik kontrolü
        const isAuth = localStorage.getItem("admin-auth");
        if (!isAuth) {
            router.push("/admin");
        } else {
            setPosts(mockBlogPosts);
            setGaId(localStorage.getItem("gaId") || "");
            setAdCode1(localStorage.getItem("adCode1") || "");
            setAdCode2(localStorage.getItem("adCode2") || "");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("admin-auth");
        router.push("/admin");
    };

    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newContent) return;

        const newPost: BlogPost = {
            id: Date.now().toString(),
            title: newTitle,
            slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            summary: newContent.substring(0, 100) + "...",
            content: newContent,
            imageUrl: newImage || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
            date: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }),
            author: "Admin",
            keywords: newKeywords,
        };

        setPosts([newPost, ...posts]);
        setShowAddForm(false);
        setNewTitle("");
        setNewContent("");
        setNewImage("");
        setNewKeywords("");
    };

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("gaId", gaId);
        localStorage.setItem("adCode1", adCode1);
        localStorage.setItem("adCode2", adCode2);
        alert("Ayarlar başarıyla kaydedildi!");
    };

    if (!isClient) return null; // Hydration hatasını önlemek için

    return (
        <div className="flex flex-col md:flex-row gap-6 min-h-[70vh]">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col">
                <div className="mb-8 px-4 py-2 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">Admin Panel</h2>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                        <Home className="h-5 w-5 text-slate-400" />
                        Siteye Dön
                    </Link>
                    <button
                        onClick={() => setActiveTab("makaleler")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'makaleler' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <FileText className={`h-5 w-5 ${activeTab === 'makaleler' ? 'text-blue-500' : 'text-slate-400'}`} />
                        Makaleler
                    </button>
                    <button
                        onClick={() => setActiveTab("eczaneler")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'eczaneler' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <MapPin className={`h-5 w-5 ${activeTab === 'eczaneler' ? 'text-blue-500' : 'text-slate-400'}`} />
                        Eczane Listesi
                    </button>
                    <button
                        onClick={() => setActiveTab("ayarlar")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'ayarlar' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Settings className={`h-5 w-5 ${activeTab === 'ayarlar' ? 'text-blue-500' : 'text-slate-400'}`} />
                        Site Ayarları
                    </button>
                </nav>

                <div className="mt-auto pt-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
                {activeTab === 'makaleler' && (
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-100 pb-4">
                            <h1 className="text-2xl font-bold text-slate-900">Makale Yönetimi</h1>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                            >
                                {showAddForm ? 'İptal Et' : <><Plus className="h-4 w-4" /> Yeni Ekle</>}
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Yeni Makale Ekle</h3>
                                <form onSubmit={handleCreatePost} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Başlık</label>
                                        <input
                                            type="text" required
                                            value={newTitle} onChange={e => setNewTitle(e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Resim URL (Opsiyonel)</label>
                                        <input
                                            type="text"
                                            value={newImage} onChange={e => setNewImage(e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">İçerik (Markdown destekler)</label>
                                        <textarea
                                            required rows={5}
                                            value={newContent} onChange={e => setNewContent(e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Anahtar Kelimeler (Virgülle ayırın)</label>
                                        <input
                                            type="text"
                                            value={newKeywords} onChange={e => setNewKeywords(e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <button type="submit" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                                        Kaydet
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="space-y-4">
                            {posts.map(post => (
                                <div key={post.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors bg-white">
                                    <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-slate-100 hidden sm:block">
                                        <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-bold text-slate-900 truncate">{post.title}</h4>
                                        <p className="text-sm text-slate-500 truncate">{post.date} • {post.author}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {posts.length === 0 && (
                                <p className="text-center text-slate-500 py-8">Henüz makale bulunmuyor.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'eczaneler' && (
                    <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                        <MapPin className="h-12 w-12 text-slate-300 mb-4" />
                        <h2 className="text-xl font-bold text-slate-900">Eczane Listesi</h2>
                        <p className="mt-2 text-slate-500 max-w-md">Eczane listesi doğrudan CollectAPI üzerinden dinamik olarak gelmektedir. Bu modül şu an sadece izleme (view-only) modundadır.</p>
                    </div>
                )}

                {activeTab === 'ayarlar' && (
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Site Ayarları</h1>
                        <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Google Analytics ID (str. G-XXXX)</label>
                                <input
                                    type="text"
                                    value={gaId} onChange={e => setGaId(e.target.value)}
                                    placeholder="G-XXXXXXXXXX"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Reklam Kodu 1 (Header/Üst)</label>
                                <textarea
                                    rows={4}
                                    value={adCode1} onChange={e => setAdCode1(e.target.value)}
                                    placeholder="<script>...</script> veya <div>...</div>"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Reklam Kodu 2 (Footer/Alt)</label>
                                <textarea
                                    rows={4}
                                    value={adCode2} onChange={e => setAdCode2(e.target.value)}
                                    placeholder="<script>...</script> veya <div>...</div>"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                                />
                            </div>
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                                Ayarları Kaydet
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
