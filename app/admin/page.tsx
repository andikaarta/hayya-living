'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductItem, Partner, Testimonial, HeroSlide } from '@/types';

type Tab = 'products' | 'partners' | 'testimonials' | 'hero';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('products');
    const [loading, setLoading] = useState(true);

    // Data State
    const [products, setProducts] = useState<Product[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

    // Edit State
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null);

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (!auth) {
            router.push('/admin/login');
            return;
        }
        fetchAllData();
    }, [router]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [pRes, paRes, tRes, hRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/partners'),
                fetch('/api/testimonials'),
                fetch('/api/hero')
            ]);
            setProducts(await pRes.json());
            setPartners(await paRes.json());
            setTestimonials(await tRes.json());
            setHeroSlides(await hRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        router.push('/admin/login');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) callback(data.url);
            else alert('Upload failed: ' + data.message);
        } catch (error) {
            console.error('Upload error', error);
            alert('Upload error');
        }
    };

    // --- Product Handlers ---
    const saveProduct = async () => {
        if (!editingProduct) return;
        const updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
        setProducts(updated);
        setEditingProduct(null);
        await saveData('/api/products', updated);
    };

    const handleProductItemChange = (idx: number, value: string) => {
        if (!editingProduct) return;
        const newItems = [...editingProduct.items];
        newItems[idx] = { ...newItems[idx], name_id: value, name_en: value };
        setEditingProduct({ ...editingProduct, items: newItems });
    };

    const handleProductItemImageChange = (idx: number, url: string) => {
        if (!editingProduct) return;
        const newItems = [...editingProduct.items];
        newItems[idx] = { ...newItems[idx], image: url };
        setEditingProduct({ ...editingProduct, items: newItems });
    };


    // --- Partner Handlers ---
    const addPartner = () => {
        const newPartner: Partner = { id: Date.now().toString(), name: 'New Partner', logo: '' };
        setPartners([...partners, newPartner]);
        setEditingPartner(newPartner);
    };
    const deletePartner = async (id: string) => {
        if (!confirm("Delete this partner?")) return;
        const updated = partners.filter(p => p.id !== id);
        setPartners(updated);
        await saveData('/api/partners', updated);
    };
    const savePartner = async () => {
        if (!editingPartner) return;
        const exists = partners.find(p => p.id === editingPartner.id);
        let updated;
        if (exists) {
            updated = partners.map(p => p.id === editingPartner.id ? editingPartner : p);
        } else {
            updated = [...partners, editingPartner];
        }
        setPartners(updated);
        setEditingPartner(null);
        await saveData('/api/partners', updated);
    };

    // --- Testimonial Handlers ---
    const addTestimonial = () => {
        const newTestimonial: Testimonial = { id: Date.now().toString(), name: 'New Name', role: 'Role', content: 'Content...', avatar: '' };
        setTestimonials([...testimonials, newTestimonial]);
        setEditingTestimonial(newTestimonial);
    };
    const deleteTestimonial = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;
        const updated = testimonials.filter(t => t.id !== id);
        setTestimonials(updated);
        await saveData('/api/testimonials', updated);
    };
    const saveTestimonial = async () => {
        if (!editingTestimonial) return;
        const exists = testimonials.find(t => t.id === editingTestimonial.id);
        let updated;
        if (exists) {
            updated = testimonials.map(t => t.id === editingTestimonial.id ? editingTestimonial : t);
        } else {
            updated = [...testimonials, editingTestimonial];
        }
        setTestimonials(updated);
        setEditingTestimonial(null);
        await saveData('/api/testimonials', updated);
    };

    // --- Hero Slide Handlers ---
    const addHeroSlide = () => {
        const newSlide: HeroSlide = { id: Date.now().toString(), image: '', caption: 'New Slide' };
        setHeroSlides([...heroSlides, newSlide]);
        setEditingHeroSlide(newSlide);
    };
    const deleteHeroSlide = async (id: string) => {
        if (!confirm("Delete this slide?")) return;
        const updated = heroSlides.filter(s => s.id !== id);
        setHeroSlides(updated);
        await saveData('/api/hero', updated);
    };
    const saveHeroSlide = async () => {
        if (!editingHeroSlide) return;
        const exists = heroSlides.find(s => s.id === editingHeroSlide.id);
        let updated;
        if (exists) {
            updated = heroSlides.map(s => s.id === editingHeroSlide.id ? editingHeroSlide : s);
        } else {
            updated = [...heroSlides, editingHeroSlide];
        }
        setHeroSlides(updated);
        setEditingHeroSlide(null);
        await saveData('/api/hero', updated);
    };

    const saveData = async (url: string, data: any) => {
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            alert('Saved successfully!');
        } catch (e) {
            console.error(e);
            alert('Failed to save');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
                </div>
                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-4 flex gap-6 mt-4 border-b">
                    {(['products', 'partners', 'testimonials', 'hero'] as Tab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-2 capitalize font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 sm:p-8">
                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <div>
                        {editingProduct ? (
                            <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
                                <h3 className="text-lg font-bold mb-4">Edit Product</h3>
                                {/* Simple Product Edit Form (Similar to previous) */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-500">Name (ID)</label>
                                            <input value={editingProduct.category_id} onChange={e => setEditingProduct({ ...editingProduct, category_id: e.target.value })} className="w-full border p-1 rounded text-gray-900" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500">Name (EN)</label>
                                            <input value={editingProduct.category_en} onChange={e => setEditingProduct({ ...editingProduct, category_en: e.target.value })} className="w-full border p-1 rounded text-gray-900" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500">Image</label>
                                        <div className="flex gap-2">
                                            <input value={editingProduct.image || ''} onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })} className="flex-1 border p-1 rounded text-gray-900" />
                                            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center justify-center">
                                                Upload
                                                <input type="file" className="hidden" onChange={e => handleFileUpload(e, (url) => setEditingProduct({ ...editingProduct, image: url }))} />
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mt-4 mb-2">Items</h4>
                                        {editingProduct.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-2 mb-2 items-center bg-gray-50 p-2 rounded">
                                                <div className="flex-1 space-y-1">
                                                    <input
                                                        value={item.name_id}
                                                        onChange={e => handleProductItemChange(idx, e.target.value)}
                                                        placeholder="Item Name"
                                                        className="w-full border p-1 rounded text-sm text-gray-900"
                                                    />
                                                    <div className="flex gap-2">
                                                        <input
                                                            value={item.image || ''}
                                                            onChange={e => handleProductItemImageChange(idx, e.target.value)}
                                                            placeholder="Image URL"
                                                            className="flex-1 border p-1 rounded text-xs bg-white text-gray-900"
                                                        />
                                                        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center justify-center">
                                                            Upload
                                                            <input type="file" className="hidden" onChange={e => handleFileUpload(e, (url) => handleProductItemImageChange(idx, url))} />
                                                        </label>
                                                    </div>
                                                </div>
                                                <button onClick={() => {
                                                    const newItems = editingProduct.items.filter((_, i) => i !== idx);
                                                    setEditingProduct({ ...editingProduct, items: newItems });
                                                }} className="text-red-500 font-bold px-2">X</button>
                                            </div>
                                        ))}
                                        <button onClick={() => setEditingProduct({ ...editingProduct, items: [...editingProduct.items, { name_id: '', name_en: '' }] })} className="text-sm text-blue-600 underline">+ Add Item</button>
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <button onClick={saveProduct} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                                        <button onClick={() => setEditingProduct(null)} className="text-gray-500 px-4 py-2">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {products.map(p => (
                                    <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            {p.image && <img src={p.image} className="w-10 h-10 object-cover rounded" />}
                                            <span className="font-medium text-gray-900">{p.category_id}</span>
                                        </div>
                                        <button onClick={() => setEditingProduct(JSON.parse(JSON.stringify(p)))} className="text-blue-600 hover:underline">Edit</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* PARTNERS TAB */}
                {activeTab === 'partners' && (
                    <div>
                        {editingPartner ? (
                            <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
                                <h3 className="text-lg font-bold mb-4">{editingPartner.id && partners.find(p => p.id === editingPartner.id) ? 'Edit Partner' : 'Add Partner'}</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-500">Name</label>
                                        <input value={editingPartner.name} onChange={e => setEditingPartner({ ...editingPartner, name: e.target.value })} className="w-full border p-1 rounded text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500">Logo URL</label>
                                        <div className="flex gap-2">
                                            <input value={editingPartner.logo} onChange={e => setEditingPartner({ ...editingPartner, logo: e.target.value })} className="flex-1 border p-1 rounded text-gray-900" />
                                            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center justify-center">
                                                Upload
                                                <input type="file" className="hidden" onChange={e => handleFileUpload(e, (url) => setEditingPartner({ ...editingPartner, logo: url }))} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                        <button onClick={savePartner} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                                        <button onClick={() => {
                                            if (partners.find(p => p.id === editingPartner.id)) setEditingPartner(null); // Cancel edit
                                            else setPartners(partners.filter(p => p.id !== editingPartner.id)); // Cancel new (simplification, actually just set null is enough usually but strict cleanup)
                                            setEditingPartner(null);
                                        }} className="text-gray-500 px-4 py-2">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <button onClick={addPartner} className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow">+ Add Partner</button>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {partners.map(p => (
                                        <div key={p.id} className="bg-white p-4 rounded shadow flex items-center gap-4">
                                            <img src={p.logo || 'https://via.placeholder.com/50'} className="w-12 h-12 object-contain" />
                                            <div className="flex-1 overflow-hidden">
                                                <h4 className="font-bold text-gray-900 truncate">{p.name}</h4>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setEditingPartner({ ...p })} className="text-blue-600 text-sm">Edit</button>
                                                <button onClick={() => deletePartner(p.id)} className="text-red-500 text-sm">Del</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TESTIMONIALS TAB */}
                {activeTab === 'testimonials' && (
                    <div>
                        {editingTestimonial ? (
                            <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
                                <h3 className="text-lg font-bold mb-4">Edit Testimonial</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-500">Name</label>
                                        <input value={editingTestimonial.name} onChange={e => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} className="w-full border p-1 rounded text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500">Role</label>
                                        <input value={editingTestimonial.role} onChange={e => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })} className="w-full border p-1 rounded text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500">Content</label>
                                        <textarea value={editingTestimonial.content} onChange={e => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })} className="w-full border p-1 rounded h-24 text-gray-900" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500">Avatar URL</label>
                                        <div className="flex gap-2">
                                            <input value={editingTestimonial.avatar || ''} onChange={e => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })} className="flex-1 border p-1 rounded text-gray-900" />
                                            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center justify-center">
                                                Upload
                                                <input type="file" className="hidden" onChange={e => handleFileUpload(e, (url) => setEditingTestimonial({ ...editingTestimonial, avatar: url }))} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                        <button onClick={saveTestimonial} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                                        <button onClick={() => setEditingTestimonial(null)} className="text-gray-500 px-4 py-2">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <button onClick={addTestimonial} className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow">+ Add Testimonial</button>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {testimonials.map(t => (
                                        <div key={t.id} className="bg-white p-4 rounded shadow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img src={t.avatar || `https://ui-avatars.com/api/?name=${t.name}`} className="w-10 h-10 rounded-full" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                                                    <p className="text-xs text-gray-500">{t.role}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingTestimonial({ ...t })} className="text-blue-600 text-sm">Edit</button>
                                                    <button onClick={() => deleteTestimonial(t.id)} className="text-red-500 text-sm">Del</button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 italic line-clamp-3">"{t.content}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* HERO TAB */}
                {activeTab === 'hero' && (
                    <div>
                        {editingHeroSlide ? (
                            <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
                                <h3 className="text-lg font-bold mb-4">Edit Hero Slide</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-500">Image URL</label>
                                        <div className="flex gap-2">
                                            <input value={editingHeroSlide.image || ''} onChange={e => setEditingHeroSlide({ ...editingHeroSlide, image: e.target.value })} className="flex-1 border p-1 rounded text-gray-900" />
                                            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold flex items-center justify-center">
                                                Upload
                                                <input type="file" className="hidden" onChange={e => handleFileUpload(e, (url) => setEditingHeroSlide({ ...editingHeroSlide, image: url }))} />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500">Caption (Optional)</label>
                                        <input value={editingHeroSlide.caption || ''} onChange={e => setEditingHeroSlide({ ...editingHeroSlide, caption: e.target.value })} className="w-full border p-1 rounded text-gray-900" />
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                        <button onClick={saveHeroSlide} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                                        <button onClick={() => setEditingHeroSlide(null)} className="text-gray-500 px-4 py-2">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <button onClick={addHeroSlide} className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow">+ Add Slide</button>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {heroSlides.map(s => (
                                        <div key={s.id} className="bg-white p-4 rounded shadow">
                                            <div className="h-40 bg-gray-100 rounded mb-2 overflow-hidden">
                                                {s.image ? <img src={s.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>}
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 mb-2 truncate">{s.caption || 'No Caption'}</p>
                                            <div className="flex gap-2">
                                                <button onClick={() => setEditingHeroSlide({ ...s })} className="text-blue-600 text-sm">Edit</button>
                                                <button onClick={() => deleteHeroSlide(s.id)} className="text-red-500 text-sm">Del</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
