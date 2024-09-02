import { Order } from '../@types'
import { Board, OrdersContainer } from './styles'

type Props = {
  icon: string
  title: string
  orders: Order[]
}

export const OrdersBoard = ({ icon, title, orders }: Props) => (
  <Board>
    <header>
      <span>{icon}</span>
      <strong>{title}</strong>
      <span>({orders.length})</span>
    </header>

    {orders.length > 0 && (
      <OrdersContainer>
        {orders.map(({ _id, products, table }) => (
          <button key={_id}>
            <strong>Mesa {table}</strong>
            <span>{products.length} itens</span>
          </button>
        ))}
      </OrdersContainer>
    )}
  </Board>
)
