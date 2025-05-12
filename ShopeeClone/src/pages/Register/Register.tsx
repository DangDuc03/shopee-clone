import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { rules } from 'src/utils/rules'

interface IFormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<IFormData>()

  const onSubmit = handleSubmit(
    (data) => {
      console.log('data: ', data)
    },
    (data) => {
      const password = getValues('password')
      console.log('password: ', password)
    }
  )

  console.log('error: ', errors)
  return (
    <div className='bg-customOrange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='py-3 px-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                  placeholder='email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  className='py-3 px-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                  placeholder='password'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  className='py-3 px-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus: shadow-sm'
                  placeholder='confirm password'
                  {...register('confirm_password', {
                    ...rules.confirm_password,
                    validate: (value) => value === getValues('password') || 'Nhập lại password không khớp'
                  })}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-8'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-customOrange hover:bg-red-600 text-white text-sm'
                >
                  Đăng ký
                </button>
              </div>
              <div className='flex justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản ? </span>
                <Link to='/login' className='text-customOrange ml-1'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
