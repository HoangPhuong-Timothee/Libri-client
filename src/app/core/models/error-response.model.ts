export interface ErrorDetails {
  location: string
  message: string
}

export interface APIResponse {
  statusCode: number
  message: string
  errors?: ErrorDetails[]
}
