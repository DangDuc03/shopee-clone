import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import type { QueryconfigType } from 'src/pages/ProductList/ProductList'

interface Iprops {
  queryConfig: QueryconfigType
  pageSize: number
}
/**
 * page:	Trang hiện tại đang xem
  pageSize:	Tổng số trang , vd pageSize = 100 / 5 = 20
  pageNumber:	Trang hiện tại trong vòng lặp (index + 1), vd pageNumber = 1,2,3,4,5,6,7,8,9,..20
  RANGE:	Số lượng trang muốn hiển thị trước và sau page hiện tại
 */

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Iprops) {
  const { page } = queryConfig
  const currentPage = Number(page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    // dot after
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-auto'>
            ...
          </span>
        )
      }
      return null
    }
    // dot before
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-auto'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // điều kiện return về dot ...
        // TH1
        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        }
        // TH2
        else if (currentPage > RANGE * 2 + 1 && currentPage < pageSize - RANGE * 2) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        }
        // TH3
        else if (currentPage >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('bg-white rounded px-3 py-2 border shadow-sm mx-2 cursor-pointer', {
              'border-orange-500': pageNumber === currentPage,
              'border-transparent': pageNumber !== currentPage
            })}
            // onClick={() => )}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {currentPage === 1 ? (
        <span className={`bg-white/50 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed`}>Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className={`bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer`}
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {currentPage === pageSize ? (
        <span className={`bg-white/60 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed`}>Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className={`bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer`}
        >
          Prev
        </Link>
      )}
    </div>
  )
}
