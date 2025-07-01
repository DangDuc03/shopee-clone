import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  const backHome = () => {
    navigate(-1)
  }
  return (
    <Result
      status='404'
      title='404'
      subTitle='Xin lỗi, sản phẩm bạn yêu cầu không tồn tại!'
      extra={
        <Button
          onClick={backHome}
          className='bg-customOrange/90 text-white hover:bg-customOrange/70 cursor-pointer'
          type='default'
        >
          Quay về
        </Button>
      }
    />
  )
}

export default NotFound
