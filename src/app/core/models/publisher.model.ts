export interface Publisher {
    id: number;
    name: string;
}

export interface AddPublisherRequest {
  name: string
}
export interface UpdatePublisherRequest {
  id: number;
  name: string;
}
