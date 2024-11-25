export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string,
  password: string
  confirmPassword: string
  phoneNumber: string
  gender: string
  dateOfBirth: Date
}
