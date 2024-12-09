import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { InventoryTransaction } from "../models/inventory-transaction.model";
import { ExportInventoriesRequest, ImportInventoriesRequest, Inventory } from "../models/inventory.model";
import { Pagination } from "../models/pagination.model";
import { InventoryParams, InventoryTransactionParams } from "../models/params.model";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    inventories: Inventory[] = []
    inventoryPagination?: Pagination<Inventory[]>
    inventoryParams = new InventoryParams()
    inventoryCache = new Map<string, Pagination<Inventory[]>>()

    constructor(private http: HttpClient) {}

    getAllBookInventories(useCache = true): Observable<Pagination<Inventory[]>> {
      if (!useCache) {
        this.inventoryCache = new Map()
      }
      if (this.inventoryCache.size > 0 && useCache) {
        if (this.inventoryCache.has(Object.values(this.inventoryParams).join('-'))) {
          this.inventoryPagination = this.inventoryCache.get(Object.values(this.inventoryParams).join('-'))

          if(this.inventoryPagination) {
            return of(this.inventoryPagination)
          }
        }
      }
      let params = new HttpParams()
      if (this.inventoryParams.search) params = params.append('search', this.inventoryParams.search)
      if (this.inventoryParams.genreId) params = params.append('genreId', this.inventoryParams.genreId)
      if (this.inventoryParams.bookStoreId) params = params.append('bookStoreId', this.inventoryParams.bookStoreId)
      params = params.append('pageIndex', this.inventoryParams.pageIndex)
      params = params.append('pageSize', this.inventoryParams.pageSize)
      return this.http.get<Pagination<Inventory[]>>(`${environment.baseAPIUrl}/api/Inventories`, { params }).pipe(
        map(response => {
          this.inventories = [...this.inventories, ...response.data]
          this.inventoryPagination = response
          return response
        })
      )
    }

    setInventoryParams(params: InventoryParams) {
      this.inventoryParams = params
    }

    getInventoryParams() {
      return this.inventoryParams
    }

    getBookQuantityByTitleAndStoreId(title: string, bookStoreId: number) {
      return this.http.get<number>(`${environment.baseAPIUrl}/api/Inventories/quantity?bookTitle=${title}&bookStoreId=${bookStoreId}`)
    }

    getBookInventoryTransactions(bookId: number, storeName: string, invTranParams: InventoryTransactionParams) {
      let params = new HttpParams().set('bookId', bookId).set('storeName', storeName)
      if (invTranParams.transactionType) params = params.append('transactionType', invTranParams.transactionType)
      if (invTranParams.startDate) params = params.append('startDate', new Date(invTranParams.startDate).toDateString())
      if (invTranParams.endDate) params = params.append('endDate', new Date(invTranParams.endDate).toDateString())
      return this.http.get<InventoryTransaction[]>(`${environment.baseAPIUrl}/api/Inventories/inventory-transactions`, { params })
    }

    importInventoriesFromFile(file: File) {
      const formData = new FormData()
      formData.append('file', file, file.name)
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/import-from-file`, formData, {
        reportProgress: true,
        observe: 'events'
      })
    }

    exportInventoriesFromFile(file: File) {
      const formData = new FormData()
      formData.append('file', file, file.name)
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/export-from-file`, formData, {
        reportProgress: true,
        observe: 'events'
      })
    }

    importInventoriesManual(importRequests: ImportInventoriesRequest[]) {
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/import-manual`, importRequests)
    }

    exportInventoriesManual(exportRequests: ExportInventoriesRequest[]) {
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/export-manual`, exportRequests)
    }

}
