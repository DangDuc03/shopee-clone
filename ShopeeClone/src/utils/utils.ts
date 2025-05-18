import axios, { AxiosError, HttpStatusCode } from "axios";

// error is AxiosError<T> là type predicate : Nó kiểm tra xem đó có phải là một AxiosError không
// Nếu đúng, TypeScript hiểu rằng: error là AxiosError<T>
// và nó chuyển từ kiểu unknown thành AxiosError<T>
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity // status 422
} 