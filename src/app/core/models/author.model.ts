export interface Author {
    id: number;
    name: string;
}

export interface AddAuthorRequest {
    name: string;
}

export interface UpdateAuthorRequest {
    id: number;
    name: string;
}