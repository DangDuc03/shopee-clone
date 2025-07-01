import { sortBy, order as orderConstant } from 'src/constants/product'

import type { ProductListConfig } from 'src/types/product.type'
import classNames from 'classnames'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import type { QueryconfigType } from '../../ProductList'

interface Iprops {
  queryConfig: QueryconfigType
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Iprops) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const currentPage = Number(queryConfig.page)

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOder = (PriceOderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: PriceOderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        {/* sort */}
        <div className='flex items-center flex-wrap gap-2'>
          <span>Sắp xếp theo</span>
          <button
            className={classNames('h-8 px-4 capitalize text-sm  text-center shadow', {
              'bg-customOrange text-white hover:bg-customOrange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={handleSortBy(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 capitalize text-sm  text-center shadow', {
              'bg-customOrange text-white hover:bg-customOrange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={handleSortBy(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 capitalize text-sm  text-center shadow', {
              'bg-customOrange text-white hover:bg-customOrange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={handleSortBy(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-2 capitalize text-sm text-left outline-none shadow', {
              'bg-customOrange text-white hover:bg-customOrange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(e) => handlePriceOder(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              Giá: Thấp đến Cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến Thấp
            </option>
          </select>
        </div>

        {/* page */}
        <div className='flex items-center'>
          <div>
            <span className='text-customOrange'>{currentPage}</span>
            <span>/{pageSize}</span>
          </div>

          {/* prev / next */}
          <div className='ml-2 flex '>
            {/* prev */}
            {currentPage === 1 ? (
              <span className='flex items-center w-9 justify-center h-8 round-tl-sm rounded-bl-sm bg-white/50 hover:bg-slate-100 cursor-not-allowed shadow'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-3 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (currentPage - 1).toString()
                  }).toString()
                }}
                className='flex items-center w-9 justify-center h-8 round-tr-sm rounded-br-sm bg-white hover:bg-slate-100 shadow'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-3 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {/* next */}
            {currentPage === pageSize ? (
              <span className='flex items-center w-9 justify-center h-8 round-tl-sm rounded-bl-sm bg-white/50 hover:bg-slate-100 cursor-not-allowed shadow'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-3 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (currentPage + 1).toString()
                  }).toString()
                }}
                className='flex items-center w-9 justify-center h-8 round-tr-sm rounded-br-sm bg-white hover:bg-slate-100 shadow'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-3 h-4'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
