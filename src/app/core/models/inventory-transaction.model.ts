export interface InventoryTransaction {
  id: number
  storeName: string
  storeAddress: string
  transactionType: string
  quantity: number
  transactionDate: string
  performedBy: string
  notes: string
  showDetails?: boolean
}
