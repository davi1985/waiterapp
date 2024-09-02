import { useState } from 'react'
import { Order } from '../../@types'
import { OrderModal } from '../OrderModal'
import { Board, OrdersContainer } from './styles'

type Props = {
  icon: string
  title: string
  orders: Order[]
}

export const OrdersBoard = ({ icon, title, orders }: Props) => {
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

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        onClose={handleCloseOrderModal}
        order={selectedOrder}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {Boolean(orders.length) && (
        <OrdersContainer>
          {orders.map((order) => (
            <button key={order._id} onClick={() => handleOpenOrderModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  )
}
