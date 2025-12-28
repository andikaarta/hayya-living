'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Product, ProductItem } from '@/types';

export default function ProductList() {
    const { language, t } = useLanguage();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    if (loading) return <div className="py-20 text-center">Loading products...</div>;

    return (
        <div id="products" className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        {t('products.title')}
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        {language === 'id' ? 'Klik kategori untuk melihat koleksi lengkap' : 'Click a category to view full collection'}
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedProduct(product)}
                            className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                        >
                            <div className="aspect-w-3 aspect-h-3 bg-gray-200 group-hover:opacity-90 relative h-64 overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={language === 'id' ? product.category_id : product.category_en}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <p className="text-white text-sm font-medium">
                                        {language === 'id' ? 'Lihat Koleksi' : 'View Collection'}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {language === 'id' ? product.category_id : product.category_en}
                                </h3>

                                <div className="text-sm text-gray-500 mb-4 flex-1">
                                    <p className="line-clamp-2">
                                        {(language === 'id' ? product.details_id : product.details_en).join(', ')}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wide">
                                        {product.items.length} {language === 'id' ? 'Item' : 'Items'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedProduct && (
                <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    {/* Background backdrop */}
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={() => setSelectedProduct(null)}></div>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            {/* Modal panel */}
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900" id="modal-title">
                                                {language === 'id' ? selectedProduct.category_id : selectedProduct.category_en}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {(language === 'id' ? selectedProduct.details_id : selectedProduct.details_en).join(' • ')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedProduct(null)}
                                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                        >
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Sub-items Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                        {selectedProduct.items.map((item, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden mb-3 h-48 sm:h-56">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={language === 'id' ? item.name_id : item.name_en}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        /* Use category image as fallback if no specific item image */
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-50 p-4">
                                                            {selectedProduct.image ? (
                                                                <img src={selectedProduct.image} className="w-full h-full object-cover opacity-50 grayscale" alt="fallback" />
                                                            ) : (
                                                                <span className="text-gray-300 text-xs">No Image</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="text-md font-medium text-gray-900 text-center">
                                                    {language === 'id' ? item.name_id : item.name_en}
                                                </h4>
                                            </div>
                                        ))}
                                        {selectedProduct.items.length === 0 && (
                                            <div className="col-span-full text-center py-10 text-gray-500 italic">
                                                {language === 'id' ? 'Item belum tersedia.' : 'No items available yet.'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setSelectedProduct(null)}
                                    >
                                        {language === 'id' ? 'Tutup' : 'Close'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
