import type { RegisterOptions, UseFormGetValues } from "react-hook-form"
import type { IFormData } from "src/pages/Register/Register"
// import type { UseFormGetValues } from "react-hook-form";


type Rules = { [key in keyof IFormData]?: RegisterOptions<IFormData, key> }
export const getRules = (getValues?: UseFormGetValues<IFormData>): Rules => ({
  email: {
    required: 'Email không được bỏ trống!',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 5-160 ký tự"
    },
    minLength: {
      value: 5,
      message: "Độ dài từ 5-160 ký tự"
    }
  },
  password: {
    required: 'Password không được bỏ trống!',
    maxLength: {
      value: 160,
      message: "Độ dài từ 6-160 ký tự"
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6-160 ký tự"
    }
  },
  confirm_password: {
    required: 'Nhập lại Password',
    maxLength: {
      value: 160,
      message: "Độ dài từ 6-160 ký tự"
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6-160 ký tự"
    },
    validate: (value) => {
      // Nếu có getValues và password có giá trị, so sánh confirm_password với password
      return getValues && getValues('password') === value
        ? true
        : 'Nhập lại password không khớp';
    }
  }
})

