export interface ProductItem {
    name_id: string;
    name_en: string;
    image?: string;
}

export interface Product {
    id: string;
    category_id: string;
    category_en: string;
    items: ProductItem[];
    details_id: string[];
    details_en: string[];
    image?: string;
}

export type Language = 'id' | 'en';

export interface Partner {
    id: string;
    name: string;
    logo: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    avatar?: string;
}

export interface HeroSlide {
    id: string;
    image: string;
    caption?: string;
}
