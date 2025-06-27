import axios, { AxiosError, HttpStatusCode } from 'axios'

// error is AxiosError<T> là type predicate : Nó kiểm tra xem đó có phải là một AxiosError không
// Nếu đúng, TypeScript hiểu rằng: error là AxiosError<T>
// và nó chuyển từ kiểu unknown thành AxiosError<T>
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity // status 422
}

// format số lượng giá cả
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formarNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function salePercent(original: number, sale: number) {
  return Math.floor(((original - sale) / original) * 100) + '%'
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateURLNameId = ({ name, _id }: { name: string; _id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${_id}`
}

export const getIdFromURLNameId = (URLId: string) => {
  const arr = URLId.split('-i-') //  split trả về 1 array
  return arr[arr.length - 1] // lấy item cuối cùng
}
