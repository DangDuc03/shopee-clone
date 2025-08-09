const path = {
  home: '/',
  user: '/user',
  login: '/login',
  register: '/register',
  profile: '/user/profile',
  historyPurchase: '/user/history',
  changePassword: '/user/password',
  product: '/product',
  cart: '/cart',
  productDetail: '/:nameId',
  logout: '/logout',
  notFound: '/notFound',
  admin: {
    home: '/admin',
    product: '/admin/product',
    order: '/admin/order',
    user: '/admin/user',
    category: '/admin/category'
  }
} as const

export default path
