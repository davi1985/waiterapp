import { Order } from '../../@types'
import { OrderModal } from '../OrderModal'
import { Board, OrdersContainer } from './styles'
import { useOrderBoard } from './useOrderBoard'

type Props = {
  icon: string
  title: string
  orders: Order[]
  onCancelOrder: (orderId: string) => void
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void
}

export const OrdersBoard = ({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: Props) => {
  const {
    isModalVisible,
    selectedOrder,
    isLoading,
    handleOpenOrderModal,
    handleCloseOrderModal,
    handleCancelOrder,
    handleChangeOrderStatus,
  } = useOrderBoard({ onCancelOrder, onChangeOrderStatus })

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        onClose={handleCloseOrderModal}
        order={selectedOrder}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
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
