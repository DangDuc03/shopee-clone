import type { Product } from './product.type'

export type PuchaseStaus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PuchaseStaus | 0

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PuchaseStaus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
