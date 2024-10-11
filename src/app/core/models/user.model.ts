export interface User {
    id: number;
    userName: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    token: string;
    roles: string | string[]
}
