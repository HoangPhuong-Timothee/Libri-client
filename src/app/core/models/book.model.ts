export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    publisher: string;
    imageUrl: string;
    description: string;
    publishYear: number;
    price: number;
    quantityInStock: number;
    isAvailable: boolean;
}

export interface AddBookRequest {
    id: number;
    title: string;
    authorId: number;
    genreId: number;
    publisherId: number;
    imageUrl: string;
    description: string;
    publishYear: number;
    price: number;
    quantityInStock: number;
    isAvailable: boolean;
}

export interface UpdateBookRequest {
    id: number;
    title: string;
    authorId: number;
    genreId: number;
    publisherId: number;
    imageUrl: string;
    description: string;
    publishYear: number;
    price: number;
    quantityInStock: number;
    isAvailable: boolean;
}