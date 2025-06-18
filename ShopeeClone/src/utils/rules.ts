// import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
// import type { IFormData } from 'src/pages/Register/Register'
import * as yup from 'yup'

// --------------- cach 1 validate  --------------
// type Rules = { [key in keyof IFormData]?: RegisterOptions<IFormData, key> }
// export const getRules = (getValues?: UseFormGetValues<IFormData>): Rules => ({
//   email: {
//     required: 'Email không được bỏ trống!',
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email không đúng định dạng'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 5-160 ký tự'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài từ 5-160 ký tự'
//     }
//   },
//   password: {
//     required: 'Password không được bỏ trống!',
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6-160 ký tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6-160 ký tự'
//     }
//   },
//   confirm_password: {
//     required: 'Nhập lại Password',
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6-160 ký tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6-160 ký tự'
//     },
// validate: (value) => {
//   // Nếu có getValues và password có giá trị, so sánh confirm_password với password
//   return getValues && getValues('password') === value ? true : 'Nhập lại password không khớp'
// }
//   }
// })

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
    // .email('Email không đúng định dạng')
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
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp')
})

export type Schema = yup.InferType<typeof schema>

// schema for login form
export const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>
