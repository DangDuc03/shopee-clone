import { Link } from 'react-router-dom'
import Button from 'src/Components/Button'
import Input from 'src/Components/Input'
import path from 'src/constants/path'

export default function AsideFilter() {
  return (
    <div className=' py-3 ml-3'>
      {/* Category */}
      <Link to={path.home} className='flex items-center font-semibold ml-1'>
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
          className='w-4 h-5'
        >
          <path d='M11 13v4' />
          <path d='M15 5v4' />
          <path d='M3 3v16a2 2 0 0 0 2 2h16' />
          <rect x={7} y={13} width={9} height={4} rx={1} />
          <rect x={7} y={5} width={12} height={4} rx={1} />
        </svg>

        <span className='ml-1 capitalize'>Tất cả danh mục</span>
      </Link>
      <div className='bg-gray-300 h-[1px] my-2'></div>
      <ul className='pb-10'>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 text-customOrange font-semibold '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='red'
              stroke='currentColor'
              className='w-5 h-6 absolute top-[-3px] left-[-10px]'
            >
              <path d='m9 18 6-6-6-6' />
            </svg>
            <span className=''>Điện thoại</span>
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 font-medium'>
            <span>Đồng hồ</span>
          </Link>
        </li>
      </ul>

      {/* Filter */}
      <Link to={path.home} className='flex items-center font-semibold mt-4 ml-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={24}
          height={24}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          className='w-4 h-5'
        >
          <path d='M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z' />
        </svg>
        <span className='ml-1'>Bộ lọc tìm kiếm</span>
      </Link>
      <div className='bg-gray-300 h-[1px] my-2'></div>
      <div className='my-5 ml-2 pb-10'>
        <span>Khoảng giá</span>
        <form className='mt-3'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='form'
              placeholder='Từ'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
            />
            <div className='mx-2 mt-1 shrink-0 text-gray-400'>-</div>
            <Input
              type='text'
              className='grow'
              name='form'
              placeholder='Đến'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-customOrange text-white hover:bg-customOrange/80 flex justify-center items-center'>
            <span>Áp dụng</span>
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-2'></div>

      {/* star */}
      <div className='my-3'> Đánh giá</div>
      <ul className='mb-10'>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm text-gray-600'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='#ffce3d'
                  className='w-5 h-5 mr-1'
                >
                  <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
                </svg>
              ))}
            <span>trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm text-gray-600'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns='http://www.w3.org/2000/svg'
                  width={24}
                  height={24}
                  viewBox='0 0 24 24'
                  fill='#ffce3d'
                  className='w-5 h-5 mr-1'
                >
                  <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
                </svg>
              ))}
            <span>trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-2'></div>
      <Button className='w-full mt-2 p-2 uppercase bg-customOrange text-white hover:bg-customOrange/80 flex justify-center items-center'>
        <span>Xoá tất cả</span>
      </Button>
    </div>
  )
}
