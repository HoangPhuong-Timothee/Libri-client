import { Address } from "./address.model";

export interface User {
    id: number;
    userName: string;
    email: string;
    imageUrl: string;
    address: Address;
    phoneNumber: string;
    token: string;
    roles: string | string[]
}
