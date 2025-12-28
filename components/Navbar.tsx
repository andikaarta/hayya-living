'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="relative w-10 h-10">
                                    {/* We use a simple img tag for simplicity with local files, or Next Image if preferred */}
                                    <img src="/images/logo.png" alt="Hayya Living Logo" className="object-contain w-full h-full" />
                                </div>
                                <span className="font-bold text-xl text-gray-800">
                                    Hayya Living
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link href="#hero" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.home')}
                        </Link>
                        <Link href="#products" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.products')}
                        </Link>
                        <Link href="#about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.about')}
                        </Link>
                        <Link href="#contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.contact')}
                        </Link>

                        <div className="flex items-center space-x-2 border-l pl-4 ml-4">
                            <button
                                onClick={() => setLanguage('id')}
                                className={`text-sm font-medium ${language === 'id' ? 'text-blue-600' : 'text-gray-400'}`}
                            >
                                ID
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`text-sm font-medium ${language === 'en' ? 'text-blue-600' : 'text-gray-400'}`}
                            >
                                EN
                            </button>
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link href="#hero" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            {t('nav.home')}
                        </Link>
                        <Link href="#products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            {t('nav.products')}
                        </Link>
                        <Link href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            {t('nav.about')}
                        </Link>
                        <Link href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            {t('nav.contact')}
                        </Link>
                        <div className="flex items-center px-3 py-2 space-x-4">
                            <button
                                onClick={() => setLanguage('id')}
                                className={`text-base font-medium ${language === 'id' ? 'text-blue-600' : 'text-gray-400'}`}
                            >
                                Bahasa Indonesia
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`text-base font-medium ${language === 'en' ? 'text-blue-600' : 'text-gray-400'}`}
                            >
                                English
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
