import { Address } from "./address.model"

export interface CreateOrderRequest {
  basketId: string
  deliveryMethodId: string
  shippingAddress: Address
  paymentIntentId: string
}

export interface OrderItem {
  bookId: number
  bookTitle: string
  bookImage: string
  price: number
  quantity: number
}

export interface Order {
  id: number
  userEmail: string
  orderDate: string
  shippingAddress: string
  deliveryMethod: string
  shippingPrice: number
  orderItems: OrderItem[]
  subtotal: number
  status: string
}
