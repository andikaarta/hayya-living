'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
    'nav.home': { id: 'Beranda', en: 'Home' },
    'nav.products': { id: 'Produk', en: 'Products' },
    'nav.about': { id: 'Tentang Kami', en: 'About Us' },
    'nav.contact': { id: 'Kontak', en: 'Contact' },
    'hero.title': { id: 'Simple, Stylish, and High Quality', en: 'Simple, Stylish, and High Quality' },
    'hero.subtitle': { id: 'Brand aksesoris & merchandise terpercaya untuk kebutuhan perusahaan, event, souvenir, dan personal.', en: 'Trusted accessories & merchandise brand for corporate, event, souvenir, and personal needs.' },
    'hero.cta': { id: 'Lihat Produk', en: 'View Products' },
    'about.title': { id: 'Tentang Hayya Living', en: 'About Hayya Living' },
    'about.desc': { id: 'PT. Hayya Living Sejahtera adalah brand aksesoris & merchandise dengan konsep Simple, Stylish, and High Quality. Kami melayani produk custom design untuk kebutuhan perusahaan, event, souvenir, dan personal.', en: 'PT. Hayya Living Sejahtera is an accessories & merchandise brand with a Simple, Stylish, and High Quality concept. We serve custom design products for corporate, event, souvenir, and personal needs.' },
    'about.location': { id: 'Lokasi: Depok, Jawa Barat', en: 'Location: Depok, West Java' },
    'products.title': { id: 'Kategori Produk Utama', en: 'Main Product Categories' },
    'contact.title': { id: 'Hubungi Kami', en: 'Contact Us' },
    'contact.whatsapp': { id: 'Hubungi via WhatsApp', en: 'Contact via WhatsApp' },
    'footer.rights': { id: 'Hak Cipta Dilindungi.', en: 'All Rights Reserved.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('id');

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
