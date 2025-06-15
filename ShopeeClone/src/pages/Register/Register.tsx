import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { schema, type Schema } from 'src/utils/rules'
import Input from 'src/Components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isUnprocessableEntityError } from 'src/utils/utils'
import type { ErrorResponseAPI } from 'src/types/utils.type'
import { toast } from 'react-toastify'
import Button from 'src/Components/Button'

type IFormData = Schema

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IFormData>({
    // mọi validation logic sẽ được Yup schema đảm nhận, Hiển thị lỗi thông qua formState.errors
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<IFormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        navigate('/login')
        toast.success('Đăng ký thành công !')
      },
      onError: (error) => {
        type typeErrorResponse = Omit<IFormData, 'confirm_password'>
        if (isUnprocessableEntityError<ErrorResponseAPI<typeErrorResponse>>(error)) {
          const formError = error.response?.data.data
          // cach1
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
          // cach 2: sd vong lap
          // if (formError) {
          //   Object.keys(formError).forEach((key) => {
          //     setError(key as keyof typeErrorResponse, {
          //       message: formError[key as keyof typeErrorResponse],
          //       type: 'Server'
          //     })
          //   })
          // }
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
              <div className='text-2xl'>Đăng ký</div>
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
              <Input<IFormData>
                className='mt-2'
                name='confirm_password'
                placeholder='confirm_password'
                type='password'
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                // rules={rules.confirm_password}
                register={register}
              />

              <div className='mt-8'>
                <Button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-customOrange hover:bg-red-600 text-white text-sm'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
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
