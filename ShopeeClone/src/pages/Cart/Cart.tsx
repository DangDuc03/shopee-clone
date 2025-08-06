import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { data, Link } from 'react-router-dom'
import purchaseAPI from 'src/apis/purchase.api'
import Button from 'src/Components/Button'
import QuantityController from 'src/Components/QuantityController'
import path from 'src/constants/path'
import { PurchaseStatus } from 'src/constants/purchase'
import { formatCurrency, generateURLNameId } from 'src/utils/utils'
import type { Purchase } from 'src/types/purchase.type'
import { produce } from 'immer'
import { debounce, keyBy } from 'lodash'
import { toast } from 'react-toastify'

interface extendPurchasesProps extends Purchase {
  distable: boolean
  checked: boolean
}

export default function Cart() {
  const [extendPurchases, setExtendPurchases] = useState<extendPurchasesProps[]>([])
  const { data: productInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: PurchaseStatus.inCart }],
    queryFn: () => purchaseAPI.getListPurchases({ status: PurchaseStatus.inCart })
  })

  const listProductIncart = productInCartData?.data.data
  const isAllChecked = extendPurchases.every((data) => data.checked)
  const purchasesChecked = extendPurchases.filter((data) => data.checked)
  const countPurchasesChecked = purchasesChecked.length
  const totalPricePurchasesChecked = purchasesChecked.reduce((total, purchase) => {
    return total + purchase.product.price * purchase.buy_count
  }, 0)
  const totalPriceSavingPurchasesChecked = purchasesChecked.reduce((total, purchase) => {
    return total + (purchase.product.price_before_discount - purchase.product.price) * purchase.buy_count
  }, 0)

  console.log('purchasesChecked', purchasesChecked)

  useEffect(() => {
    setExtendPurchases((prev) => {
      const extendPurcahsesOject = keyBy(prev, '_id')
      return (
        listProductIncart?.map((purchase) => ({
          ...purchase,
          distable: false,
          checked: Boolean(extendPurcahsesOject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [listProductIncart])

  const handleChecked = (purchasesIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // draft đại diện cho giá trị prev của extendPurchases
    setExtendPurchases(
      produce((draft) => {
        draft[purchasesIndex].checked = event.target.checked
      })
      // cach truyen thong
      // (prev) => {
      //   return prev.map((data, index) => {
      //     if (index === productIndex) {
      //       return { ...data, checked: event.target.checked }
      //     }
      //     return data
      //   })
      // }
    )
  }

  const handleCheckAll = () => {
    setExtendPurchases((prev) => {
      return prev.map((data) => ({
        ...data,
        checked: !isAllChecked
      }))
    })
  }

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseAPI.updatePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const buyPurchaesMutation = useMutation({
    mutationFn: purchaseAPI.buyPruchases,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const deletePurchaesMutation = useMutation({
    mutationFn: purchaseAPI.deletePruchases,
    onSuccess: () => {
      refetch()
    }
  })

  const debounceUpdateQuantity = useRef(
    debounce(
      (product_id: string, value: number) =>
        updatePurchaseMutation.mutate({
          product_id,
          buy_count: value
        }),
      200
    )
  ).current

  const handleQuantity = (purchasesIndex: number, value: number) => {
    const purchase = extendPurchases[purchasesIndex]
    setExtendPurchases(
      produce((draft) => {
        draft[purchasesIndex].buy_count = value
        // draft[purchasesIndex].distable = true // Khi click tăng/ giảm, phải distable input k cho ng dùng nhập vào lúc call api
      })
    )
    debounceUpdateQuantity(purchase.product._id, value)
    console.log('change')
  }

  const handleDeletePurchases = (purchaseIndex: number) => () => {
    const purchaseID = extendPurchases[purchaseIndex]._id
    deletePurchaesMutation.mutate([purchaseID])
  }

  const handleDeleteManyPurchases = () => {
    const purchaseIDs = purchasesChecked.map((purchase) => purchase._id)
    deletePurchaesMutation.mutate(purchaseIDs)
  }

  const handleBuyPurchases = () => {
    const body = purchasesChecked.map((purchases) => ({
      product_id: purchases.product._id,
      buy_count: purchases.buy_count
    }))
    buyPurchaesMutation.mutate(body)
  }

  return (
    <div className='bg-neutral-100 py-6'>
      <div className='custom-container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            {/* title  đơn giá - số lượng - số tiền - thao tác */}
            <div className='grid grid-cols-12 rounded-sm bg-white px-5 py-5 text-sm text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-6 w-5 accent-customOrange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow capitalize text-gray-600'>sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center capitalize'>
                  <div className='col-span-2'>đơn giá</div>
                  <div className='col-span-1'>số lượng</div>
                  <div className='col-span-1'>số tiền</div>
                  <div className='col-span-1'>thao tác</div>
                </div>
              </div>
            </div>
            {/* product orders */}
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendPurchases?.map((purchases, index) => (
                <div
                  key={purchases._id}
                  className='mt-3 grid grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 last:mb-5'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-customOrange'
                          checked={purchases.checked}
                          onChange={handleChecked(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`${path.home}${generateURLNameId({ name: purchases.product.name, _id: purchases.product._id })}`}
                            className='h-16 w-16 flex-shrink-0'
                          >
                            <img src={purchases.product.image} alt={purchases.product.name} />
                          </Link>
                          <div className='ml-3 flex-grow px-2 pb-2 pt-1 text-start'>
                            <Link
                              to={`${path.home}${generateURLNameId({ name: purchases.product.name, _id: purchases.product._id })}`}
                              className='line-clamp-2'
                            >
                              {purchases.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center gap-x-3'>
                      {/* cot price */}
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-xs text-gray-400 line-through'>
                            ₫{formatCurrency(purchases.product.price_before_discount)}
                          </span>
                          <span className='ml-3 text-gray-700'>₫{formatCurrency(purchases.product.price)}</span>
                        </div>
                      </div>
                      {/* sold */}
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchases.product.quantity}
                          value={purchases.buy_count}
                          classNameWrapper='flex items-center ml-2'
                          onIncrease={(value) => handleQuantity(index, value)}
                          onDecrease={(value) => handleQuantity(index, value)}
                          onChangeInput={(value) => handleQuantity(index, value)}
                          // disabled={purchases.distable}
                        />
                      </div>
                      {/* total price */}
                      <div className='col-span-1'>
                        <span className='ml-3 text-customOrange'>
                          ₫{formatCurrency(purchases.product.price * purchases.buy_count)}
                        </span>
                      </div>
                      {/* action */}
                      <div className='col-span-1'>
                        <button
                          onClick={handleDeletePurchases(index)}
                          className='cursor-pointer text-black hover:text-customOrange'
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* mua hang */}
        <div className='sticky bottom-0 z-10 mt-5 flex flex-col overflow-auto rounded-sm bg-white p-5 shadow sm:mt-0 sm:flex-row sm:items-center'>
          <div className='flex sm:items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-1 sm:pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-customOrange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className=': mx-1 border-none bg-none text-sm capitalize md:mx-3 md:text-lg'>
              Chọn tất cả ({listProductIncart?.length})
            </button>
            <button
              onClick={handleDeleteManyPurchases}
              className='ml-auto border-none bg-none text-sm capitalize md:mx-3 md:text-lg'
            >
              xoá ({countPurchasesChecked})
            </button>
          </div>

          <div className='my-5 flex flex-col sm:ml-auto sm:justify-center'>
            <div className='flex items-center sm:justify-end'>
              <span className='text-xs sm:text-lg'>Tổng cộng ({countPurchasesChecked} sản phẩm): </span>
              <span className='ml-2 text-customOrange md:text-2xl'>₫ {formatCurrency(totalPricePurchasesChecked)}</span>
            </div>
            {purchasesChecked && purchasesChecked.length > 0 && (
              <div className='items-centertext-sm flex md:justify-end'>
                <span className='text-gray-700'>Tiết kiệm:</span>
                <span className='ml-2 text-customOrange line-through md:ml-12'>
                  ₫ {formatCurrency(totalPriceSavingPurchasesChecked)}
                </span>
              </div>
            )}
          </div>
          <Button
            onClick={handleBuyPurchases}
            disabled={countPurchasesChecked === 0 || buyPurchaesMutation.isPending}
            className='rounded-sm bg-customOrange px-10 py-2 capitalize text-white hover:bg-customOrange/80 md:ml-3'
          >
            Mua hàng
          </Button>
        </div>
      </div>
    </div>
  )
}
