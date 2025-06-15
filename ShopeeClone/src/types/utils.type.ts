export interface SuccessResponseAPI<Data> {
  message: string
  data: Data
}

export interface ErrorResponseAPI<Data> {
  message: string
  data?: Data
}
