// import type { RegisterOptions } from "react-hook-form"
// import type { UseFormGetValues } from "react-hook-form";

// type Rules = { [key in 'email' | 'password']?: RegisterOptions }
export const rules = {
  email: {
    required: {
      value: true,
      message: 'Email không được bỏ trống!'
    },
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
    required: {
      value: true,
      message: 'Password không được bỏ trống!'
    },
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
    required: {
      value: true,
      message: 'Nhập lại Password'
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6-160 ký tự"
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6-160 ký tự"
    },
  }
}

