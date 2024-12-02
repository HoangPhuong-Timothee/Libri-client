export interface Inventory {
  bookId: number
  bookTitle: string
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
  importNotes: string
}

export interface ExportInventoriesRequest {
  bookTitle: string
  quantity: number
  bookStoreId: number
  exportDate: Date
  exportNotes: string
}
