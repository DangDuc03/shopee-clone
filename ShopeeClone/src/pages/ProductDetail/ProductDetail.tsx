import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import CountDown from 'src/Components/CountDown'
import ProductRating from 'src/Components/ProductRating'
import { formarNumberToSocialStyle, formatCurrency, getIdFromURLNameId, salePercent } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/Components/QuantityController'
import purchaseAPI from 'src/apis/purchase.api'
import { PurchaseStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import path from 'src/constants/path'

type FormAddToCart = {
  product_id: string
  buy_count: number
}

export type QueryconfigType = {
  [key in keyof ProductListConfig]: string
}

export default function ProductDetail() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromURLNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailData?.data.data
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('empty')

  // generate Similar products
  const queryConfig: ProductListConfig = { limit: 10, page: 1, category: product?.category._id }
  const { data: ProductData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })

  const addToCartMutaion = useMutation({
    mutationFn: (body: FormAddToCart) => purchaseAPI.addToCart(body)
  })

  const CurrentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActiveImage = (img: string) => {
    setActiveImage(img)
  }

  //  currentIndexImages[1] = 5, vì [0, 5] có 2 index: [0] = 0 và [1] = 5
  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  //  currentIndexImages[0] = 0, vì [0, 5] có 2 index: [0] = 0 và [1] = 5
  const prev = () => {
    if (currentIndexImages[0] > 1) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoomIn = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const sizeDiv = event.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // cách 1: lấy offsetX, offsetY theo cơ bản nếu xử lý được event bubble
    const { offsetX, offsetY } = event.nativeEvent
    // cách 2: lấy offsetX, offsetY nếu k thể xử lý event bubble
    // const offsetX = event.pageX - (sizeDiv.x + window.scrollX)
    // const offsetY = event.pageY - (sizeDiv.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / sizeDiv.height)
    const left = offsetX * (1 - naturalWidth / sizeDiv.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleZoomOut = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleQuantity = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutaion.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: PurchaseStatus.inCart }]
          }),
            toast.success(data.data.message, { autoClose: 1000 })
        }
      }
    )
  }

  const buyNow = async () => {
    const res = await addToCartMutaion.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='custom-container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            {/* image product */}
            <div className='col-span-5'>
              <div
                className='relative w-full overflow-hidden pt-[100%]'
                onMouseMove={handleZoomIn}
                onMouseLeave={handleZoomOut}
              >
                <img
                  src={activeImage}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                {/* prev */}
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {CurrentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActiveImage(img)}>
                      <img
                        src={img}
                        alt=''
                        className='absolute left-0 top-0 h-full w-full border bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-customOrange'></div>}
                    </div>
                  )
                })}
                {/* next */}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2.5}
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            {/* content product */}
            <div className='col-span-7'>
              {/* title */}
              <div className='text-xl font-medium uppercase'>{product.name}</div>
              {/* rating & sold */}
              <div className='mt-5 flex items-center'>
                {/* display rating */}
                <div className='flex items-center'>
                  <span className='mr-2 border-b border-b-customOrange text-black'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='w-5 h-5 fill-customOrange'
                    nonActiveClassName='w-5 h-5 fill-gray-300'
                    includeNumberRating='hidden'
                  />
                </div>
                {/* display sold */}
                <div className='mx-3 h-5 w-[1.5px] bg-gray-200'></div>
                <span className='mr-2 border-b border-b-customOrange text-black'>
                  {formarNumberToSocialStyle(product.sold)}
                </span>
                <span className='text-sm text-gray-400'> Đã bán</span>
              </div>
              {/* price */}
              <div className='relative mt-8 flex w-full flex-row'>
                <div className='absolute left-0 top-0 flex h-9 w-full items-center justify-between bg-customOrange px-3 text-white'>
                  <span className='text-2xl font-bold uppercase'>flash sale</span>
                  <div className='flex items-center'>
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
                      className='lucide lucide-clock-icon lucide-clock'
                    >
                      <circle cx={12} cy={12} r={10} />
                      <polyline points='12 6 12 12 16 14' />
                    </svg>
                    <div className='ml-2 flex items-center'>
                      <span>Kết thúc trong: </span>
                      <CountDown
                        initialTime={{ hours: 1, minutes: 30, seconds: 0 }}
                        flashThresholdInMinutes={2}
                        className='text-white'
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-8 flex w-full items-center bg-gray-50 px-5 py-6'>
                  {/* before discount */}
                  <div className='text-gray-400 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                  {/* after discount */}
                  <div className='ml-3 text-3xl font-medium text-customOrange'>₫{formatCurrency(product.price)}</div>
                  <div className='text-customOrange'>
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
                      className='ml-3 h-7 w-7'
                    >
                      <path d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z' />
                      <path d='m9 12 2 2 4-4' />
                    </svg>
                  </div>
                  <div className='ml-1 rounded-sm bg-customOrange px-2 py-1 text-xs font-semibold uppercase text-white'>
                    {salePercent(product.price_before_discount, product.price)} giảm
                  </div>
                </div>
              </div>
              {/* quantity product */}
              <div className='mt-8 flex items-center gap-5'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onIncrease={handleQuantity}
                  onDecrease={handleQuantity}
                  onChangeInput={handleQuantity}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} Sản phẩm có sẵn</div>
              </div>
              {/* button add */}
              <div className='mt-10 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 cursor-pointer items-center justify-center border border-customOrange bg-customOrange/10 px-6 text-sm capitalize text-customOrange hover:bg-customOrange/5'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-2 h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  <span>Thêm vào giỏ hàng</span>
                </button>
                <button
                  onClick={buyNow}
                  className='ml-6 flex h-12 cursor-pointer items-center justify-center bg-customOrange px-10 capitalize text-white outline-none hover:bg-customOrange/80'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* description */}
      <div className='custom-container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>mô tả sản phẩm</div>
          <div className='mx-4 mb-4 mt-5 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
      {/* Similar products */}
      <div className='custom-container'>
        <div className='mt-8 bg-white p-4 shadow'>
          {ProductData && (
            <div className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5'>
              {ProductData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
