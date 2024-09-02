import { Actions, Body, OrderDetails, Overlay } from './styles'

import closeIcon from '../../assets/images/close-icon.svg'
import { Order } from '../../@types'
import { formatCurrency } from '../../utils/formatCurrency'
import { useEffect } from 'react'

type Props = {
  visible: boolean
  onClose: () => void
  order: Order | null
}

const INITIAL_TOTAL = 0
export const OrderModal = ({ visible, onClose, order }: Props) => {
  const iconByStatusMap: Record<
    Order['status'],
    { icon: string; label: string }
  > = {
    WAITING: { icon: '🕒', label: 'Fila de espera' },
    IN_PROGRESS: { icon: '🧑‍🍳', label: 'Em preparação' },
    COMPLETED: { icon: '✅', label: 'Pronto!' },
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const total = order?.products.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    INITIAL_TOTAL,
  )

  return visible && order ? (
    <Overlay>
      <Body>
        <header>
          <strong>Mesa {order.table}</strong>

          <button onClick={onClose}>
            <img src={closeIcon} alt="Icon close button" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>

          <div>
            <span>{iconByStatusMap[order.status].icon}</span>
            <strong>{iconByStatusMap[order.status].label}</strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width={56}
                  height={28.51}
                />

                <span className="quantity"> {quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total ?? 0)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button className="primary">
            <span>🧑‍🍳</span>
            <strong>Iniciar produção</strong>
          </button>

          <button className="secondary">Cancelar Pedido</button>
        </Actions>
      </Body>
    </Overlay>
  ) : null
}
