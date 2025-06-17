import type { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister, Path, FieldValues } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  className,
  placeholder,
  name,
  register,
  rules,
  errorMessage,
  autoComplete,
  classNameInput = 'py-3 px-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm'
}: InputProps) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
