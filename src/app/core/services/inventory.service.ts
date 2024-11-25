import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ImportInventoriesRequest, Inventory } from "../models/inventory.model";
import { Pagination } from "../models/pagination.model";
import { InventoryParams } from "../models/params.model";

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

    importInventoriesFromFile(file: File) {
      const formData = new FormData()
      formData.append('file', file, file.name)
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/import-from-file`, formData, {
        reportProgress: true,
        observe: 'events'
      })
    }

    importInventoriesManual(request: ImportInventoriesRequest[]) {
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/import-manual`, request)
    }

    exportInventoriesFromFile(file: File) {
      const formData = new FormData()
      formData.append('file', file, file.name)
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/export-from-file`, formData, {
        reportProgress: true,
        observe: 'events'
      })
    }

    exportInventoriesManual(exportInventoriesRequest: any) {
      return this.http.post(`${environment.baseAPIUrl}/api/Inventories/export-manual`, exportInventoriesRequest)
    }

}
