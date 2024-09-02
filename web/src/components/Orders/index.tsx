import { orders } from '../../mocks/orders'
import { OrdersBoard } from '../OrderBoard'
import { Container } from './styles'

export const Orders = () => (
  <Container>
    <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />

    <OrdersBoard icon="🧑‍🍳" title="Em preparação" orders={[]} />

    <OrdersBoard icon="✅" title="Pronto!" orders={[]} />
  </Container>
)
