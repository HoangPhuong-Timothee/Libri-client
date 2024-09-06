export interface User {
    id: number;
    userName: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    address: string;
    token:string,
    roles: string | string[]
    createdAt: Date;
    updatedAt: Date;
}