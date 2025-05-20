import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAccount } from 'src/apis/auth.api'
import Input from 'src/Components/Input'
import { type ResponseAPI } from 'src/types/utils.type'
import { loginSchema, type LoginSchema } from 'src/utils/rules'
import { isUnprocessableEntityError } from 'src/utils/utils'

type IFormData = LoginSchema

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IFormData>({
    // mọi validation logic sẽ được Yup schema đảm nhận, Hiển thị lỗi thông qua formState.errors
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: IFormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log('Login User: ', data)
        toast.success('Đăng nhập thành công !')
      },
      onError: (error) => {
        type typeErrorResponse = IFormData
        if (isUnprocessableEntityError<ResponseAPI<typeErrorResponse>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            // setError vao Form
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-customOrange'>
      <div className='custom-container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-10 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input<IFormData>
                className='mt-8'
                name='email'
                placeholder='email'
                type='email'
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input<IFormData>
                className='mt-2'
                name='password'
                placeholder='password'
                type='password'
                autoComplete='on'
                errorMessage={errors.password?.message}
                register={register}
              />
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
