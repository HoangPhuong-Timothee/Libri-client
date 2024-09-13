export interface UserInfo {
    id: number;
    userName: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    address: string;
    role: string | string[]
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    userName: string;
    email: string;
    imageUrl: string;
    phoneNumber: string;
    address: string;
}