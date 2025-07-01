export const PurchaseStatus = {
  inCart: -1,
  all: 0,
  waitForConfirm: 1,
  waitForGetting: 2,
  delivering: 3,
  delivered: 4,
  cancelled: 5
} as const
