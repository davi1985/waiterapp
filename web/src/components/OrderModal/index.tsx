import { Actions, Body, OrderDetails, Overlay } from './styles'

import { Order } from '../../@types'
import closeIcon from '../../assets/images/close-icon.svg'
import { formatCurrency } from '../../utils/formatCurrency'
import { useOrderModal } from './useOrderModal'

type Props = {
  visible: boolean
  onClose: () => void
  order: Order | null
  onCancelOrder: () => Promise<void>
  isLoading: boolean
  onChangeOrderStatus: () => Promise<void>
}

export const OrderModal = ({
  visible,
  order,
  isLoading,
  onClose,
  onCancelOrder,
  onChangeOrderStatus,
}: Props) => {
  const { total, iconByStatusMap } = useOrderModal({ onClose, order })

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
          {order.status !== 'DONE' && (
            <button
              className="primary"
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING' && '🧑‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>

              <strong>
                {order.status === 'WAITING' && 'Iniciar produção'}
                {order.status === 'IN_PRODUCTION' && 'Finalizar pedido'}
              </strong>
            </button>
          )}
          <button
            className="secondary"
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar Pedido
          </button>
        </Actions>
      </Body>
    </Overlay>
  ) : null
}
