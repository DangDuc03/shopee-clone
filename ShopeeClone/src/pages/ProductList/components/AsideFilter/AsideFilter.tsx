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
import InputV2 from 'src/Components/InputV2'

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
    <div className='ml-3 py-3'>
      {/* Category */}
      <Link
        to={path.home}
        className={classNames('ml-1 flex items-center font-semibold', {
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
          className='h-5 w-4'
        >
          <path d='M11 13v4' />
          <path d='M15 5v4' />
          <path d='M3 3v16a2 2 0 0 0 2 2h16' />
          <rect x={7} y={13} width={9} height={4} rx={1} />
          <rect x={7} y={5} width={12} height={4} rx={1} />
        </svg>

        <span className='ml-1 capitalize'>Tất cả danh mục</span>
      </Link>
      <div className='my-2 h-[1px] bg-gray-300'></div>
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
                  'font-semibold text-customOrange': isActive
                })}
              >
                {isActive && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='red'
                    stroke='currentColor'
                    className='absolute left-[-10px] top-[-3px] h-6 w-5'
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
      <Link to={path.home} className='ml-1 mt-4 flex items-center font-semibold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={24}
          height={24}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          className='h-5 w-4'
        >
          <path d='M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z' />
        </svg>
        <span className='ml-1'>Bộ lọc tìm kiếm</span>
      </Link>
      <div className='my-2 h-[1px] bg-gray-300'></div>
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
                    classNameInput=' w-full p-1 outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
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
          <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='flex w-full items-center justify-center bg-customOrange p-2 uppercase text-white hover:bg-customOrange/80'>
            <span>Áp dụng</span>
          </Button>
        </form>
      </div>
      <div className='my-2 h-[1px] bg-gray-300'></div>

      {/* star */}
      <div className='my-3'> Đánh giá</div>
      <RatingStar queryConfig={queryConfig} />
      <div className='my-2 h-[1px] bg-gray-300'></div>

      {/* DELELE ALL FILTER */}
      <Button
        onClick={handleRemoveAll}
        className='mt-2 flex w-full items-center justify-center bg-customOrange p-2 uppercase text-white hover:bg-customOrange/80'
      >
        <span>Xoá tất cả</span>
      </Button>
    </div>
  )
}
