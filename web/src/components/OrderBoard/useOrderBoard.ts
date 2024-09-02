import { useState } from 'react'
import { Order } from '../../@types'

export const useOrderBoard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleOpenOrderModal = (order: Order) => {
    setIsModalVisible(true)
    setSelectedOrder(order)
  }

  const handleCloseOrderModal = () => {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }

  return {
    isModalVisible,
    selectedOrder,
    handleOpenOrderModal,
    handleCloseOrderModal,
  }
}
