export interface Inventory {
  bookId: number
  bookTitle: string
  bookThumbnail: string
  quantity: number
  bookStatus: string
  storeName: string
  createInfo: string
  updateInfo: string
}

export interface ImportInventoriesRequest {
  bookTitle: string
  quantity: number
  bookStoreId: number
  importDate: Date
}

export interface ExportInventoriesRequest {
  bookTitle: string
  quantity: number
  bookStoreId: number
  exportDate: Date
}
