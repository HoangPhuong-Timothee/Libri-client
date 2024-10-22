import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class InventoryService {
    
    constructor(private http: HttpClient) {}

    updateBookStock(bookId: number, quantity: number) {
        return this.http.put(`${environment.baseAPIUrl}/api/Inventories/${bookId}`, quantity)
    }

    importBooksStock(file: File) {
        return this.http.post(`${environment.baseAPIUrl}/api/Inventories/import`, file)
    }
}