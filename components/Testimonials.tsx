'use client';

import React, { useEffect, useState } from 'react';
import { Testimonial } from '@/types';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(res => res.json())
            .then(data => setTestimonials(data))
            .catch(err => console.error(err));
    }, []);

    if (testimonials.length === 0) return null;

    return (
        <div className="py-16 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">What They Say</h2>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="flex animate-marquee-reverse whitespace-nowrap">
                    {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
                        <div key={idx} className="mx-4 w-80 bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex-shrink-0 whitespace-normal">
                            <div className="flex items-center mb-4">
                                <img
                                    src={t.avatar || `https://ui-avatars.com/api/?name=${t.name}&background=random`}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">{t.name}</h4>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm italic">"{t.content}"</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-reverse {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee-reverse {
                     /* Using a slightly different duration for visual variety */
                    animation: marquee-reverse 40s linear infinite;
                }
            `}</style>
        </div>
    );
}
