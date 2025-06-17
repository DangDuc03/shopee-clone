import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function Product() {
  return (
    <Link to={path.home}>
      <div className='bg-white shadow rounded-sm overflow-hidden hover:translate-y-[-0.0625rem] hover:shadow-lg hover:border hover:border-customOrange duration-100 transition-transform'>
        {/* image */}
        <div className='w-full pt-[100%] relative'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134211-7ras8-matprun78tef1b@resize_w900_nl.webp'
            alt=''
            className='absolute top-0 left-0 w-full h-full bg-white object-cover'
          />
        </div>
        {/* title */}
        <div className='p-2 overflow-hidden'>
          <div className='min-h-10 line-clamp-2 text-sm'>
            Áo Kiểu Tay Phồng Cổ Búp Bê Form Rộng Họa Tiết Sọc Caro Thời Trang Mùa Hè - Hàng mới về
          </div>
        </div>
        {/* price */}
        <div className='flex items-center mt-3 ml-2 gap-2'>
          <div className='line-through max-w-[50%] text-gray-500 truncate text-sm'>
            <span>₫</span>
            <span>876.000</span>
          </div>
          <div className='flex items-center max-w-[50%] text-customOrange truncate'>
            <span className='text-sm'>₫</span>
            <span className=''>560.000</span>
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
          <div className='flex items-center'>
            <div className='relative'>
              <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='w-4 h-4 fill-yellow-400 text-yellow-400'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                  />
                </svg>
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-4 h-4 fill-current text-gray-300'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                />
              </svg>
            </div>
            <span className='text-sm'>4.0</span>
            <div className='bg-gray-200 w-[0.5px] h-3 mx-1'></div>
          </div>

          {/* sold */}
          <div className='ml-2 text-sm'>
            <span>Đã bán</span>
            <span className='ml-1'>138</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
