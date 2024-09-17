import { useState } from 'react'
import { Product } from '../../@types'

export const useMenu = () => {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductModalOpen = (product: Product) => {
    setIsProductModalVisible(true)
    setSelectedProduct(product)
  }

  const handleProductModalClose = () => setIsProductModalVisible(false)

  return {
    isProductModalVisible,
    handleProductModalClose,
    selectedProduct,
    handleProductModalOpen,
  }
}
