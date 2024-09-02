import { Order } from '../../@types'
import { OrderModal } from '../OrderModal'
import { Board, OrdersContainer } from './styles'
import { useOrderBoard } from './useOrderBoard'

type Props = {
  icon: string
  title: string
  orders: Order[]
}

export const OrdersBoard = ({ icon, title, orders }: Props) => {
  const {
    isModalVisible,
    selectedOrder,
    handleOpenOrderModal,
    handleCloseOrderModal,
  } = useOrderBoard()

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
