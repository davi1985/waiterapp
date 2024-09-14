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
  const inProduction = orders.filter((order) => order.status === 'IN_PROGRESS')
  const done = orders.filter((order) => order.status === 'COMPLETED')

  const handleCancelOrder = (orderId: string) =>
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId))

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
      />

      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
      />

      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
      />
    </Container>
  )
}
