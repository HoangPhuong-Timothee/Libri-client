export interface User {
  id: number
  email: string
  userName: string
  imageUrl: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
  roles: string[]
  token: string
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
