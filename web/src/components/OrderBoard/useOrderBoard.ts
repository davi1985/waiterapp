import { useState } from 'react'
import { Order } from '../../@types'
import { httpRequest } from '../../utils/httpRequest'
import { toast } from 'react-toastify'

type Props = {
  onCancelOrder: (orderId: string) => void
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void
}
export const useOrderBoard = ({
  onCancelOrder,
  onChangeOrderStatus,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenOrderModal = (order: Order) => {
    setIsModalVisible(true)
    setSelectedOrder(order)
  }

  const handleCloseOrderModal = () => {
    setIsModalVisible(false)
    setSelectedOrder(null)
  }

  const handleChangeOrderStatus = async () => {
    setIsLoading(true)

    const status =
      selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE'

    await new Promise((resolve) => setTimeout(resolve, 3000))
    await httpRequest.patch(`/orders/${selectedOrder?._id}`, {
      status,
    })

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`,
    )
    onChangeOrderStatus(selectedOrder!._id, status)
    setIsLoading(false)
    setIsModalVisible(false)
  }

  const handleCancelOrder = async () => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))
    await httpRequest.delete(`/orders/${selectedOrder?._id}`)

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`)
    onCancelOrder(selectedOrder!._id)
    setIsLoading(false)
    setIsModalVisible(false)
  }

  return {
    isModalVisible,
    selectedOrder,
    handleOpenOrderModal,
    handleCloseOrderModal,
    handleCancelOrder,
    isLoading,
    handleChangeOrderStatus,
  }
}
