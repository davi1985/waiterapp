import { useEffect } from 'react'
import { Order } from '../../@types'

type Props = {
  order: Order | null
  onClose: () => void
}

const INITIAL_TOTAL = 0
export const useOrderModal = ({ onClose, order }: Props) => {
  const iconByStatusMap: Record<
    Order['status'],
    { icon: string; label: string }
  > = {
    WAITING: { icon: '🕒', label: 'Fila de espera' },
    IN_PRODUCTION: { icon: '🧑‍🍳', label: 'Em preparação' },
    DONE: { icon: '✅', label: 'Pronto!' },
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

  return {
    iconByStatusMap,
    total,
  }
}
