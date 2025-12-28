'use client';

import React, { useEffect, useState } from 'react';
import { Partner } from '@/types';

export default function Partners() {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        fetch('/api/partners')
            .then(res => res.json())
            .then(data => setPartners(data))
            .catch(err => console.error(err));
    }, []);

    if (partners.length === 0) return null;

    return (
        <div className="py-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Our Partners</h2>
            </div>
            <div className="relative w-full overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                    {/* Duplicate list for infinite loop effect */}
                    {[...partners, ...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="mx-8 flex items-center justify-center min-w-[150px]">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
}
