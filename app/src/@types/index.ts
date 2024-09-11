export type Product = {
  _id: string
  name: string
  description: string
  imagePath: string
  price: number
  ingredients: {
    name: string
    icon: string
    _id: string
  }[]
}

export type CartItem = {
  product: Product
  quantity: number
}

export type Category = {
  _id: string
  name: string
  icon: string
}
