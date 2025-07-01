import * as yup from 'yup'

const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// cach 2: validate = yup
export const schema = yup.object({
  email: yup
    .string()
    .required('Email không được bỏ trống!')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự')
    // custom emailRegex vì mặc định yup.email bắt lỗi cơ bản nên còn thiếu.
    .matches(emailRegex, 'Email không đúng định dạng !'),
  password: yup
    .string()
    .required('Password không được bỏ trống!')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại Password')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự')
    // check confirm password
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  name: yup.string().trim().required('Name là bắt buộc')
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const priceSchema = yup.object({
  price_min: yup.string().defined().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp!',
    test: testPriceMinMax
  }),
  price_max: yup.string().defined().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp!',
    test: testPriceMinMax
  })
})

export type Schema = yup.InferType<typeof schema>
export type PriceSchema = yup.InferType<typeof priceSchema>

// schema for login form
export const loginSchema = schema.omit(['confirm_password', 'name'])
export type LoginSchema = yup.InferType<typeof loginSchema>
