import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { BookQuantity, ExportInventoriesRequest, ImportInventoriesRequest, Inventory, InventoryTransaction } from "../models/inventory.model";
import { Pagination } from "../models/pagination.model";
import { InventoryParams, InventoryTransactionParams, ValidateBookQuantityInBookStoreParams } from "../models/params.model";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    inventories: Inventory[] = []
    inventoryPagination?: Pagination<Inventory[]>
    inventoryParams = new InventoryParams()
    inventoryCache = new Map<string, Pagination<Inventory[]>>()

    constructor(private http: HttpClient) { }

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
      if (this.inventoryParams.inventoryStatus) params = params.append('inventoryStatus', this.inventoryParams.inventoryStatus)
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

    getConvertedAndRemainingQuatity(validateParams: ValidateBookQuantityInBookStoreParams) {
      let params = new HttpParams()
        .set('bookTitle', validateParams.bookTitle)
        .set('bookStoreId', validateParams.bookStoreId)
        .set('unitOfMeasureId', validateParams.unitOfMeasureId)
        .set('inputQuantity', validateParams.inputQuantity)
        .set('isbn', validateParams.isbn)
      return this.http.get<BookQuantity>(`${environment.baseAPIUrl}/api/Inventories/quantity`, { params })
    }

    getBookInventoryTransactions(bookId: number, storeName: string, invTranParams: InventoryTransactionParams) {
      let params = new HttpParams()
        .set('bookId', bookId)
        .set('storeName', storeName)
      if (invTranParams.transactionType) params = params.append('transactionType', invTranParams.transactionType)
      if (invTranParams.measureUnitId) params = params.append('measureUnitId', invTranParams.measureUnitId)
      if (invTranParams.startDate) params = params.append('startDate', new Date(invTranParams.startDate).toDateString())
      if (invTranParams.endDate) params = params.append('endDate', new Date(invTranParams.endDate).toDateString())
      return this.http.get<InventoryTransaction[]>(`${environment.baseAPIUrl}/api/Inventories/inventory-transactions`, { params })
    }

    importInventoriesFromFile(file: File): Observable<any> {
      const formData = new FormData()
      formData.append('file', file, file.name)
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/import-from-file`, formData).pipe(
        tap(() => {
          this.inventoryCache = new Map()
        })
      )
    }

    exportInventoriesFromFile(file: File): Observable<any> {
      const formData = new FormData()
      formData.append('file', file, file.name)
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/export-from-file`, formData).pipe(
        tap(() => {
          this.inventoryCache = new Map()
        })
      )
    }

    importInventoriesManual(importRequests: ImportInventoriesRequest[]): Observable<any> {
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/import-manual`, importRequests).pipe(
        tap(() => {
          this.inventoryCache = new Map()
        })
      )
    }

    exportInventoriesManual(exportRequests: ExportInventoriesRequest[]): Observable<any> {
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/export-manual`, exportRequests).pipe(
        tap(() => {
          this.inventoryCache = new Map()
        })
      )
    }

}
