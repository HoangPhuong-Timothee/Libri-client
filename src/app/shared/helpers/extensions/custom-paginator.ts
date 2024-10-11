import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
    override itemsPerPageLabel = "Hiển thị"
    override nextPageLabel= "Trang tiếp theo"
    override previousPageLabel = "Trang trước"
    override firstPageLabel = "Trang đầu tiên"
    override lastPageLabel = "Trang cuối cùng"

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 của ${length} kết quả`
        }
        const startIndex = page * pageSize
        const endIndex = startIndex < length 
            ? Math.min(startIndex + pageSize, length)
            : startIndex + pageSize
        return `${startIndex + 1} - ${endIndex} của ${length} kết quả` 
    }
}