export interface SuccessResponseAPI<Data> {
  message: string
  data: Data
}

export interface ErrorResponseAPI<Data> {
  message: string
  data?: Data
}

// -? : sẽ loại bỏ undefined của key optional
// NonNullable<T[P]>: Loại bỏ null và undefined khỏi value type
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
