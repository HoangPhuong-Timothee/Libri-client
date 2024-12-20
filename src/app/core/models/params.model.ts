export class MemberParams {
  pageIndex = 1
  pageSize = 20
}

export class BookParams {
    genreId = 0
    publisherId = 0
    authorId = 0
    sort = 'title'
    pageIndex = 1
    pageSize = 20
    search = ''
}

export class BookStoreParams {
  pageIndex = 1
  pageSize = 20
  search = ''
}

export class GenreParams {
    pageIndex = 1
    pageSize = 20
    search = ''
}

export class AuthorParams {
    pageIndex = 1
    pageSize = 20
    search = ''
}

export class PublisherParams {
    pageIndex = 1
    pageSize = 20
    search = ''
}

export class InventoryParams {
  bookStoreId = 0
  genreId = 0
  pageIndex = 1
  pageSize = 20
  search = ''
}

export class InventoryTransactionParams {
  transactionType?: string
  startDate?: Date
  endDate?: Date
}

export class AdminOrderParams {
  orderStatus?: string
  pageIndex = 1
  pageSize = 20
}

export class OrderParams {
  sort = 'newest'
  pageIndex = 1
  pageSize = 20
}

export class UnitOfMeasureParams {
  pageIndex = 1
  pageSize = 20
  search = ''
}
