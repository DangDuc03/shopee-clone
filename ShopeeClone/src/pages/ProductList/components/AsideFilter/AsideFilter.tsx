import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/Components/Button'
import path from 'src/constants/path'
import type { QueryconfigType } from '../../ProductList'
import type { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from 'src/Components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { priceSchema, type PriceSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import RatingStar from '../RatingStar'
import { omit } from 'lodash'

interface Iprops {
  queryConfig: QueryconfigType
  CategoryData: Category[]
}

type FormDataPrice = PriceSchema

export default function AsideFilter({ queryConfig, CategoryData }: Iprops) {
  const navigate = useNavigate()
  const { category } = queryConfig
  const { control, formState, handleSubmit, trigger } = useForm<FormDataPrice>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })

  const { errors } = formState

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter'])).toString()
    })
  }

  return (
    <div className=' py-3 ml-3'>
      {/* Category */}
      <Link
        to={path.home}
        className={classNames('flex items-center font-semibold ml-1', {
          'text-customOrange': !category
        })}
      >
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
        {CategoryData.map((itemsCategory) => {
          const isActive = category === itemsCategory._id
          return (
            <li className='py-2 pl-2' key={itemsCategory._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: itemsCategory._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'text-customOrange font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='red'
                    stroke='currentColor'
                    className='w-5 h-6 absolute top-[-3px] left-[-10px]'
                  >
                    <path d='m9 18 6-6-6-6' />
                  </svg>
                )}
                <span className=''>{itemsCategory.name}</span>
              </Link>
            </li>
          )
        })}
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
        <form className='mt-3' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='Từ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                    classNameError='hidden'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
            <div className='mx-2 mt-1 shrink-0 text-gray-400'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='Đến'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                    classNameError='hidden'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-customOrange text-white hover:bg-customOrange/80 flex justify-center items-center'>
            <span>Áp dụng</span>
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-2'></div>

      {/* star */}
      <div className='my-3'> Đánh giá</div>
      <RatingStar queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-2'></div>

      {/* DELELE ALL FILTER */}
      <Button
        onClick={handleRemoveAll}
        className='w-full mt-2 p-2 uppercase bg-customOrange text-white hover:bg-customOrange/80 flex justify-center items-center'
      >
        <span>Xoá tất cả</span>
      </Button>
    </div>
  )
}
