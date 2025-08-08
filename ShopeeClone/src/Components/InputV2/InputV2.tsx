// sử dụng userController giúp rút gọn cú pháp
// sử dụng trong trường hợp đặc biệt, chỉ sd đư với react hook form

import { useState, type InputHTMLAttributes } from 'react'
import { useController, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputV2Props) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'py-3  w-full outline-none border  px-3 border-gray-300 focus:border-gray-500 rounded-sm shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      // cập nhật localValue
      setLocalValue(valueFromInput)
      // gọi field onchange để cập nhật vào state reacthook form
      field.onChange(event)
      // thực thi onchang khi có truyền từ ngoài vào qua props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} value={value || localValue} onChange={handleChange} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
