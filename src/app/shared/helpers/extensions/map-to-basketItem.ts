import { BasketItem } from "src/app/core/models/basket.model";
import { Book } from "src/app/core/models/book.model";

export function mapToBasketItem(item: Book): BasketItem{
    return {
        id: item.id,
        bookName: item.title,
        price: item.price,
        quantity: 0,
        imageUrl: item.imageUrl,
        author: item.author
    }
}