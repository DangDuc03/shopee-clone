import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import Input from 'src/Components/Input'

import { type ErrorResponseAPI } from 'src/types/utils.type'
import { loginSchema, type LoginSchema } from 'src/utils/rules'
import { isUnprocessableEntityError } from 'src/utils/utils'
import { useNavigate } from 'react-router'
import Button from 'src/Components/Button'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

type IFormData = LoginSchema

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
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
    mutationFn: (body: IFormData) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
        toast.success('Đăng nhập thành công !')
      },
      onError: (error) => {
        type typeErrorResponse = IFormData
        if (isUnprocessableEntityError<ErrorResponseAPI<typeErrorResponse>>(error)) {
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
        <div className='grid grid-cols-1 py-10 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                className='mt-8'
                name='email'
                placeholder='email'
                type='email'
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input
                className='mt-2'
                name='password'
                placeholder='password'
                type='password'
                autoComplete='on'
                errorMessage={errors.password?.message}
                register={register}
              />
              <div className='mt-5'>
                <Button
                  type='submit'
                  className='w-full bg-customOrange px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8 flex justify-center'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee ? </span>
                <Link to={path.register} className='ml-1 text-customOrange'>
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
