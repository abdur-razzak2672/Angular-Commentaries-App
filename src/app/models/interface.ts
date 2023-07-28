export interface Post {
    id: number;
    title: string;
    pmalink: string;
    category: {
        id: number;
        category: string;
    };
    excerpt: string;
    imageUrl: string;
    content: string;
    image: string;
    isFeatured: boolean;
    isActive: boolean;
    createdAt: Date;
     
}
