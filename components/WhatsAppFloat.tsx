'use client';

import React from 'react';

export default function WhatsAppFloat() {
    const phoneNumber = '6287881046873';
    const message = 'Halo Hayya Living, saya ingin konsultasi kebutuhan produk.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 group"
            style={{ textDecoration: 'none' }}
        >
            {/* Text Bubble (Hidden on mobile initially, visible on hover or always visible on desktop if preferred, but requested specific text implies visibility) */}
            <span className="font-medium text-sm hidden sm:block max-w-[150px] leading-tight text-right">
                Konsultasikan kebutuhan mu, langsung chat kami
            </span>

            {/* WhatsApp Icon */}
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.297-.471-.446-.966-.446-.495 0-1.287.198-1.956.917-.668.719-2.553 2.502-2.553 6.103 0 3.601 2.628 5.434 2.999 5.954.371.52 5.176 7.906 12.54 11.054 1.761.753 3.523 1.258 5.207.994.496-.079 1.579-.645 1.802-1.267.223-.622.223-1.142.149-1.267-.074-.124-.272-.198-.57-.347-.297-.149-1.579-.768-1.826-.867-.247-.099-.421-.149-.594.124-.173.273-.693.867-.842 1.04-.149.173-.297.198-.594.049-.297-.149-1.253-.462-2.387-1.472-.884-.787-1.481-1.758-1.654-2.055-.173-.297-.025-.446.124-.594.124-.124.272-.322.421-.496.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.521.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487 2.086.9 3.713.961 4.981.825 1.411-.151 2.915-1.192 3.326-2.342.411-1.15.411-2.135.288-2.343z" />
            </svg>
        </a>
    );
}
