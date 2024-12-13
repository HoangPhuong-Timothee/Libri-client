import { Address } from "./address.model"

export interface CreateOrderRequest {
  deliveryMethodId: string
  shippingAddress: Address
}

export interface OrderItem {
  bookId: number
  bookTitle: string
  bookImageUrl: string
  price: number
  quantity: number
}

export interface Order {
  orderId: number
  userEmail: string
  orderDate: string
  shippingAddress: string
  deliveryMethodInfo: string
  shippingPrice: number
  discount?: number
  orderItems: OrderItem[]
  subtotal: number
  total: number
  status: string
}
