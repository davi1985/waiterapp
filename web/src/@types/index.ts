type ProductDetails = {
  name: string
  imagePath: string
  price: number
}

type Product = {
  _id: string
  product: ProductDetails
  quantity: number
}

export type Order = {
  _id: string
  table: string
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED'
  products: Product[]
}
