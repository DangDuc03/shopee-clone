import type { Category } from 'src/types/category.type'
import type { SuccessResponseAPI } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'categories'

const categoryApi = {
  getCategory: () => http.get<SuccessResponseAPI<Category[]>>(URL)
}

export default categoryApi
