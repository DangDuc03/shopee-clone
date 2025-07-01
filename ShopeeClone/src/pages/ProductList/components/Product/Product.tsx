import { Link } from 'react-router-dom'
import ProductRating from 'src/Components/ProductRating'
import path from 'src/constants/path'
import type { Product as ProductType } from 'src/types/product.type'
import { formarNumberToSocialStyle, formatCurrency, generateURLNameId } from 'src/utils/utils'

interface IProps {
  product: ProductType
}

export default function Product({ product }: IProps) {
  return (
    <Link to={`${path.home}${generateURLNameId({ name: product.name, _id: product._id })}`}>
      <div className='bg-white shadow rounded-sm overflow-hidden hover:translate-y-[-0.0625rem] hover:shadow-lg hover:border hover:border-customOrange duration-100 transition-transform'>
        {/* image */}
        <div className='w-full pt-[100%] relative'>
          <img src={product.image} alt='' className='absolute top-0 left-0 w-full h-full bg-white object-cover' />
        </div>
        {/* title */}
        <div className='p-2 overflow-hidden'>
          <div className='min-h-10 line-clamp-2 text-sm'>{product.name}</div>
        </div>
        {/* price */}
        <div className='flex items-center ml-2 gap-2 pr-1'>
          <div className='line-through max-w-[40%] text-gray-500 truncate text-xs'>
            <span>₫</span>
            <span>{formatCurrency(product.price_before_discount)}</span>
          </div>
          <div className='flex items-center max-w-[60%] text-customOrange truncate text-sm'>
            <span className='text-sm'>₫</span>
            <span className=''>{formatCurrency(product.price)}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4 ml-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z'
              />
            </svg>
          </div>
        </div>
        {/* star & sold */}
        <div className='mt-3 flex items-center justify-start ml-2 pb-2'>
          {/* star */}
          <ProductRating rating={product.rating} />
          {/* sold */}
          <div className='bg-gray-200 w-[0.5px] h-3 mx-1'></div>
          <div className='ml-1 text-xs flex justify-end'>
            <span className=''>Đã bán {formarNumberToSocialStyle(product.sold)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
