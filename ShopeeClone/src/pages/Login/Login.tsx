import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='bg-customOrange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng Nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='py-3 px-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                  placeholder='email'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  autoComplete='on'
                  className='py-3 px-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                  placeholder='password'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              </div>
              <div className='mt-5'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-customOrange hover:bg-red-600 text-white text-sm'
                >
                  Đăng Nhập
                </button>
              </div>
              <div className='flex justify-center mt-8'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee ? </span>
                <Link to='/register' className='text-customOrange ml-1'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
