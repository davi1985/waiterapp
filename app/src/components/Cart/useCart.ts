import { useState } from 'react'
import { httpRequest } from '../../utils/httpRequest'
import { CartProps } from '.'

export const useCart = ({
  cartItems,
  onConfirmOrder,
  selectedTable,
}: Pick<CartProps, 'onConfirmOrder' | 'cartItems' | 'selectedTable'>) => {
  const [orderConfirmedModalVisible, setOrderConfirmedModalVisible] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const cartIsEmpty = Boolean(cartItems.length)

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  )

  const handleConfirmOrder = async () => {
    setIsLoading(true)

    await httpRequest.post('/orders', {
      table: selectedTable,
      products: cartItems.map(({ product, quantity }) => ({
        product: product._id,
        quantity: quantity,
      })),
    })

    setIsLoading(false)
    setOrderConfirmedModalVisible(true)
  }

  const handleOk = () => {
    setOrderConfirmedModalVisible(false)
    onConfirmOrder()
  }

  return {
    orderConfirmedModalVisible,
    handleOk,
    cartIsEmpty,
    total,
    handleConfirmOrder,
    isLoading,
  }
}
