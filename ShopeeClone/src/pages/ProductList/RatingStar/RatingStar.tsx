import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import type { QueryconfigType } from '../ProductList'

interface IProps {
  queryConfig: QueryconfigType
}

export default function RatingStar({ queryConfig }: IProps) {
  return (
    <ul className='mb-10'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='py-1 pl-2' key={index}>
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  rating_filter: String(5 - index)
                }).toString()
              }}
              className='flex items-center text-sm text-gray-600'
            >
              {Array(5)
                .fill(0)
                .map((_, indexStar) => {
                  if (indexStar < 5 - index) {
                    return (
                      <svg
                        key={indexStar}
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        fill='#ffce3d'
                        className='w-5 h-5 mr-1'
                      >
                        <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
                      </svg>
                    )
                  }
                  return (
                    <svg viewBox='0 0 30 30' className='w-4 h-4 mr-1'>
                      <defs>
                        <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                          <stop offset='0%' stopColor='#FFD211' />
                          <stop offset='100%' stopColor='#FFAD27' />
                        </linearGradient>
                      </defs>
                      <path
                        fill='none'
                        fillRule='evenodd'
                        stroke='url(#star__hollow)'
                        strokeWidth={2}
                        d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                      />
                    </svg>
                  )
                })}
              {index !== 0 && <span>trở lên</span>}
            </Link>
          </li>
        ))}
    </ul>
  )
}
