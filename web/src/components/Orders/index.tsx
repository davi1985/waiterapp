import { useEffect, useState } from 'react'
import { OrdersBoard } from '../OrderBoard'
import { Container } from './styles'
import { Order } from '../../@types'
import { httpRequest } from '../../utils/httpRequest'

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    httpRequest.get('orders').then(({ data }) => setOrders(data))
  }, [])

  const waiting = orders.filter((order) => order.status === 'WAITING')
  const inProduction = orders.filter(
    (order) => order.status === 'IN_PRODUCTION',
  )
  const done = orders.filter((order) => order.status === 'DONE')

  const handleCancelOrder = (orderId: string) =>
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId))

  const handleStatusOrderChange = (
    orderId: string,
    status: Order['status'],
  ) => {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order,
      ),
    )
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusOrderChange}
      />

      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusOrderChange}
      />

      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleStatusOrderChange}
      />
    </Container>
  )
}
