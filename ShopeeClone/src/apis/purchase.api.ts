import type { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import type { SuccessResponseAPI } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseAPI = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponseAPI<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getListPurchases: (params: { status: PurchaseListStatus }) => {
    return http.get<SuccessResponseAPI<Purchase[]>>(URL, {
      params
    })
  }
}

export default purchaseAPI
