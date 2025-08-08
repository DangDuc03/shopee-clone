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
  },
  buyPruchases: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessResponseAPI<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchases: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessResponseAPI<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePruchases: (purchase_id: string[]) => {
    return http.delete<SuccessResponseAPI<{ deleted_count: number }>>(`${URL}`, {
      data: purchase_id
    })
  }
}

export default purchaseAPI
