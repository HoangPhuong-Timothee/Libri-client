import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Inventory } from "../models/inventory.model";
import { Pagination } from "../models/pagination.model";
import { InventoryParams } from "../models/params.model";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    inventories?: Inventory[]

    constructor(private http: HttpClient) {}

    updateBookInventory(bookId: number, quantity: number) {
        return this.http.put(`${environment.baseAPIUrl}/api/Inventories/${bookId}`, quantity)
    }

    importBookInventories(file: File) {
        return this.http.post(`${environment.baseAPIUrl}/api/Inventories/import`, file, { reportProgress: true, observe: 'events' })
    }

    getAllBookInventories(inventoryParams: InventoryParams) {
      let params = new HttpParams()
      if (inventoryParams.search) params = params.append('search', inventoryParams.search)
      params = params.append('pageIndex', inventoryParams.pageIndex)
      params = params.append('pageSize', inventoryParams.pageSize)
      return this.http.get<Pagination<Inventory[]>>(`${environment.baseAPIUrl}/api/Inventories`, { params })
    }
}
