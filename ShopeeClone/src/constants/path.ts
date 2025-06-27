const path = {
  home: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  product: '/product',
  cart: '/cart',
  productDetail: '/:nameId',
  historyCart: '/historyCart',
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
