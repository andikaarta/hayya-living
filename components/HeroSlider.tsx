'use client';

import React, { useEffect, useState } from 'react';
import { HeroSlide } from '@/types';

export default function HeroSlider() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => setSlides(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [slides]);

    if (slides.length === 0) {
        // Fallback placeholder if no slides
        return (
            <div className="w-full h-full min-h-[400px] bg-gray-200 flex items-center justify-center rounded-xl">
                <span className="text-gray-400">Loading Slides...</span>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-xl group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.caption || 'Slide'}
                        className="w-full h-full object-cover"
                    />
                    {/* Caption Overlay */}
                    {slide.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-lg font-medium">{slide.caption}</p>
                        </div>
                    )}
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
