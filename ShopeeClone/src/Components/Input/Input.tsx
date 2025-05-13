import type { RegisterOptions, UseFormRegister, Path, FieldValues } from 'react-hook-form'

interface InputProps<T extends FieldValues> {
  type: React.HTMLInputTypeAttribute
  className: string
  placeholder?: string
  name: Path<T>
  register: UseFormRegister<T>
  rules?: RegisterOptions<T, Path<T>>
  errorMessage?: string
  autoComplete?: string
}

export default function Input<T extends Record<string, any>>({
  type,
  className,
  placeholder,
  name,
  register,
  rules,
  errorMessage,
  autoComplete
}: InputProps<T>) {
  return (
    <div className={className}>
      <input
        type={type}
        className='py-3 px-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
