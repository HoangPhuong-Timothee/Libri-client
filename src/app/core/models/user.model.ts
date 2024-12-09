import { Address } from "./address.model";

export interface User {
  id: number
  email: string
  userName: string
  imageUrl: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
  roles: string[] | string
  token: string
}

export interface ModifyProfileRequest {
  email: string
  userName: string
  imageUrl: string
  phoneNumber: string
  address: Address
}

export interface Member {
  id: number
  email: string
  imageUrl: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
  address: string
  roles: string
}
