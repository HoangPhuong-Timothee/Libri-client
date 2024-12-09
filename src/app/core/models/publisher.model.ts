export interface Publisher {
    id: number
    name: string
    createInfo?: string
    updateInfo?: string
}

export interface AddPublisherRequest {
  name: string
}
export interface UpdatePublisherRequest {
  id: number
  name: string
}
