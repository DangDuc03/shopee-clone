import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from 'src/Components/Pagination'
import type { ProductList, ProductListConfig } from 'src/types/product.type'
import { isUndefined, omitBy } from 'lodash'
import categoryApi from 'src/apis/category.api'
import SortProductList from './components/SortProductList'

export type QueryconfigType = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryconfigType = useQueryParams()
  const queryConfig: QueryconfigType = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )
  const { data: ProductData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })

  const { data: CategoryData } = useQuery({
    queryKey: ['categories', queryConfig],
    queryFn: () => {
      return categoryApi.getCategory()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {ProductData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              {/* AsideFilter */}
              <AsideFilter queryConfig={queryConfig} CategoryData={CategoryData?.data.data || []} />
            </div>
            <div className='col-span-9 mx-3'>
              {/* sort */}
              <SortProductList queryConfig={queryConfig} pageSize={ProductData.data.data.pagination.page_size} />
              {/* product */}
              <div className='mt-6  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {ProductData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              {/* pagination */}
              <Pagination queryConfig={queryConfig} pageSize={ProductData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
