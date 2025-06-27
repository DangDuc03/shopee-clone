import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import CountDown from 'src/Components/CountDown'
import InputNumber from 'src/Components/InputNumber'
import ProductRating from 'src/Components/ProductRating'
import { formarNumberToSocialStyle, formatCurrency, salePercent } from 'src/utils/utils'
import DOMPurify from 'dompurify'

export default function ProductDetail() {
  const { id } = useParams()

  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail'],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data

  if (!product) return null

  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='custom-container'>
          <div className='grid grid-cols-12 gap-9'>
            {/* image product */}
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%]'>
                <img src={product.image} alt='' className='absolute top-0 left-0 w-full h-full bg-white object-cover' />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative w-full pt-[100%]' key={img}>
                      <img
                        src={product.image}
                        alt=''
                        className='absolute top-0 left-0 w-full h-full bg-white object-cover border'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-customOrange'></div>}
                    </div>
                  )
                })}
                <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            {/* content product */}
            <div className='col-span-7'>
              {/* title */}
              <div className='text-xl uppercase font-medium'>{product.name}</div>
              {/* rating & sold */}
              <div className='mt-5 flex items-center'>
                {/* display rating */}
                <div className='flex items-center'>
                  <span className='mr-2 border-b border-b-customOrange text-black'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='w-5 h-5 fill-customOrange'
                    nonActiveClassName='w-5 h-5 fill-gray-300'
                    includeNumberRating='hidden'
                  />
                </div>
                {/* display sold */}
                <div className='bg-gray-200 w-[1.5px] h-5 mx-3'></div>
                <span className='mr-2 border-b border-b-customOrange text-black'>
                  {formarNumberToSocialStyle(product.sold)}
                </span>
                <span className='text-gray-400 text-sm'> Đã bán</span>
              </div>
              {/* price */}
              <div className='relative w-full flex flex-row mt-8'>
                <div className='absolute top-0 left-0 h-9 w-full bg-customOrange text-white px-3 flex items-center justify-between'>
                  <span className='text-2xl font-bold uppercase'>flash sale</span>
                  <div className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={24}
                      height={24}
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-clock-icon lucide-clock'
                    >
                      <circle cx={12} cy={12} r={10} />
                      <polyline points='12 6 12 12 16 14' />
                    </svg>
                    <div className='ml-2 flex items-center'>
                      <span>Kết thúc trong: </span>
                      <CountDown
                        initialTime={{ hours: 1, minutes: 30, seconds: 0 }}
                        flashThresholdInMinutes={2}
                        className='text-white'
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-8 flex items-center bg-gray-50 px-5 py-6 w-full'>
                  {/* before discount */}
                  <div className='text-gray-400 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                  {/* after discount */}
                  <div className='ml-3 text-3xl font-medium text-customOrange'>₫{formatCurrency(product.price)}</div>
                  <div className='text-customOrange'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={24}
                      height={24}
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='w-7 h-7 ml-3'
                    >
                      <path d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z' />
                      <path d='m9 12 2 2 4-4' />
                    </svg>
                  </div>
                  <div className='ml-1 rounded-sm bg-customOrange px-2 py-1 text-xs text-white font-semibold uppercase'>
                    {salePercent(product.price_before_discount, product.price)} giảm
                  </div>
                </div>
              </div>
              {/* add product */}
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  {/* minus & plus*/}
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                    </svg>
                  </button>
                  <InputNumber
                    value={1}
                    classNameError='hidden'
                    classNameInput='w-14 h-8 border-t border-b border-gray-300 p-1 text-center outline-none text-customOrange'
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                  <div className='ml-6 text-sm text-gray-500'>{product.quantity} Sản phẩm có sẵn</div>
                </div>
              </div>
              {/* button add */}
              <div className='mt-10 flex items-center'>
                <div className='flex px-6 h-12 justify-center items-center text-customOrange bg-customOrange/10 hover:bg-customOrange/5 border border-customOrange text-sm capitalize cursor-pointer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 mr-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  <span>Thêm vào giỏ hàng</span>
                </div>
                <div className='ml-6 px-10 h-12  flex justify-center items-center text-white bg-customOrange hover:bg-customOrange/80 outline-none cursor-pointer capitalize'>
                  Mua ngay
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* description */}
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='custom-container'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>mô tả sản phẩm</div>
          <div className='mx-4 mt-5 mb-4 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
