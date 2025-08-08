import { useMutation, useQueryClient } from '@tanstack/react-query'
import Popover from '../Popover'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { PurchaseStatus } from 'src/constants/purchase'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function NavHeader() {
  const queryClient = useQueryClient()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logoutAccount(),
    onSuccess: () => {
      toast.success('Đăng xuất thành công !')
      setIsAuthenticated(false)
      queryClient.removeQueries({ queryKey: ['purchases', { status: PurchaseStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()

    setProfile(null) // Xóa thông tin người dùng khỏi context
  }
  return (
    <div className='flex justify-between sm:justify-end'>
      {/* Popover language */}
      <Popover
        className='flex cursor-pointer items-center py-1 hover:text-white/70 sm:mx-3'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-sm'>
            <div className='pr-15 flex flex-col px-3 py-2 pl-3 sm:pr-28'>
              <button className='px-2 py-1 hover:text-customOrange sm:px-3 sm:py-2'>Tiếng Việt</button>
              <button className='mt-1 px-2 py-1 hover:text-customOrange sm:mt-2 sm:px-3 sm:py-2'>EngLish</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>

      {/* Popover account */}
      {isAuthenticated && (
        <Popover
          className='mx-3 flex cursor-pointer items-center py-1 hover:text-white/70'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-sm'>
              <Link
                className='block w-full bg-white px-2 py-2 text-left hover:bg-slate-100 hover:text-customOrange sm:px-4 sm:py-3'
                to={path.profile}
              >
                <span>Tài khoản của tôi</span>
              </Link>
              <Link
                className='block w-full bg-white px-2 py-2 text-left hover:bg-slate-100 hover:text-customOrange sm:px-4 sm:py-3'
                to={path.historyCart}
              >
                <span>Đơn mua</span>
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white px-2 py-2 text-left hover:bg-slate-100 hover:text-customOrange sm:px-4 sm:py-3'
              >
                <span>Đăng xuất</span>
              </button>
            </div>
          }
        >
          <div className='mr-2 flex flex-shrink-0 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='mr-1 h-5 w-6 rounded-full object-cover'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
            <div>{profile ? profile.email || profile.name : 'User'}</div>
          </div>
        </Popover>
      )}
      {/* before login */}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng Ký
          </Link>
          <div className='h-4 border-r-2 border-r-white'></div>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng Nhập
          </Link>
        </div>
      )}
    </div>
  )
}
