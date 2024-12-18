export interface Inventory {
  bookId: number
  bookTitle: string
  quantity: number
  bookStatus: string
  unitOfMeasure: string
  storeName: string
  createInfo: string
  updateInfo: string

}

export interface InventoryTransaction {
  transactionId: number
  storeName: string
  storeAddress: string
  transactionType: string
  quantity: number
  measureUnit: string
  transactionDate: string
  performedBy: string
  transactionNotes: string
  showDetails?: boolean
}

export interface ImportInventoriesRequest {
  bookTitle: string
  unitOfMeasureId: number
  quantity: number
  bookStoreId: number
  importDate: Date
  importNotes: string
}

export interface ExportInventoriesRequest {
  bookTitle: string
  unitOfMeasureId: number
  quantity: number
  bookStoreId: number
  exportDate: Date
  exportNotes: string
}
