import { useState, useEffect } from 'react'
import { CartItem, Product, Category } from '../@types'
import { httpRequest } from '../utils/httpRequest'

export const useMain = () => {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false)
  const [selectedTable, setSelectedTable] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  useEffect(() => {
    Promise.all([
      httpRequest.get('/categories'),
      httpRequest.get('http://192.168.0.100:3001/products'),
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data)
      setProducts(productsResponse.data)
      setIsLoading(false)
    })
  }, [])

  const handleSelectCategory = async (categoryId: string) => {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`

    setIsLoadingProducts(true)

    const { data } = await httpRequest.get(route)

    setProducts(data)
    setIsLoadingProducts(false)
  }

  const handleOpenModal = () => setIsTableModalVisible(true)
  const handleCloseModal = () => setIsTableModalVisible(false)

  const handleSaveTable = (table: string) => setSelectedTable(table)

  const handleResetOrder = () => {
    setSelectedTable('')
    setCartItems([])
  }

  const handleAddToCart = (product: Product) => {
    if (!selectedTable) {
      setIsTableModalVisible(true)
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      )

      if (itemIndex < 0) {
        return [...prevState, { quantity: 1, product }]
      }

      const newCartItems = [...prevState]
      const item = newCartItems[itemIndex]

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      }

      return newCartItems
    })
  }

  const handleRemoveCartItem = (product: Product) =>
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id,
      )

      const item = prevState[itemIndex]
      const newCartItems = [...prevState]

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1)

        return newCartItems
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      }

      return newCartItems
    })

  return {
    selectedTable,
    handleResetOrder,
    isLoading,
    categories,
    handleSelectCategory,
    isLoadingProducts,
    products,
    handleAddToCart,
    handleOpenModal,
    cartItems,
    handleRemoveCartItem,
    isTableModalVisible,
    handleCloseModal,
    handleSaveTable,
  }
}
