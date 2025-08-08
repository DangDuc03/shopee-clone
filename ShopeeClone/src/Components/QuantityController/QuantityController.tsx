import { useEffect, useState } from 'react'
import InputNumber, { type InputNumberProps } from '../InputNumber'

interface QuantityProps extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onChangeInput?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onChangeInput,
  classNameWrapper = 'ml-10',
  value,
  // disabled,
  ...rest
}: QuantityProps) {
  // mục đích giúp component đa dạng hơn, khi ng dùng k truyền value từ bên ngoài vẫn có thể thực hiện được
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  // Đồng bộ localValue với value prop khi value thay đổi từ bên ngoài
  useEffect(() => {
    setLocalValue(Number(value || 0))
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      return (_value = max)
    } else if (_value < 1) {
      return (_value = 1)
    }
    onChangeInput && onChangeInput(_value)
    setLocalValue(_value)
  }

  const handleIncrease = () => {
    let _value = localValue + 1
    if (max !== undefined && _value > max) {
      return (_value = max)
    } else if (_value < 1) {
      return (_value = 1)
    }

    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const handleDecrease = () => {
    let _value = localValue - 1
    if (_value < 1) {
      return (_value = 1)
    }

    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }
  return (
    <div className={`flex items-center` + classNameWrapper}>
      {/* minus & plus*/}
      <button
        onClick={handleDecrease}
        className={`flex h-8 w-12 items-center justify-center rounded-l-sm border border-gray-300 ${value === 1 ? 'cursor-default text-slate-300' : 'text-gray-600'}`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        classNameError='hidden'
        classNameInput='w-10 h-8 border-t border-b border-gray-300 p-1 text-center outline-none text-customOrange'
        onChange={handleChange}
        value={localValue}
        {...rest}
      />
      <button
        onClick={handleIncrease}
        // disabled={disabled}
        className='flex h-8 w-12 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
